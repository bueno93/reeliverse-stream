import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-hero bg-clip-text text-transparent">
          Minha Conta
        </h1>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="account">Conta</TabsTrigger>
            <TabsTrigger value="plan">Plano</TabsTrigger>
            <TabsTrigger value="profiles">Perfis</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Conta</CardTitle>
                <CardDescription>Gerencie seus dados pessoais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Alterar Foto</Button>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" defaultValue="João da Silva" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="joao@exemplo.com" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" defaultValue="(11) 98765-4321" />
                  </div>
                </div>

                <Button className="w-full md:w-auto">Salvar Alterações</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>Atualize sua senha</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="current">Senha Atual</Label>
                  <Input id="current" type="password" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="new">Nova Senha</Label>
                  <Input id="new" type="password" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirm">Confirmar Nova Senha</Label>
                  <Input id="confirm" type="password" />
                </div>

                <Button className="w-full md:w-auto">Atualizar Senha</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Plano Atual</CardTitle>
                <CardDescription>Gerencie sua assinatura</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-gradient-card">
                  <div>
                    <h3 className="text-2xl font-bold">Premium</h3>
                    <p className="text-muted-foreground">Acesso total ao catálogo</p>
                  </div>
                  <Badge className="text-lg px-4 py-2">R$ 45,90/mês</Badge>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Benefícios do seu plano:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Acesso a todos os filmes e séries Premium</li>
                    <li>Qualidade 4K Ultra HD</li>
                    <li>Até 4 telas simultâneas</li>
                    <li>Download ilimitado</li>
                    <li>Sem anúncios</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => navigate('/checkout?plan=premium')}>
                    Alterar Plano
                  </Button>
                  <Button variant="destructive">Cancelar Assinatura</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profiles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Perfis</CardTitle>
                <CardDescription>Gerencie os perfis da sua conta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <button className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-primary transition-colors">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">João</span>
                  </button>

                  <button className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-primary transition-colors">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" />
                      <AvatarFallback>MA</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">Maria</span>
                  </button>

                  <button className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-primary transition-colors">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" />
                      <AvatarFallback>KI</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">Kids</span>
                  </button>

                  <button className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg hover:border-primary transition-colors">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-3xl">
                      +
                    </div>
                    <span className="font-medium">Adicionar</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
