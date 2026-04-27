import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Calendar, MapPin, Filter, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // Busca apenas eventos publicados
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setEvents(data || []);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => 
    event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            </div>
          </div>
        </section>

        {/* Events Grid Section */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-gray-900">
                {loading ? "Carregando eventos..." : `${filteredEvents.length} eventos encontrados`}
              </h2>
            </div>

            {filteredEvents.length === 0 && !loading ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-500 text-lg">Nenhum evento publicado encontrado no momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <Link href="/gallery" key={event.id}>
                    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
                      {/* Image Container */}
                      <div className="relative h-64 overflow-hidden bg-gray-100">
                        <img 
                          src={event.image_url || "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop"} 
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
                            {event.location || "Local não informado"}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <Calendar size={16} className="text-gray-400" />
                            {event.date || new Date(event.created_at).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                          <span className="text-xs text-gray-400 font-medium uppercase tracking-tighter">
                            Foton Studio
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
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
