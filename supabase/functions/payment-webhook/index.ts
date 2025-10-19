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
    const url = new URL(req.url);
    const paymentId = url.searchParams.get('payment_id');
    const preferenceId = url.searchParams.get('preference_id');
    const status = url.searchParams.get('status');

    console.log('Webhook received:', { paymentId, preferenceId, status });

    if (!paymentId) {
      return new Response('OK', { status: 200 });
    }

    const mercadoPagoToken = Deno.env.get('MERCADO_PAGO_ACCESS_TOKEN');
    
    // Get payment details from Mercado Pago
    const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        'Authorization': `Bearer ${mercadoPagoToken}`
      }
    });

    const paymentData = await mpResponse.json();
    console.log('Payment data from Mercado Pago:', paymentData);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Find payment record by preference ID
    const { data: payment } = await supabaseClient
      .from('payments')
      .select('*')
      .eq('stripe_session_id', preferenceId)
      .single();

    if (!payment) {
      console.error('Payment not found for preference:', preferenceId);
      return new Response('Payment not found', { status: 404 });
    }

    // Map Mercado Pago status to our status
    let paymentStatus = 'pending';
    let validUntil = null;

    if (paymentData.status === 'approved') {
      paymentStatus = 'completed';
      
      // Get plan duration
      const { data: planData } = await supabaseClient
        .from('plan_pricing')
        .select('duration_days')
        .eq('plan', payment.plan)
        .single();

      if (planData) {
        const durationDays = planData.duration_days || 30;
        validUntil = new Date();
        validUntil.setDate(validUntil.getDate() + durationDays);
      }

      // Update user profile plan
      await supabaseClient
        .from('profiles')
        .update({ plan: payment.plan })
        .eq('id', payment.user_id);

    } else if (paymentData.status === 'rejected' || paymentData.status === 'cancelled') {
      paymentStatus = 'failed';
    }

    // Update payment record
    const { error: updateError } = await supabaseClient
      .from('payments')
      .update({
        status: paymentStatus,
        valid_until: validUntil,
        stripe_payment_id: paymentId,
        payment_date: paymentData.date_approved || new Date().toISOString()
      })
      .eq('id', payment.id);

    if (updateError) {
      console.error('Error updating payment:', updateError);
    }

    console.log('Payment updated successfully:', { paymentStatus, validUntil });

    return new Response('OK', { 
      status: 200,
      headers: corsHeaders 
    });

  } catch (error) {
    console.error('Error in payment-webhook:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Erro desconhecido' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
