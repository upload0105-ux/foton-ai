import { Button } from "@/components/ui/button";
import { Camera, Search } from "lucide-react";
import { useState } from "react";

export default function HeroSection() {
  const [searchType, setSearchType] = useState<"selfie" | "bib">("selfie");
  const [bibNumber, setBibNumber] = useState("");

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=600&fit=crop')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />

      {/* Content */}
      <div className="container max-w-7xl mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-2xl">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ENCONTRE SUAS FOTOS:
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Envie uma selfie ou digite seu número de peito
          </p>

          {/* Search Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
            {/* Search Type Tabs */}
            <div className="flex gap-4 mb-6 border-b border-gray-200 pb-4">
              <button
                onClick={() => setSearchType("selfie")}
                className={`flex items-center gap-2 pb-2 font-semibold transition ${
                  searchType === "selfie"
                    ? "text-[#7FFF00] border-b-2 border-[#7FFF00]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Camera size={20} />
                Envie uma selfie
              </button>
              <button
                onClick={() => setSearchType("bib")}
                className={`flex items-center gap-2 pb-2 font-semibold transition ${
                  searchType === "bib"
                    ? "text-[#7FFF00] border-b-2 border-[#7FFF00]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Search size={20} />
                Número de peito
              </button>
            </div>

            {/* Search Input */}
            <div className="flex gap-3">
              {searchType === "selfie" ? (
                <div className="flex-1">
                  <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#7FFF00] transition">
                    <div className="flex flex-col items-center justify-center">
                      <Camera className="text-gray-400 mb-2" size={24} />
                      <span className="text-sm text-gray-600">
                        Clique para fazer upload da sua selfie
                      </span>
                    </div>
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Digite seu número de peito"
                  value={bibNumber}
                  onChange={(e) => setBibNumber(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7FFF00] focus:ring-2 focus:ring-[#7FFF00]/20 transition"
                />
              )}
              <Button className="bg-[#7FFF00] text-black hover:bg-[#6FEE00] font-semibold px-8">
                Buscar
              </Button>
            </div>

            {/* Helper Text */}
            <p className="text-sm text-gray-500 mt-4">
              Processamos suas fotos em segundos usando IA de reconhecimento facial
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
