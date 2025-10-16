import Navigation from "@/components/Navigation";
import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Series = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "Todos" },
    { id: "action", name: "Ação" },
    { id: "comedy", name: "Comédia" },
    { id: "drama", name: "Drama" },
    { id: "thriller", name: "Suspense" },
    { id: "fantasy", name: "Fantasia" },
  ];

  const seriesData = {
    all: [
      { id: 101, title: "The Last of Us", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=280&h=420&fit=crop", rating: 9.2, plan: "Premium" },
      { id: 102, title: "Succession", image: "https://images.unsplash.com/photo-1579762593131-4ddc1c999a4f?w=280&h=420&fit=crop", rating: 9.0, plan: "Premium" },
      { id: 103, title: "The Bear", image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=280&h=420&fit=crop", rating: 8.8, plan: "Intermediário" },
      { id: 104, title: "Breaking Bad", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=280&h=420&fit=crop", rating: 9.5, plan: "Premium" },
      { id: 105, title: "Stranger Things", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=280&h=420&fit=crop", rating: 8.7, plan: "Intermediário" },
      { id: 106, title: "The Office", image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=280&h=420&fit=crop", rating: 9.0, plan: "Básico" },
    ],
    action: [
      { id: 101, title: "The Last of Us", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=280&h=420&fit=crop", rating: 9.2, plan: "Premium" },
      { id: 107, title: "Reacher", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=280&h=420&fit=crop", rating: 8.4, plan: "Intermediário" },
      { id: 108, title: "The Mandalorian", image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=280&h=420&fit=crop", rating: 8.6, plan: "Premium" },
    ],
    comedy: [
      { id: 106, title: "The Office", image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=280&h=420&fit=crop", rating: 9.0, plan: "Básico" },
      { id: 103, title: "The Bear", image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=280&h=420&fit=crop", rating: 8.8, plan: "Intermediário" },
      { id: 109, title: "Brooklyn Nine-Nine", image: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=280&h=420&fit=crop", rating: 8.4, plan: "Básico" },
    ],
    drama: [
      { id: 102, title: "Succession", image: "https://images.unsplash.com/photo-1579762593131-4ddc1c999a4f?w=280&h=420&fit=crop", rating: 9.0, plan: "Premium" },
      { id: 104, title: "Breaking Bad", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=280&h=420&fit=crop", rating: 9.5, plan: "Premium" },
      { id: 110, title: "The Crown", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=280&h=420&fit=crop", rating: 8.6, plan: "Premium" },
    ],
    thriller: [
      { id: 111, title: "Severance", image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=280&h=420&fit=crop", rating: 8.9, plan: "Premium" },
      { id: 112, title: "True Detective", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=280&h=420&fit=crop", rating: 8.8, plan: "Intermediário" },
    ],
    fantasy: [
      { id: 105, title: "Stranger Things", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=280&h=420&fit=crop", rating: 8.7, plan: "Intermediário" },
      { id: 113, title: "The Witcher", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=280&h=420&fit=crop", rating: 8.0, plan: "Intermediário" },
      { id: 114, title: "House of the Dragon", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=280&h=420&fit=crop", rating: 8.5, plan: "Premium" },
    ],
  };

  const currentSeries = seriesData[selectedCategory as keyof typeof seriesData] || seriesData.all;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-hero bg-clip-text text-transparent">
          Séries
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
          {currentSeries.map((series) => (
            <MovieCard key={series.id} {...series} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Series;
