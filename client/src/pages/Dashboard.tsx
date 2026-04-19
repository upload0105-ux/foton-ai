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
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("inicio");

  const stats = [
    { title: "Hoje", value: "R$ 0,00", sub: "0 fotos vendidas", icon: DollarSign },
    { title: "Últimos 7 dias", value: "R$ 0,00", sub: "0 fotos vendidas", icon: Calendar },
    { title: "Mês atual", value: "R$ 0,00", sub: "0 fotos vendidas", icon: BarChart3 },
    { title: "Desde o começo", value: "R$ 0,00", sub: "0 fotos vendidas", icon: TrendingUp },
  ];

  const menuItems = [
    { id: "inicio", label: "Início", icon: LayoutDashboard },
    { id: "eventos", label: "Meus Eventos", icon: Calendar },
    { id: "vendas", label: "Minhas Vendas", icon: DollarSign },
    { id: "clientes", label: "Clientes", icon: Users },
    { id: "relatorios", label: "Relatórios", icon: BarChart3 },
    { id: "config", label: "Configurações", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">
            FOTON<span className="text-[#7FFF00]">.AI</span>
          </h1>
          <p className="text-xs text-gray-500">Dashboard do Fotógrafo</p>
        </div>

        <div className="px-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-[#7FFF00] flex items-center justify-center text-black font-bold">
              JD
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">João Silva</p>
              <p className="text-xs text-gray-500">Fotógrafo</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition ${
                activeTab === item.id
                  ? "bg-[#7FFF00]/10 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? "text-[#7FFF00]" : ""} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition">
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Visão Geral</h2>
          <Button className="bg-[#7FFF00] text-black hover:bg-[#6FEE00] font-bold flex items-center gap-2">
            <Plus size={20} /> Novo Evento
          </Button>
        </header>

        {/* Alert */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-full text-orange-600">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-orange-900">
                Configure sua conta de pagamento para começar a vender.
              </p>
              <p className="text-sm text-orange-700">
                Você precisa adicionar seus dados bancários para receber os ganhos.
              </p>
            </div>
          </div>
          <Button variant="outline" className="border-orange-300 text-orange-900 hover:bg-orange-100">
            Configurar Conta
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-[#7FFF00] flex items-center gap-1 mt-1">
                  <Package size={12} /> {stat.sub}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Balance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-none shadow-sm bg-green-50/50">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center justify-between">
                Seu Saldo Atual na FOTON.AI
                <DollarSign className="text-green-600" size={24} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Disponível</p>
                <div className="text-4xl font-bold text-green-600">R$ 0,00</div>
                <p className="text-xs text-gray-500 mt-1">Pronto para sacar</p>
              </div>
              <Button className="w-full bg-[#7FFF00] text-black hover:bg-[#6FEE00] font-bold py-6">
                Solicitar Saque
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center justify-between">
                A Receber
                <Calendar className="text-blue-600" size={24} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Em processamento</p>
                <div className="text-4xl font-bold text-blue-600">R$ 0,00</div>
                <p className="text-xs text-gray-500 mt-1">Em processamento (até 5 dias úteis)</p>
              </div>
              <Button variant="outline" className="w-full border-blue-200 text-blue-900 hover:bg-blue-100 py-6">
                Ver Histórico
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Chart Placeholder */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold text-gray-900">
              Desempenho Mensal
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" className="bg-[#7FFF00] text-black hover:bg-[#6FEE00]">Ganhos</Button>
              <Button size="sm" variant="outline">Itens vendidos</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
              <div className="text-center">
                <BarChart3 size={48} className="text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Gráfico de desempenho será exibido aqui</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
