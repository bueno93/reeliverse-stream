import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard, Smartphone } from "lucide-react";

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") || "basic";
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (paymentMethod: string) => {
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para realizar o pagamento",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { plan, paymentMethod }
      });

      if (error) throw error;

      // Redirect to Mercado Pago checkout
      window.location.href = data.initPoint;

    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Erro ao processar pagamento",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8">
        <h1 className="text-3xl font-bold mb-2">Escolha a forma de pagamento</h1>
        <p className="text-muted-foreground mb-8">
          Plano selecionado: <span className="font-semibold capitalize">{plan}</span>
        </p>

        <div className="grid gap-4">
          <Card className="p-6 hover:border-primary transition-colors cursor-pointer">
            <div className="flex items-start gap-4">
              <CreditCard className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Cartão de Crédito ou Débito</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Pague com cartão de crédito em até 12x sem juros ou débito à vista
                </p>
                <Button 
                  onClick={() => handlePayment('credit_card')}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Processando..." : "Pagar com Cartão"}
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:border-primary transition-colors cursor-pointer">
            <div className="flex items-start gap-4">
              <Smartphone className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">PIX</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Pagamento instantâneo via PIX - aprovação imediata
                </p>
                <Button 
                  onClick={() => handlePayment('pix')}
                  disabled={loading}
                  className="w-full"
                  variant="secondary"
                >
                  {loading ? "Processando..." : "Pagar com PIX"}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <Button 
          variant="ghost" 
          className="w-full mt-6"
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      </Card>
    </div>
  );
}
