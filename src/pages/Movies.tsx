import Navigation from "@/components/Navigation";
import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Movies = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "Todos" },
    { id: "action", name: "Ação" },
    { id: "comedy", name: "Comédia" },
    { id: "drama", name: "Drama" },
    { id: "scifi", name: "Ficção Científica" },
    { id: "horror", name: "Terror" },
  ];

  const moviesData = {
    all: [
      { id: 1, title: "Duna: Parte Dois", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=280&h=420&fit=crop", rating: 8.9, plan: "Premium" },
      { id: 2, title: "Oppenheimer", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=280&h=420&fit=crop", rating: 9.0, plan: "Premium" },
      { id: 7, title: "Velozes e Furiosos 10", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=280&h=420&fit=crop", rating: 7.8, plan: "Intermediário" },
      { id: 8, title: "Gladiador 2", image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=280&h=420&fit=crop", rating: 8.4, plan: "Premium" },
      { id: 13, title: "Barbie", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=280&h=420&fit=crop", rating: 8.3, plan: "Intermediário" },
      { id: 19, title: "Pobres Criaturas", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=280&h=420&fit=crop", rating: 8.8, plan: "Premium" },
    ],
    action: [
      { id: 7, title: "Velozes e Furiosos 10", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=280&h=420&fit=crop", rating: 7.8, plan: "Intermediário" },
      { id: 8, title: "Gladiador 2", image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=280&h=420&fit=crop", rating: 8.4, plan: "Premium" },
      { id: 9, title: "Aquaman 2", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=280&h=420&fit=crop", rating: 7.5 },
      { id: 10, title: "Mad Max: Furiosa", image: "https://images.unsplash.com/photo-1541411438265-4cb4687110f2?w=280&h=420&fit=crop", rating: 8.6, plan: "Premium" },
    ],
    comedy: [
      { id: 13, title: "Barbie", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=280&h=420&fit=crop", rating: 8.3, plan: "Intermediário" },
      { id: 14, title: "Dungeons & Dragons", image: "https://images.unsplash.com/photo-1579762593131-4ddc1c999a4f?w=280&h=420&fit=crop", rating: 8.0 },
      { id: 16, title: "Super Mario Bros", image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=280&h=420&fit=crop", rating: 8.1, plan: "Básico" },
    ],
    drama: [
      { id: 19, title: "Pobres Criaturas", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=280&h=420&fit=crop", rating: 8.8, plan: "Premium" },
      { id: 20, title: "Maestro", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=280&h=420&fit=crop", rating: 8.2, plan: "Premium" },
      { id: 22, title: "Tár", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=280&h=420&fit=crop", rating: 8.6, plan: "Premium" },
    ],
    scifi: [
      { id: 1, title: "Duna: Parte Dois", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=280&h=420&fit=crop", rating: 8.9, plan: "Premium" },
      { id: 3, title: "Guardiões da Galáxia Vol. 3", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=280&h=420&fit=crop", rating: 8.5, plan: "Intermediário" },
    ],
    horror: [
      { id: 25, title: "Invocação do Mal 4", image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=280&h=420&fit=crop", rating: 7.9, plan: "Intermediário" },
      { id: 26, title: "A Freira 2", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=280&h=420&fit=crop", rating: 7.6 },
    ],
  };

  const currentMovies = moviesData[selectedCategory as keyof typeof moviesData] || moviesData.all;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-hero bg-clip-text text-transparent">
          Filmes
        </h1>
        
        <div className="flex gap-3 mb-8 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="transition-all"
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {currentMovies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Movies;
