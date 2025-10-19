import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { plan, paymentMethod } = await req.json();
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error('Usuário não autenticado');
    }

    // Get plan pricing
    const { data: planData, error: planError } = await supabaseClient
      .from('plan_pricing')
      .select('*')
      .eq('plan', plan)
      .single();

    if (planError || !planData) {
      throw new Error('Plano não encontrado');
    }

    // Get user profile
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single();

    const mercadoPagoToken = Deno.env.get('MERCADO_PAGO_ACCESS_TOKEN');
    
    // Create preference in Mercado Pago
    const preferenceData = {
      items: [
        {
          title: planData.name,
          description: planData.description || `Plano ${planData.name}`,
          quantity: 1,
          unit_price: Number(planData.price),
          currency_id: 'BRL'
        }
      ],
      payer: {
        email: user.email,
        name: profile?.full_name || 'Usuário'
      },
      payment_methods: {
        excluded_payment_types: [],
        installments: 12
      },
      back_urls: {
        success: `${Deno.env.get('SUPABASE_URL')}/functions/v1/payment-webhook`,
        failure: `${req.headers.get('origin')}/profile`,
        pending: `${req.headers.get('origin')}/profile`
      },
      auto_return: 'approved',
      external_reference: user.id,
      notification_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/payment-webhook`
    };

    console.log('Creating Mercado Pago preference:', preferenceData);

    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mercadoPagoToken}`
      },
      body: JSON.stringify(preferenceData)
    });

    const mpData = await mpResponse.json();
    
    if (!mpResponse.ok) {
      console.error('Mercado Pago error:', mpData);
      throw new Error(mpData.message || 'Erro ao criar pagamento');
    }

    console.log('Mercado Pago preference created:', mpData);

    // Create payment record
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .insert({
        user_id: user.id,
        plan: plan,
        amount: planData.price,
        status: 'pending',
        stripe_session_id: mpData.id // Usando o mesmo campo para armazenar o ID do MP
      })
      .select()
      .single();

    if (paymentError) {
      console.error('Error creating payment record:', paymentError);
      throw paymentError;
    }

    return new Response(
      JSON.stringify({ 
        initPoint: mpData.init_point,
        preferenceId: mpData.id,
        paymentId: payment.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in create-payment function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Erro desconhecido' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
