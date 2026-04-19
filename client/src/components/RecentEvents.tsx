import { ChevronRight } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Maratona SP 2026",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=200&fit=crop",
    category: "Corrida",
  },
  {
    id: 2,
    title: "Beach Tennis Open",
    image:
      "https://images.unsplash.com/photo-1554224311-beee415c15ae?w=300&h=200&fit=crop",
    category: "Beach Tennis",
  },
  {
    id: 3,
    title: "CrossFit Games Regional",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop",
    category: "CrossFit",
  },
  {
    id: 4,
    title: "Triathlon Brasil",
    image:
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=300&h=200&fit=crop",
    category: "Triathlon",
  },
  {
    id: 5,
    title: "Futebol 7 Championship",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=200&fit=crop",
    category: "Futebol",
  },
];

export default function RecentEvents() {
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
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-[#7FFF00] hover:text-[#6FEE00] font-semibold transition"
          >
            Ver Todos <ChevronRight size={20} />
          </a>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex-shrink-0 w-full md:w-auto group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg h-48 md:h-40 mb-3">
                <img
                  src={event.image}
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
          ))}
        </div>

        {/* Mobile View All Button */}
        <a
          href="#"
          className="md:hidden flex items-center justify-center gap-2 text-[#7FFF00] hover:text-[#6FEE00] font-semibold transition mt-6"
        >
          Ver Todos <ChevronRight size={20} />
        </a>
      </div>
    </section>
  );
}
