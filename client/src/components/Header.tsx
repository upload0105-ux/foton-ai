import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="text-2xl font-bold">
                <span className="text-black">FOTON</span>
                <span className="text-[#7FFF00]">.AI</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/events">
              <a className="text-gray-700 hover:text-black transition cursor-pointer">
                Buscar Fotos
              </a>
            </Link>
            <Link href="/dashboard">
              <a className="text-gray-700 hover:text-black transition cursor-pointer">
                Vender Fotos
              </a>
            </Link>
            <a href="#" className="text-gray-700 hover:text-black transition">
              Como Funciona
            </a>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-black hover:bg-gray-100">
              Entrar
            </Button>
            <Button className="bg-[#7FFF00] text-black hover:bg-[#6FEE00] font-semibold">
              Criar Conta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 flex flex-col gap-3">
            <Link href="/events">
              <a className="text-gray-700 hover:text-black transition block py-2 cursor-pointer">
                Buscar Fotos
              </a>
            </Link>
            <Link href="/dashboard">
              <a className="text-gray-700 hover:text-black transition block py-2 cursor-pointer">
                Vender Fotos
              </a>
            </Link>
            <a href="#" className="text-gray-700 hover:text-black transition block py-2">
              Como Funciona
            </a>
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="ghost" className="w-full text-black hover:bg-gray-100">
                Entrar
              </Button>
              <Button className="w-full bg-[#7FFF00] text-black hover:bg-[#6FEE00] font-semibold">
                Criar Conta
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
