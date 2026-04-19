import { useState } from "react";
import { ChevronLeft, Download, Heart, Share2, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data for photos found
const mockPhotos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=500&h=500&fit=crop",
    event: "Maratona SP 2026",
    photographer: "João Silva",
    price: 49.90,
    liked: false,
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop",
    event: "Maratona SP 2026",
    photographer: "Maria Santos",
    price: 39.90,
    liked: false,
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    event: "Maratona SP 2026",
    photographer: "Carlos Costa",
    price: 49.90,
    liked: false,
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
    event: "Maratona SP 2026",
    photographer: "Ana Oliveira",
    price: 59.90,
    liked: false,
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop",
    event: "Maratona SP 2026",
    photographer: "João Silva",
    price: 49.90,
    liked: false,
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1500295942863-6f3ee5c30496?w=500&h=500&fit=crop",
    event: "Maratona SP 2026",
    photographer: "Pedro Alves",
    price: 44.90,
    liked: false,
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    event: "Maratona SP 2026",
    photographer: "Lucia Martins",
    price: 49.90,
    liked: false,
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=500&h=500&fit=crop",
    event: "Maratona SP 2026",
    photographer: "Roberto Santos",
    price: 39.90,
    liked: false,
  },
];

export default function Gallery() {
  const [photos, setPhotos] = useState(mockPhotos);
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("recent");

  const togglePhotoSelection = (id: number) => {
    setSelectedPhotos((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleLike = (id: number) => {
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === id ? { ...photo, liked: !photo.liked } : photo
      )
    );
  };

  const totalPrice = selectedPhotos.reduce(
    (sum, id) => sum + (photos.find((p) => p.id === id)?.price || 0),
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb and Title */}
        <div className="bg-white border-b border-gray-200">
          <div className="container max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
              <a href="/" className="hover:text-gray-900 flex items-center gap-1">
                <ChevronLeft size={16} />
                Voltar
              </a>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Suas Fotos
            </h1>
            <p className="text-gray-600">
              Encontramos {photos.length} fotos suas no evento Maratona SP 2026
            </p>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="container max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <Filter size={18} />
                  Filtros
                </button>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Ordenar por:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7FFF00]"
                >
                  <option value="recent">Mais Recentes</option>
                  <option value="price-low">Menor Preço</option>
                  <option value="price-high">Maior Preço</option>
                  <option value="popular">Mais Populares</option>
                </select>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fotógrafo
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7FFF00]">
                      <option>Todos</option>
                      <option>João Silva</option>
                      <option>Maria Santos</option>
                      <option>Carlos Costa</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Faixa de Preço
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7FFF00]">
                      <option>Todos</option>
                      <option>Até R$ 40</option>
                      <option>R$ 40 - R$ 60</option>
                      <option>Acima de R$ 60</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Qualidade
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7FFF00]">
                      <option>Todas</option>
                      <option>Alta Resolução</option>
                      <option>Editada</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Photos Grid */}
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                {/* Photo Container */}
                <div className="relative overflow-hidden bg-gray-200 aspect-square">
                  <img
                    src={photo.url}
                    alt={`Foto ${photo.id}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center gap-3">
                    <button
                      onClick={() => toggleLike(photo.id)}
                      className={`p-2 rounded-full transition ${
                        photo.liked
                          ? "bg-red-500 text-white"
                          : "bg-white/80 text-gray-900 hover:bg-white"
                      }`}
                    >
                      <Heart
                        size={20}
                        fill={photo.liked ? "currentColor" : "none"}
                      />
                    </button>
                    <button className="p-2 rounded-full bg-white/80 text-gray-900 hover:bg-white transition">
                      <Share2 size={20} />
                    </button>
                    <button className="p-2 rounded-full bg-white/80 text-gray-900 hover:bg-white transition">
                      <Download size={20} />
                    </button>
                  </div>

                  {/* Selection Checkbox */}
                  <div className="absolute top-3 left-3">
                    <input
                      type="checkbox"
                      checked={selectedPhotos.includes(photo.id)}
                      onChange={() => togglePhotoSelection(photo.id)}
                      className="w-5 h-5 cursor-pointer accent-[#7FFF00]"
                    />
                  </div>
                </div>

                {/* Photo Info */}
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-1">{photo.photographer}</p>
                  <p className="font-semibold text-gray-900 mb-3">{photo.event}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#7FFF00]">
                      R$ {photo.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => togglePhotoSelection(photo.id)}
                      className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                        selectedPhotos.includes(photo.id)
                          ? "bg-[#7FFF00] text-black hover:bg-[#6FEE00]"
                          : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                      }`}
                    >
                      {selectedPhotos.includes(photo.id) ? "✓" : "+"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Cart Summary */}
        {selectedPhotos.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <div className="container max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {selectedPhotos.length} foto{selectedPhotos.length !== 1 ? "s" : ""} selecionada{selectedPhotos.length !== 1 ? "s" : ""}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    R$ {totalPrice.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedPhotos([])}
                  >
                    Limpar
                  </Button>
                  <Button className="bg-[#7FFF00] text-black hover:bg-[#6FEE00] font-semibold px-8">
                    Ir para Checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add padding to prevent content from hiding behind sticky cart */}
      {selectedPhotos.length > 0 && <div className="h-24" />}

      <Footer />
    </div>
  );
}
