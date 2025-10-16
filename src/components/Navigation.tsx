import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background/95 to-background/0 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              StreamFlix
            </h1>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
                Início
              </a>
              <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
                Filmes
              </a>
              <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
                Séries
              </a>
              <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
                Minha Lista
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar filmes, séries..."
                className="pl-10 w-64 bg-background/50 border-border/50"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-foreground">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
