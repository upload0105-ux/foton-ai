import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function PortalSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Photographer Portal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=400&fit=crop"
              alt="Fotógrafo"
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              SOU <span className="text-[#7FFF00]">FOTÓGRAFO</span>
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Comece a vender suas fotos hoje e lucre com IA. Nossa plataforma
              oferece ferramentas inteligentes para maximizar seus ganhos:
            </p>
            <ul className="space-y-3 mb-8 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-[#7FFF00] font-bold mt-1">✓</span>
                <span>Saque automático dos seus ganhos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#7FFF00] font-bold mt-1">✓</span>
                <span>IA para curadoria automática de fotos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#7FFF00] font-bold mt-1">✓</span>
                <span>Gestão de múltiplos eventos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#7FFF00] font-bold mt-1">✓</span>
                <span>Relatórios detalhados de vendas</span>
              </li>
            </ul>
            <Button className="bg-[#7FFF00] text-black hover:bg-[#6FEE00] font-semibold text-lg px-8 py-6 flex items-center gap-2">
              Vender Fotos <ArrowRight size={20} />
            </Button>
          </div>
        </div>

        {/* Organizer Portal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
              alt="Organizador"
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              SOU <span className="text-[#7FFF00]">ORGANIZADOR</span>
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Transforme seu evento em marketing viral. Oferecemos ferramentas
              para engajar participantes e gerar receita:
            </p>
            <ul className="space-y-3 mb-8 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-[#7FFF00] font-bold mt-1">✓</span>
                <span>Painel de métricas em tempo real</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#7FFF00] font-bold mt-1">✓</span>
                <span>Branding customizado nas fotos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#7FFF00] font-bold mt-1">✓</span>
                <span>Revenue share automático</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#7FFF00] font-bold mt-1">✓</span>
                <span>Integração com redes sociais</span>
              </li>
            </ul>
            <Button className="bg-[#7FFF00] text-black hover:bg-[#6FEE00] font-semibold text-lg px-8 py-6 flex items-center gap-2">
              Saiba Mais <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
