import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ContentManagement } from "@/components/admin/ContentManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { PlanManagement } from "@/components/admin/PlanManagement";
import { PaymentManagement } from "@/components/admin/PaymentManagement";

const checkAdminAccess = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return false;
  }

  const { data: roles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .single();

  return !!roles;
};

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      const hasAccess = await checkAdminAccess();
      
      if (!hasAccess) {
        toast({
          title: "Acesso negado",
          description: "Você não tem permissão para acessar esta página.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }
      
      setIsAdmin(true);
      setLoading(false);
    };

    verifyAdmin();
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Painel Administrativo</h1>
        
        <Card className="p-6">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Conteúdo</TabsTrigger>
              <TabsTrigger value="users">Usuários</TabsTrigger>
              <TabsTrigger value="plans">Planos</TabsTrigger>
              <TabsTrigger value="payments">Pagamentos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="mt-6">
              <ContentManagement />
            </TabsContent>
            
            <TabsContent value="users" className="mt-6">
              <UserManagement />
            </TabsContent>
            
            <TabsContent value="plans" className="mt-6">
              <PlanManagement />
            </TabsContent>
            
            <TabsContent value="payments" className="mt-6">
              <PaymentManagement />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
