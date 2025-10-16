import { Play, Plus, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MovieCardProps {
  title: string;
  image: string;
  rating: number;
  plan?: string;
}

const MovieCard = ({ title, image, rating, plan }: MovieCardProps) => {
  return (
    <div className="group relative flex-shrink-0 w-[280px] transition-all duration-300 hover:scale-105 hover:z-10">
      <div className="relative overflow-hidden rounded-lg shadow-card">
        <img
          src={image}
          alt={title}
          className="w-full h-[420px] object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {plan && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-primary/90 backdrop-blur-sm text-xs font-semibold rounded">
            {plan}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <div className="flex items-center gap-2 mb-3 text-sm">
            <span className="flex items-center gap-1">
              ⭐ {rating}
            </span>
            <span>•</span>
            <span>2024</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="flex-1 bg-cta hover:bg-cta/90 text-cta-foreground gap-1">
              <Play className="w-4 h-4 fill-current" />
              Assistir
            </Button>
            <Button size="sm" variant="outline" className="aspect-square p-0">
              <Plus className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="aspect-square p-0">
              <ThumbsUp className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
