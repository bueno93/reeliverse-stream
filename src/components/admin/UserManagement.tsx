import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Ban, CheckCircle } from "lucide-react";

interface User {
  id: string;
  full_name: string;
  plan: string;
  is_blocked: boolean;
  created_at: string;
}

export const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, plan, is_blocked, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erro ao carregar usuários",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setUsers(data || []);
  };

  const toggleBlockUser = async (userId: string, currentlyBlocked: boolean) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_blocked: !currentlyBlocked })
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: currentlyBlocked ? "Usuário desbloqueado" : "Usuário bloqueado",
        description: currentlyBlocked
          ? "O usuário pode acessar a plataforma novamente."
          : "O usuário foi bloqueado e não pode mais acessar.",
      });

      loadUsers();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gerenciar Usuários</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Plano</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Cadastrado em</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.full_name || "Sem nome"}
              </TableCell>
              <TableCell className="capitalize">{user.plan || "basic"}</TableCell>
              <TableCell>
                {user.is_blocked ? (
                  <Badge variant="destructive">Bloqueado</Badge>
                ) : (
                  <Badge variant="default">Ativo</Badge>
                )}
              </TableCell>
              <TableCell>
                {new Date(user.created_at).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant={user.is_blocked ? "default" : "destructive"}
                  size="sm"
                  onClick={() => toggleBlockUser(user.id, user.is_blocked)}
                  disabled={loading}
                >
                  {user.is_blocked ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Desbloquear
                    </>
                  ) : (
                    <>
                      <Ban className="mr-2 h-4 w-4" />
                      Bloquear
                    </>
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
