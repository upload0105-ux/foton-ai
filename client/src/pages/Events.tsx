import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Calendar, MapPin, Filter, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const mockEvents = [
  {
    id: 1,
    title: "Maratona SP 2026",
    location: "São Paulo, SP",
    date: "19 abr 2026 (Dom)",
    photographer: "Foton Studio",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop",
    category: "Corrida",
  },
  {
    id: 2,
    title: "Beach Tennis Open",
    location: "Santos, SP",
    date: "18 abr 2026 (Sáb)",
    photographer: "Click Pro",
    image: "https://images.unsplash.com/photo-1554224311-beee415c15ae?w=600&h=400&fit=crop",
    category: "Beach Tennis",
  },
  {
    id: 3,
    title: "CrossFit Games Regional",
    location: "Curitiba, PR",
    date: "17 abr 2026 (Sex)",
    photographer: "Action Photos",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
    category: "CrossFit",
  },
  {
    id: 4,
    title: "Triathlon Brasil",
    location: "Florianópolis, SC",
    date: "19 abr 2026 (Dom)",
    photographer: "Endurance Media",
    image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=600&h=400&fit=crop",
    category: "Triathlon",
  },
  {
    id: 5,
    title: "Futebol 7 Championship",
    location: "Rio de Janeiro, RJ",
    date: "19 abr 2026 (Dom)",
    photographer: "Sport Click",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=400&fit=crop",
    category: "Futebol",
  },
  {
    id: 6,
    title: "Copa Interior de Ciclismo",
    location: "Campinas, SP",
    date: "19 abr 2026 (Dom)",
    photographer: "Bike Lens",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c4b282?w=600&h=400&fit=crop",
    category: "Ciclismo",
  }
];

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        {/* Search Hero Section */}
        <section className="bg-white border-b py-12 md:py-20">
          <div className="container max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Encontre suas fotos
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Procure pelo evento que você participou e reviva seus melhores momentos com o tratamento de IA da FOTON.AI.
            </p>
            
            <div className="max-w-3xl mx-auto relative">
              <div className="flex flex-col md:flex-row gap-3 p-2 bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input 
                    placeholder="Procure pelo evento em que participou" 
                    className="pl-12 h-14 border-none focus-visible:ring-0 text-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button className="h-14 px-8 bg-[#7FFF00] hover:bg-[#6FEE00] text-black font-bold text-lg rounded-xl transition-all">
                  Pesquisar
                </Button>
              </div>
              
              {/* Quick Filters */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Button variant="outline" className="rounded-full flex items-center gap-2 border-gray-200 hover:border-[#7FFF00] hover:bg-[#7FFF00]/5">
                  <Calendar size={16} /> Data: Selecione
                </Button>
                <Button variant="outline" className="rounded-full flex items-center gap-2 border-gray-200 hover:border-[#7FFF00] hover:bg-[#7FFF00]/5">
                  <MapPin size={16} /> Cidade: Selecione
                </Button>
                <Button variant="outline" className="rounded-full flex items-center gap-2 border-gray-200 hover:border-[#7FFF00] hover:bg-[#7FFF00]/5">
                  <Filter size={16} /> Categoria: Selecione
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid Section */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-gray-900">
                {mockEvents.length} eventos encontrados
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockEvents.map((event) => (
                <Link href="/gallery" key={event.id}>
                <div 
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#7FFF00] transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <MapPin size={16} className="text-gray-400" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar size={16} className="text-gray-400" />
                        {event.date}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-tighter">
                        {event.photographer}
                      </span>
                      <div className="flex items-center gap-1 text-[#7FFF00] font-bold text-sm">
                        Ver fotos <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              ))}
            </div>
            
            {/* Pagination Placeholder */}
            <div className="mt-16 flex justify-center">
              <Button variant="outline" className="px-10 py-6 rounded-xl border-gray-200 text-gray-600 font-semibold hover:bg-gray-50">
                Carregar mais eventos
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
