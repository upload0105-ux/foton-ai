import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "wouter";

export default function RecentEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false })
          .limit(5);

        if (error) throw error;
        setEvents(data || []);
      } catch (error) {
        console.error("Erro ao carregar eventos recentes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentEvents();
  }, []);

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Eventos Recentes
            </h2>
            <p className="text-gray-600">
              Fotos de eventos que acabaram de ser processadas
            </p>
          </div>
          <Link href="/events">
            <div className="hidden md:flex items-center gap-2 text-[#7FFF00] hover:text-[#6FEE00] font-semibold transition cursor-pointer">
              Ver Todos <ChevronRight size={20} />
            </div>
          </Link>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-10">Carregando eventos...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-10 text-gray-500">Nenhum evento recente encontrado.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
            {events.map((event) => (
              <Link href="/gallery" key={event.id}>
                <div className="flex-shrink-0 w-full md:w-auto group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg h-48 md:h-40 mb-3 bg-gray-200">
                    <img
                      src={event.image_url || "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=200&fit=crop"}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {event.title}
                        </p>
                        <p className="text-gray-200 text-xs">{event.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile View All Button */}
        <Link href="/events">
          <div className="md:hidden flex items-center justify-center gap-2 text-[#7FFF00] hover:text-[#6FEE00] font-semibold transition mt-6 cursor-pointer">
            Ver Todos <ChevronRight size={20} />
          </div>
        </Link>
      </div>
    </section>
  );
}
