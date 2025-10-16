import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CategoryRow from "@/components/CategoryRow";

const Index = () => {
  const moviesData = {
    trending: [
      { id: 1, title: "Duna: Parte Dois", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=280&h=420&fit=crop", rating: 8.9, plan: "Premium" },
      { id: 2, title: "Oppenheimer", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=280&h=420&fit=crop", rating: 9.0, plan: "Premium" },
      { id: 3, title: "Guardiões da Galáxia Vol. 3", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=280&h=420&fit=crop", rating: 8.5, plan: "Intermediário" },
      { id: 4, title: "Homem-Aranha: Através do Aranhaverso", image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=280&h=420&fit=crop", rating: 9.1, plan: "Intermediário" },
      { id: 5, title: "Missão Impossível: Acerto de Contas", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=280&h=420&fit=crop", rating: 8.7, plan: "Premium" },
      { id: 6, title: "John Wick 4: Baba Yaga", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=280&h=420&fit=crop", rating: 8.8 },
    ],
    action: [
      { id: 7, title: "Velozes e Furiosos 10", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=280&h=420&fit=crop", rating: 7.8, plan: "Intermediário" },
      { id: 8, title: "Gladiador 2", image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=280&h=420&fit=crop", rating: 8.4, plan: "Premium" },
      { id: 9, title: "Aquaman 2", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=280&h=420&fit=crop", rating: 7.5 },
      { id: 10, title: "Mad Max: Furiosa", image: "https://images.unsplash.com/photo-1541411438265-4cb4687110f2?w=280&h=420&fit=crop", rating: 8.6, plan: "Premium" },
      { id: 11, title: "Deadpool 3", image: "https://images.unsplash.com/photo-1533563906091-fdfdffc3e3c4?w=280&h=420&fit=crop", rating: 9.0, plan: "Premium" },
      { id: 12, title: "Transformers: O Despertar das Feras", image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=280&h=420&fit=crop", rating: 7.2 },
    ],
    comedy: [
      { id: 13, title: "Barbie", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=280&h=420&fit=crop", rating: 8.3, plan: "Intermediário" },
      { id: 14, title: "Dungeons & Dragons: Honra Entre Rebeldes", image: "https://images.unsplash.com/photo-1579762593131-4ddc1c999a4f?w=280&h=420&fit=crop", rating: 8.0 },
      { id: 15, title: "A Pequena Sereia", image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=280&h=420&fit=crop", rating: 7.6 },
      { id: 16, title: "Super Mario Bros - O Filme", image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=280&h=420&fit=crop", rating: 8.1, plan: "Básico" },
      { id: 17, title: "Shazam! Fúria dos Deuses", image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=280&h=420&fit=crop", rating: 7.4 },
      { id: 18, title: "Encanto", image: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=280&h=420&fit=crop", rating: 8.7, plan: "Básico" },
    ],
    drama: [
      { id: 19, title: "Pobres Criaturas", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=280&h=420&fit=crop", rating: 8.8, plan: "Premium" },
      { id: 20, title: "Maestro", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=280&h=420&fit=crop", rating: 8.2, plan: "Premium" },
      { id: 21, title: "Os Fabelmans", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=280&h=420&fit=crop", rating: 8.5, plan: "Intermediário" },
      { id: 22, title: "Tár", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=280&h=420&fit=crop", rating: 8.6, plan: "Premium" },
      { id: 23, title: "Aftersun", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=280&h=420&fit=crop", rating: 8.4, plan: "Intermediário" },
      { id: 24, title: "Past Lives", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=280&h=420&fit=crop", rating: 8.7, plan: "Premium" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      <main className="space-y-12 pb-20 -mt-32 relative z-10">
        <CategoryRow title="🔥 Em Alta" movies={moviesData.trending} />
        <CategoryRow title="💥 Ação & Aventura" movies={moviesData.action} />
        <CategoryRow title="😂 Comédia" movies={moviesData.comedy} />
        <CategoryRow title="🎭 Drama" movies={moviesData.drama} />
      </main>
    </div>
  );
};

export default Index;
