import Navigation from "@/components/Navigation";
import MovieCard from "@/components/MovieCard";

const MyList = () => {
  const myListMovies = [
    { id: 1, title: "Duna: Parte Dois", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=280&h=420&fit=crop", rating: 8.9, plan: "Premium" },
    { id: 4, title: "Homem-Aranha: Através do Aranhaverso", image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=280&h=420&fit=crop", rating: 9.1, plan: "Intermediário" },
    { id: 13, title: "Barbie", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=280&h=420&fit=crop", rating: 8.3, plan: "Intermediário" },
    { id: 19, title: "Pobres Criaturas", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=280&h=420&fit=crop", rating: 8.8, plan: "Premium" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-hero bg-clip-text text-transparent">
          Minha Lista
        </h1>

        {myListMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {myListMovies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              Sua lista está vazia. Adicione filmes e séries para assistir depois!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyList;
