import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";

interface Plan {
  id: string;
  plan: "basic" | "premium" | "standard";
  name: string;
  price: number;
  duration_days: number;
  description: string;
  features: Json;
}

export const PlanManagement = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    const { data, error } = await supabase
      .from("plan_pricing")
      .select("*")
      .order("price");

    if (error) {
      toast({
        title: "Erro ao carregar planos",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setPlans(data || []);
  };

  const handleUpdatePlan = async (planId: string, updates: { price?: number; duration_days?: number; description?: string }) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("plan_pricing")
        .update(updates)
        .eq("id", planId);

      if (error) throw error;

      toast({
        title: "Plano atualizado",
        description: "As alterações foram salvas com sucesso.",
      });

      loadPlans();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar plano",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gerenciar Planos</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription className="capitalize">Plano {plan.plan}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor={`price-${plan.id}`}>Preço (R$)</Label>
                <Input
                  id={`price-${plan.id}`}
                  type="number"
                  step="0.01"
                  defaultValue={plan.price}
                  onBlur={(e) =>
                    handleUpdatePlan(plan.id, { price: parseFloat(e.target.value) })
                  }
                />
              </div>

              <div>
                <Label htmlFor={`duration-${plan.id}`}>Duração (dias)</Label>
                <Input
                  id={`duration-${plan.id}`}
                  type="number"
                  defaultValue={plan.duration_days}
                  onBlur={(e) =>
                    handleUpdatePlan(plan.id, { duration_days: parseInt(e.target.value) })
                  }
                />
              </div>

              <div>
                <Label htmlFor={`description-${plan.id}`}>Descrição</Label>
                <Textarea
                  id={`description-${plan.id}`}
                  defaultValue={plan.description}
                  onBlur={(e) =>
                    handleUpdatePlan(plan.id, { description: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Recursos</Label>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {Array.isArray(plan.features) && plan.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      {String(feature)}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
