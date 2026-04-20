import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Sparkles, ShoppingCart, ChevronLeft, Share2, Filter, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "wouter";
import FaceRecognitionModal from "@/components/FaceRecognitionModal";

const mockPhotos = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  url: `https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?w=600&h=800&fit=crop`,
  price: "R$ 6,50",
  photographer: "Foton Studio",
  resolution: "2000x3000 px"
}));

export default function Gallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Event Header Section */}
        <section className="bg-gray-50 border-b py-8 md:py-12">
          <div className="container max-w-7xl mx-auto px-4">
            <Link href="/events">
              <div className="mb-6 -ml-4 text-gray-500 hover:text-black flex items-center gap-2 cursor-pointer w-fit">
                <ChevronLeft size={20} /> Voltar para eventos
              </div>
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#7FFF00]/20 text-[#7FFF00] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Corrida
                  </span>
                  <span className="text-gray-400 text-sm">19 abr 2026 (Dom)</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
                  Maratona SP 2026
                </h1>
                <p className="text-gray-600 flex items-center gap-2">
                  São Paulo, SP • <span className="font-semibold text-black">Foton Studio</span>
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" className="rounded-xl border-gray-200 flex items-center gap-2">
                  <Share2 size={18} /> Compartilhar
                </Button>
                <Button className="bg-black text-white hover:bg-gray-800 rounded-xl flex items-center gap-2 font-bold">
                  <ShoppingCart size={18} /> Ver Carrinho (0)
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Search Banner */}
        <section className="py-8 bg-white">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="bg-gradient-to-r from-black to-gray-900 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-[#7FFF00]/10 blur-[100px] -z-0"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-[#7FFF00] font-bold mb-4">
                    <Sparkles size={24} />
                    <span className="uppercase tracking-widest text-sm">IA FOTON.AI</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                    Encontre suas fotos por reconhecimento facial
                  </h2>
                  <p className="text-gray-400 text-lg max-w-xl">
                    Tire uma selfie ou envie uma foto do seu rosto. Nossa IA vai encontrar todas as suas fotos em segundos.
                  </p>
                </div>
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#7FFF00] hover:bg-[#6FEE00] text-black font-bold text-xl px-12 py-8 rounded-2xl shadow-[0_0_30px_rgba(127,255,0,0.3)] transition-all hover:scale-105"
                >
                  Encontrar fotos
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Grid Section */}
        <section className="py-12">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold text-gray-900">190 fotos encontradas</h3>
                <div className="h-4 w-px bg-gray-200"></div>
                <Button variant="ghost" className="text-gray-500 hover:text-black flex items-center gap-2">
                  <Filter size={18} /> Filtrar
                </Button>
              </div>
              <div className="text-sm text-gray-400 flex items-center gap-1">
                <Info size={14} /> Clique na foto para ver detalhes
              </div>
            </div>

            {/* Masonry-like Grid */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
              {mockPhotos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="relative group break-inside-avoid rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img 
                    src={photo.url} 
                    alt={`Foto ${photo.id}`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    <div className="flex justify-end">
                      <Button size="icon" className="bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full">
                        <Share2 size={18} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-lg">{photo.price}</span>
                      <Button className="bg-[#7FFF00] hover:bg-[#6FEE00] text-black font-bold rounded-xl flex items-center gap-2">
                        <ShoppingCart size={16} /> Adicionar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More */}
            <div className="mt-16 flex justify-center">
              <Button variant="outline" className="px-12 py-6 rounded-2xl border-gray-200 text-gray-600 font-bold hover:bg-gray-50">
                Carregar mais fotos
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Face Recognition Modal */}
      <FaceRecognitionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative">
            <Button 
              onClick={() => setSelectedPhoto(null)}
              size="icon" 
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black text-white rounded-full"
            >
              <X size={24} />
            </Button>
            
            <div className="flex-1 bg-gray-100 flex items-center justify-center overflow-hidden">
              <img 
                src={selectedPhoto.url} 
                alt="Foto selecionada"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            <div className="w-full md:w-96 p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Detalhes da foto</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Código da foto:</span>
                    <span className="font-semibold">#{selectedPhoto.id}483605</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Resolução:</span>
                    <span className="font-semibold">{selectedPhoto.resolution}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Fotógrafo:</span>
                    <span className="font-semibold">{selectedPhoto.photographer}</span>
                  </div>
                </div>
                
                <div className="text-4xl font-bold text-gray-900 mb-8">
                  {selectedPhoto.price}
                </div>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full h-16 bg-[#7FFF00] hover:bg-[#6FEE00] text-black font-bold text-lg rounded-2xl flex items-center justify-center gap-3">
                  <ShoppingCart size={20} /> Adicionar ao carrinho
                </Button>
                <p className="text-[10px] text-center text-gray-400">
                  Compra segura e protegida. Download automático após o pagamento.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
