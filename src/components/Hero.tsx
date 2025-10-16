import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          <h2 className="text-6xl font-bold leading-tight">
            Vingadores: Ultimato
          </h2>
          <p className="text-xl text-foreground/90 leading-relaxed">
            Após Thanos eliminar metade das criaturas vivas, os Vingadores têm que lidar
            com a perda de amigos e entes queridos. Com Tony Stark vagando perdido no
            espaço sem água e comida, Steve Rogers e Natasha Romanov lideram a resistência
            contra o titã louco.
          </p>
          
          <div className="flex items-center gap-4 pt-4">
            <Button size="lg" className="bg-cta hover:bg-cta/90 text-cta-foreground gap-2 text-lg px-8 shadow-glow">
              <Play className="w-5 h-5 fill-current" />
              Assistir Agora
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-lg px-8 border-2">
              <Info className="w-5 h-5" />
              Mais Informações
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-foreground/70">
            <span className="px-3 py-1 border border-primary/50 rounded">Plano Premium</span>
            <span>2h 58min</span>
            <span>•</span>
            <span>Ação, Aventura, Ficção</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              ⭐ 9.2/10
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
