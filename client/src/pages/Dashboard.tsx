import { useState } from "react";
import { 
  LayoutDashboard, 
  Calendar, 
  DollarSign, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Plus, 
  AlertCircle,
  TrendingUp,
  Package,
  Image as ImageIcon,
  Upload,
  MoreVertical,
  ExternalLink,
  Eye,
  Trash2,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("inicio");

  const stats = [
    { title: "Hoje", value: "R$ 1.240,00", sub: "12 fotos vendidas", icon: DollarSign, color: "text-green-600" },
    { title: "Últimos 7 dias", value: "R$ 8.450,00", sub: "84 fotos vendidas", icon: Calendar, color: "text-blue-600" },
    { title: "Mês atual", value: "R$ 24.100,00", sub: "241 fotos vendidas", icon: BarChart3, color: "text-purple-600" },
    { title: "Total Acumulado", value: "R$ 142.000,00", sub: "1.420 fotos vendidas", icon: TrendingUp, color: "text-[#7FFF00]" },
  ];

  const menuItems = [
    { id: "inicio", label: "Início", icon: LayoutDashboard },
    { id: "eventos", label: "Meus Eventos", icon: Calendar },
    { id: "vendas", label: "Minhas Vendas", icon: DollarSign },
    { id: "clientes", label: "Clientes", icon: Users },
    { id: "relatorios", label: "Relatórios", icon: BarChart3 },
    { id: "config", label: "Configurações", icon: Settings },
  ];

  const myEvents = [
    {
      id: 1,
      title: "Maratona SP 2026",
      date: "19 abr 2026",
      photos: 1240,
      status: "Publicado",
      sales: "R$ 4.250,00",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Beach Tennis Open",
      date: "15 abr 2026",
      photos: 850,
      status: "Processando IA",
      sales: "R$ 0,00",
      image: "https://images.unsplash.com/photo-1554224311-beee415c15ae?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      title: "CrossFit Games",
      date: "10 abr 2026",
      photos: 2100,
      status: "Publicado",
      sales: "R$ 12.800,00",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen z-20">
        <div className="p-6">
          <Link href="/">
            <div className="text-2xl font-bold cursor-pointer">
              <span className="text-black">FOTON</span>
              <span className="text-[#7FFF00]">.AI</span>
            </div>
          </Link>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">Painel do Fotógrafo</p>
        </div>

        <div className="px-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-[#7FFF00] flex items-center justify-center text-black font-bold shadow-sm">
              JD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">João Silva</p>
              <p className="text-xs text-gray-500">Plano Pro</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                activeTab === item.id
                  ? "bg-black text-white shadow-lg shadow-black/10"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? "text-[#7FFF00]" : ""} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all">
            <LogOut size={20} />
            Sair da conta
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "inicio" && (
          <>
            <header className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Olá, João! 👋</h2>
                <p className="text-gray-500">Aqui está o que está acontecendo com suas fotos hoje.</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-xl border-gray-200 font-bold">
                  <BarChart3 size={18} className="mr-2" /> Relatórios
                </Button>
                <Button className="bg-[#7FFF00] text-black hover:bg-[#6FEE00] font-bold rounded-xl px-6 shadow-lg shadow-[#7FFF00]/20">
                  <Plus size={20} className="mr-2" /> Criar Novo Evento
                </Button>
              </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="border-none shadow-sm rounded-3xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-2xl bg-gray-50 ${stat.color}`}>
                        <stat.icon size={24} />
                      </div>
                      <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">+12%</span>
                    </div>
                    <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                    <p className="text-sm font-medium text-gray-500 mt-1">{stat.title}</p>
                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-400">
                      <Package size={14} /> {stat.sub}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Events List */}
              <div className="lg:col-span-2">
                <Card className="border-none shadow-sm rounded-3xl">
                  <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 pb-6">
                    <CardTitle className="text-xl font-bold">Eventos Recentes</CardTitle>
                    <Button variant="link" className="text-[#7FFF00] font-bold">Ver todos</Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-50">
                      {myEvents.map((event) => (
                        <div key={event.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <img src={event.image} className="w-16 h-16 rounded-2xl object-cover shadow-sm" alt="" />
                            <div>
                              <h4 className="font-bold text-gray-900">{event.title}</h4>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Calendar size={12} /> {event.date}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <ImageIcon size={12} /> {event.photos} fotos
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-sm font-bold text-gray-900">{event.sales}</p>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                event.status === "Publicado" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                              }`}>
                                {event.status}
                              </span>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-xl">
                              <MoreVertical size={20} className="text-gray-400" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & Storage */}
              <div className="space-y-8">
                <Card className="border-none shadow-sm rounded-3xl bg-black text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#7FFF00]/20 blur-3xl -mr-16 -mt-16"></div>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Upload size={20} className="text-[#7FFF00]" /> Upload Rápido
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400 mb-6">Arraste suas fotos aqui para começar o processamento de IA instantâneo.</p>
                    <div className="border-2 border-dashed border-gray-800 rounded-2xl p-8 text-center hover:border-[#7FFF00] transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Plus size={24} className="text-[#7FFF00]" />
                      </div>
                      <span className="text-xs font-bold text-gray-500">Selecionar arquivos</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Armazenamento IA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500 font-medium">85.4 GB de 100 GB</span>
                      <span className="font-bold text-gray-900">85%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7FFF00] rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-4">Seu plano Pro permite até 1TB de armazenamento. <span className="text-[#7FFF00] font-bold cursor-pointer">Fazer upgrade</span></p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {activeTab === "eventos" && (
          <>
            <header className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Meus Eventos</h2>
                <p className="text-gray-500">Gerencie seus eventos, fotos e preços.</p>
              </div>
              <Button className="bg-[#7FFF00] text-black hover:bg-[#6FEE00] font-bold rounded-xl px-6">
                <Plus size={20} className="mr-2" /> Criar Novo Evento
              </Button>
            </header>

            <div className="grid grid-cols-1 gap-6">
              {myEvents.map((event) => (
                <Card key={event.id} className="border-none shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-64 h-48 md:h-auto relative">
                        <img src={event.image} className="w-full h-full object-cover" alt="" />
                        <div className="absolute top-4 left-4">
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase backdrop-blur-md ${
                            event.status === "Publicado" ? "bg-green-500/80 text-white" : "bg-orange-500/80 text-white"
                          }`}>
                            {event.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 p-8">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{event.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1"><Calendar size={16} /> {event.date}</span>
                              <span className="flex items-center gap-1"><ImageIcon size={16} /> {event.photos} fotos</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Vendas Totais</p>
                            <p className="text-2xl font-black text-gray-900">{event.sales}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-3 mt-8">
                          <Button className="bg-black text-white hover:bg-gray-800 rounded-xl font-bold px-6">
                            <Upload size={18} className="mr-2" /> Subir mais fotos
                          </Button>
                          <Button variant="outline" className="rounded-xl border-gray-200 font-bold">
                            <Settings size={18} className="mr-2" /> Configurar Preços
                          </Button>
                          <Button variant="outline" className="rounded-xl border-gray-200 font-bold">
                            <ExternalLink size={18} className="mr-2" /> Ver Página Pública
                          </Button>
                          <div className="flex-1"></div>
                          <Button variant="ghost" className="text-red-500 hover:bg-red-50 rounded-xl font-bold">
                            <Trash2 size={18} className="mr-2" /> Excluir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
