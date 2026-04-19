import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 md:py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-white">FOTON</span>
              <span className="text-[#7FFF00]">.AI</span>
            </div>
            <p className="text-gray-400 text-sm">
              A plataforma definitiva para fotógrafos e organizadores de eventos
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Plataforma</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[#7FFF00] transition">
                  Buscar Fotos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#7FFF00] transition">
                  Vender Fotos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#7FFF00] transition">
                  Para Organizadores
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[#7FFF00] transition">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#7FFF00] transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#7FFF00] transition">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[#7FFF00] transition">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#7FFF00] transition">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#7FFF00] transition">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2026 FOTON.AI. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-[#7FFF00] transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#7FFF00] transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#7FFF00] transition"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
