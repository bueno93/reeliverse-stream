import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Payment {
  id: string;
  user_id: string;
  plan: string;
  amount: number;
  status: string;
  payment_date: string;
  valid_until: string;
  profiles: {
    full_name: string;
  };
}

export const PaymentManagement = () => {
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    const { data, error } = await supabase
      .from("payments")
      .select(`
        *,
        profiles (
          full_name
        )
      `)
      .order("payment_date", { ascending: false });

    if (error) {
      toast({
        title: "Erro ao carregar pagamentos",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setPayments(data || []);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: "default" | "destructive" | "secondary"; label: string }> = {
      completed: { variant: "default", label: "Concluído" },
      pending: { variant: "secondary", label: "Pendente" },
      failed: { variant: "destructive", label: "Falhou" },
    };

    const statusInfo = statusMap[status] || statusMap.pending;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Histórico de Pagamentos</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuário</TableHead>
            <TableHead>Plano</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Válido até</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">
                {payment.profiles?.full_name || "Usuário desconhecido"}
              </TableCell>
              <TableCell className="capitalize">{payment.plan}</TableCell>
              <TableCell>R$ {payment.amount.toFixed(2)}</TableCell>
              <TableCell>{getStatusBadge(payment.status)}</TableCell>
              <TableCell>
                {new Date(payment.payment_date).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                {payment.valid_until
                  ? new Date(payment.valid_until).toLocaleDateString("pt-BR")
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
          {payments.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                Nenhum pagamento registrado ainda.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
