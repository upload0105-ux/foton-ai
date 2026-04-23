import { useState, useEffect } from "react";
import {
  ChevronDown,
  Search,
  Plus,
  MoreVertical,
  HelpCircle,
  Bell,
  X,
  Info,
  MapPin,
  BarChart3,
  TrendingUp,
  Image as ImageIcon,
  Lock,
  DollarSign,
  Camera,
  Calendar,
  Copy,
  Edit2,
  Trash2,
  Rocket,
  Users,
  Key,
  PieChart,
  Download,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function Dashboard() {
  const { user, loading: authLoading } = useProtectedRoute();
  const { signOut } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("eventos");
  const [activeEventTab, setActiveEventTab] = useState("dados");
  const [showMarketingMenu, setShowMarketingMenu] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);
  const [eventFilter, setEventFilter] = useState("Todos os eventos");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [visibilityOption, setVisibilityOption] = useState("publico");

  // State for real data from Supabase
  const [events, setEvents] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7FFF00] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Events
        const { data: eventsData, error: eventsError } = await supabase
          .from("events")
          .select("*")
          .order("created_at", { ascending: false });

        if (eventsError) throw eventsError;
        setEvents(eventsData || []);

        // Fetch Sales
        const { data: salesData, error: salesError } = await supabase
          .from("sales")
          .select("*")
          .order("date", { ascending: false });

        if (salesError) throw salesError;
        setSales(salesData || []);

        // Fetch Customers
        const { data: customersData, error: customersError } = await supabase
          .from("customers")
          .select("*")
          .order("name", { ascending: true });

        if (customersError) throw customersError;
        setCustomers(customersData || []);

      } catch (error) {
        console.error("Error fetching data from Supabase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = [
    "Airsoft", "Altinha", "Arco e Flecha", "Artes Marciais", "Atletismo",
    "Automotiva", "Basquete", "Beach Tennis", "Ciclismo", "Corrida",
    "Crossfit", "Futebol", "Futevôlei", "Surf", "Tênis", "Vôlei", "Outros"
  ];

  // FIX 3: Removido status e owner_id que não existem no banco
  const handleCreateEvent = async () => {
    if (!eventTitle || !eventCategory) return;
    try {
      const { data, error } = await supabase
        .from("events")
        .insert([
          {
            title: eventTitle,
            category: eventCategory,
            published: false
          }
        ])
        .select();

      if (error) throw error;

      if (data) {
        setEvents([data[0], ...events]);
        setShowCreateModal(false);
        setSelectedEvent(data[0]);
        setEventTitle("");
        setEventCategory("");
      }
    } catch (error) {
      console.error("Error creating event in Supabase:", error);
      alert("Erro ao criar evento. Verifique se as tabelas existem no Supabase.");
    }
  };

  // FIX 2: Nova função de publicar evento
  const handlePublishEvent = async () => {
    if (!selectedEvent) return;
    try {
      const { error } = await supabase
        .from("events")
        .update({ published: true })
        .eq("id", selectedEvent.id);

      if (error) throw error;

      // Atualiza o estado local sem precisar recarregar a página
      const updatedEvent = { ...selectedEvent, published: true };
      setEvents(events.map(e => e.id === selectedEvent.id ? updatedEvent : e));
      setSelectedEvent(updatedEvent);
      alert("Evento publicado com sucesso! Ele já está visível na página pública.");
    } catch (error) {
      console.error("Erro ao publicar evento:", error);
      alert("Erro ao publicar evento. Tente novamente.");
    }
  };

  const filteredEvents = events.filter(event => {
    if (eventFilter === "Criadas por mim") return true;
    if (eventFilter === "Compartilhadas") return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7FFF00]"></div>
      </div>
    );
  }

  // Render Event Details View
  if (selectedEvent) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#333]">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div
                onClick={() => { setSelectedEvent(null); setActiveEventTab("dados"); }}
                className="text-xl font-bold cursor-pointer flex items-center"
              >
                <span className="text-black">FOTON</span><span className="text-[#7FFF00]">.AI</span>
              </div>
              <nav className="flex items-center gap-2 text-sm font-medium">
                <button
                  onClick={() => { setSelectedEvent(null); setActiveEventTab("dados"); }}
                  className="text-gray-500 hover:text-black"
                >
                  Meus eventos
                </button>
                <span className="text-gray-300">/</span>
                <span className="text-black font-bold">{selectedEvent.title}</span>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              {/* FIX 2: Botão de publicar com onClick e estado visual */}
              <Button
                onClick={handlePublishEvent}
                disabled={selectedEvent?.published === true}
                className={`font-bold rounded-md px-6 h-10 transition-all ${
                  selectedEvent?.published
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-[#7FFF00] hover:bg-[#6FEE00] text-black"
                }`}
              >
                {selectedEvent?.published ? "✓ Publicado" : "Publicar evento"}
              </Button>
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold border border-gray-200">
                AJ
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-[1400px] mx-auto px-4 py-8 flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-3">Desempenho</p>
                <nav className="space-y-1">
                  <button onClick={() => setActiveEventTab("desempenho")} className={`w-full text-left px-3 py-2 text-sm font-bold rounded-md flex items-center gap-3 transition-colors ${activeEventTab === "desempenho" ? "text-[#7FFF00] bg-[#7FFF00]/5" : "text-gray-600 hover:bg-gray-100"}`}><BarChart3 size={18} /> Geral do evento</button>
                  <button onClick={() => setActiveEventTab("insights")} className={`w-full text-left px-3 py-2 text-sm font-bold rounded-md flex items-center gap-3 transition-colors ${activeEventTab === "insights" ? "text-[#7FFF00] bg-[#7FFF00]/5" : "text-gray-600 hover:bg-gray-100"}`}><TrendingUp size={18} /> Insights</button>
                  <button onClick={() => setActiveEventTab("ranking")} className={`w-full text-left px-3 py-2 text-sm font-bold rounded-md flex items-center gap-3 transition-colors ${activeEventTab === "ranking" ? "text-[#7FFF00] bg-[#7FFF00]/5" : "text-gray-600 hover:bg-gray-100"}`}><Star size={18} /> Ranking</button>
                </nav>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-3">Preferências</p>
                <nav className="space-y-1">
                  <button onClick={() => setActiveEventTab("dados")} className={`w-full text-left px-3 py-2 text-sm font-bold rounded-md flex items-center gap-3 transition-colors ${activeEventTab === "dados" ? "text-[#7FFF00] bg-[#7FFF00]/5" : "text-gray-600 hover:bg-gray-100"}`}><Info size={18} /> Dados do evento</button>
                  <button onClick={() => setActiveEventTab("capa")} className={`w-full text-left px-3 py-2 text-sm font-bold rounded-md flex items-center gap-3 transition-colors ${activeEventTab === "capa" ? "text-[#7FFF00] bg-[#7FFF00]/5" : "text-gray-600 hover:bg-gray-100"}`}><ImageIcon size={18} /> Capa do evento</button>
                  <button onClick={() => setActiveEventTab("visibilidade")} className={`w-full text-left px-3 py-2 text-sm font-bold rounded-md flex items-center gap-3 transition-colors ${activeEventTab === "visibilidade" ? "text-[#7FFF00] bg-[#7FFF00]/5" : "text-gray-600 hover:bg-gray-100"}`}><Lock size={18} /> Visibilidade</button>
                  <button onClick={() => setActiveEventTab("precos")} className={`w-full text-left px-3 py-2 text-sm font-bold rounded-md flex items-center gap-3 transition-colors ${activeEventTab === "precos" ? "text-[#7FFF00] bg-[#7FFF00]/5" : "text-gray-600 hover:bg-gray-100"}`}><DollarSign size={18} /> Preços</button>
                </nav>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-3">Mídia</p>
                <nav className="space-y-1">
                  <button onClick={() => setActiveEventTab("midia")} className={`w-full text-left px-3 py-2 text-sm font-bold rounded-md flex items-center gap-3 transition-colors ${activeEventTab === "midia" ? "text-[#7FFF00] bg-[#7FFF00]/5" : "text-gray-600 hover:bg-gray-100"}`}><Camera size={18} /> Fotos e vídeos</button>
                </nav>
              </div>
            </div>
          </aside>

          <main className="flex-1 bg-white border border-gray-200 rounded-lg p-10 shadow-sm min-h-[600px]">

            {activeEventTab === "desempenho" && (
              <div className="animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-gray-900">Desempenho geral do evento</h2>
                  <Button variant="outline" className="text-xs font-bold flex items-center gap-2 border-gray-200"><Download size={14} /> Exportar relatório</Button>
                </div>
                <div className="grid grid-cols-4 gap-6 mb-10">
                  <div className="p-6 border border-gray-100 rounded-xl bg-gray-50/50"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total das vendas</p><h3 className="text-2xl font-black text-gray-900">R$ 0,00</h3></div>
                  <div className="p-6 border border-gray-100 rounded-xl bg-gray-50/50"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Pedidos</p><h3 className="text-2xl font-black text-gray-900">0</h3></div>
                  <div className="p-6 border border-gray-100 rounded-xl bg-gray-50/50"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Ticket médio</p><h3 className="text-2xl font-black text-gray-900">R$ 0,00</h3></div>
                  <div className="p-6 border border-gray-100 rounded-xl bg-gray-50/50"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Fotos vendidas</p><h3 className="text-2xl font-black text-gray-900">0</h3></div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="p-8 border border-gray-100 rounded-xl">
                    <h4 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2"><PieChart size={16} className="text-[#7FFF00]" /> Seus ganhos neste evento</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-50"><span className="text-sm text-gray-500">Ganhos com vendas</span><span className="text-sm font-bold text-gray-900">R$ 0,00</span></div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-50"><span className="text-sm text-gray-500">Ganhos com comissão</span><span className="text-sm font-bold text-gray-900">R$ 0,00</span></div>
                      <div className="flex justify-between items-center pt-4"><span className="text-base font-bold text-gray-900">Total dos ganhos</span><span className="text-xl font-black text-[#7FFF00]">R$ 0,00</span></div>
                    </div>
                  </div>
                  <div className="p-8 border border-gray-100 rounded-xl flex flex-col items-center justify-center text-center">
                    <TrendingUp size={48} className="text-gray-100 mb-4" />
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Aguardando dados</p>
                    <p className="text-xs text-gray-400 mt-2">As métricas aparecerão assim que as primeiras vendas ocorrerem.</p>
                  </div>
                </div>
              </div>
            )}

            {activeEventTab === "visibilidade" && (
              <div className="animate-in fade-in duration-200">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Visibilidade</h2>
                <p className="text-sm text-gray-500 mb-8">Defina quem poderá ver seu evento e como suas fotos e vídeos serão exibidas.</p>
                <div className="flex gap-4 mb-8 border-b border-gray-100">
                  <button className="px-6 py-3 text-sm font-bold border-b-2 border-[#7FFF00] text-black">Evento</button>
                  <button className="px-6 py-3 text-sm font-bold text-gray-400 hover:text-gray-600">Fotos</button>
                </div>
                <div className="space-y-4 max-w-2xl">
                  <div onClick={() => setVisibilityOption("publico")} className={`p-6 border rounded-xl cursor-pointer transition-all flex items-start gap-4 ${visibilityOption === "publico" ? "border-[#7FFF00] bg-[#7FFF00]/5" : "border-gray-100 hover:border-gray-200"}`}>
                    <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center ${visibilityOption === "publico" ? "border-[#7FFF00]" : "border-gray-300"}`}>{visibilityOption === "publico" && <div className="w-2.5 h-2.5 rounded-full bg-[#7FFF00]"></div>}</div>
                    <div><p className="font-bold text-gray-900 flex items-center gap-2"><Users size={16} /> Público</p><p className="text-sm text-gray-500 mt-1">Seu evento estará visível para todos e aparecerá nas listagens de eventos no site FOTON.AI.</p></div>
                  </div>
                  <div onClick={() => setVisibilityOption("nao-listado")} className={`p-6 border rounded-xl cursor-pointer transition-all flex items-start gap-4 ${visibilityOption === "nao-listado" ? "border-[#7FFF00] bg-[#7FFF00]/5" : "border-gray-100 hover:border-gray-200"}`}>
                    <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center ${visibilityOption === "nao-listado" ? "border-[#7FFF00]" : "border-gray-300"}`}>{visibilityOption === "nao-listado" && <div className="w-2.5 h-2.5 rounded-full bg-[#7FFF00]"></div>}</div>
                    <div><p className="font-bold text-gray-900 flex items-center gap-2"><Lock size={16} /> Público não listado</p><p className="text-sm text-gray-500 mt-1">Seu evento ficará visível apenas para quem tiver o link e não aparecerá nas listagens públicas.</p></div>
                  </div>
                  <div onClick={() => setVisibilityOption("privado")} className={`p-6 border rounded-xl cursor-pointer transition-all flex items-start gap-4 ${visibilityOption === "privado" ? "border-[#7FFF00] bg-[#7FFF00]/5" : "border-gray-100 hover:border-gray-200"}`}>
                    <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center ${visibilityOption === "privado" ? "border-[#7FFF00]" : "border-gray-300"}`}>{visibilityOption === "privado" && <div className="w-2.5 h-2.5 rounded-full bg-[#7FFF00]"></div>}</div>
                    <div><p className="font-bold text-gray-900 flex items-center gap-2"><Key size={16} /> Privado com senha</p><p className="text-sm text-gray-500 mt-1">Seu evento estará visível para todos, porém vai exigir senha para liberar o acesso às fotos.</p></div>
                  </div>
                  <div className="pt-6">
                    <Button className="bg-black text-[#7FFF00] font-bold uppercase tracking-widest px-10 h-12 hover:bg-gray-900 rounded-md">Salvar visibilidade</Button>
                  </div>
                </div>
              </div>
            )}

            {activeEventTab === "dados" && (
              <div className="animate-in fade-in duration-200">
                <h2 className="text-xl font-bold text-gray-900 mb-8">Informações básicas</h2>
                <div className="max-w-2xl space-y-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Título do evento*</label>
                    <Input defaultValue={selectedEvent.title} className="h-12 border-gray-200 focus:border-[#7FFF00] focus:ring-0 rounded-md font-medium" />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Categoria*</label>
                      <div className="relative">
                        <select className="w-full h-12 px-4 border border-gray-200 rounded-md font-medium appearance-none bg-white focus:border-[#7FFF00] focus:outline-none">
                          <option>{selectedEvent.category || "Selecione"}</option>
                          {categories.map(c => <option key={c}>{c}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Data do evento*</label>
                      <Input type="date" className="h-12 border-gray-200 rounded-md font-medium" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Localização</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <Input placeholder="Ex: Arena Paintball SP" className="pl-12 h-12 border-gray-200 rounded-md font-medium" />
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-100">
                    <Button className="bg-black text-[#7FFF00] font-bold uppercase tracking-widest px-10 h-12 hover:bg-gray-900 rounded-md">Salvar alterações</Button>
                  </div>
                </div>
              </div>
            )}

            {activeEventTab === "capa" && (
              <div className="animate-in fade-in duration-200 text-center py-20">
                <ImageIcon size={48} className="mx-auto text-gray-200 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Capa do evento</h2>
                <p className="text-gray-500 mb-8">Escolha uma imagem impactante para representar seu evento.</p>
                <Button className="bg-black text-[#7FFF00] font-bold uppercase tracking-widest px-8 h-12 hover:bg-gray-900 rounded-md">Selecionar imagem</Button>
              </div>
            )}

            {activeEventTab === "midia" && (
              <div className="animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-gray-900">Fotos e vídeos</h2>
                  <Button className="bg-[#7FFF00] hover:bg-[#6FEE00] text-black font-bold rounded-md px-6 h-10 flex items-center gap-2"><Plus size={18} /> Adicionar mídia</Button>
                </div>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-20 text-center">
                  <Camera size={48} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-gray-500 font-medium">Arraste suas fotos aqui ou clique no botão acima.</p>
                </div>
              </div>
            )}

            {activeEventTab === "precos" && (
              <div className="animate-in fade-in duration-200">
                <h2 className="text-xl font-bold text-gray-900 mb-8">Configuração de preços</h2>
                <div className="space-y-6 max-w-md">
                  <div className="p-6 border border-gray-200 rounded-lg space-y-4">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Preço unitário (Foto)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">R$</span>
                      <Input defaultValue="15,00" className="pl-12 h-12 border-gray-200 rounded-md font-bold text-lg" />
                    </div>
                  </div>
                  <Button className="w-full bg-black text-[#7FFF00] font-bold uppercase tracking-widest h-12 hover:bg-gray-900 rounded-md">Salvar preços</Button>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#333]">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/">
              <div className="text-xl font-bold cursor-pointer flex items-center">
                <span className="text-black">FOTON</span><span className="text-[#7FFF00]">.AI</span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <button onClick={() => setActiveTab("inicio")} className={`px-3 py-2 text-sm font-bold rounded-md transition-colors ${activeTab === "inicio" ? "text-[#7FFF00]" : "text-gray-500 hover:bg-gray-50"}`}>Início</button>
              <button onClick={() => setActiveTab("eventos")} className={`px-3 py-2 text-sm font-bold rounded-md transition-colors ${activeTab === "eventos" ? "text-[#7FFF00]" : "text-gray-500 hover:bg-gray-50"}`}>Meus eventos</button>
              <button onClick={() => setActiveTab("vendas")} className={`px-3 py-2 text-sm font-bold rounded-md transition-colors ${activeTab === "vendas" ? "text-[#7FFF00]" : "text-gray-500 hover:bg-gray-50"}`}>Minhas vendas</button>
              <button onClick={() => setActiveTab("clientes")} className={`px-3 py-2 text-sm font-bold rounded-md transition-colors ${activeTab === "clientes" ? "text-[#7FFF00]" : "text-gray-500 hover:bg-gray-50"}`}>
                Clientes <span className="ml-1 text-[10px] bg-[#E3F2FD] text-[#2196F3] px-1.5 py-0.5 rounded font-bold">Novo</span>
              </button>
              <div className="relative">
                <button
                  onMouseEnter={() => setShowMarketingMenu(true)}
                  onMouseLeave={() => setShowMarketingMenu(false)}
                  className="px-3 py-2 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-md flex items-center gap-1"
                >
                  Marketing <ChevronDown size={14} />
                </button>
                {showMarketingMenu && (
                  <div
                    onMouseEnter={() => setShowMarketingMenu(true)}
                    onMouseLeave={() => setShowMarketingMenu(false)}
                    className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-xl rounded-lg py-2 z-50"
                  >
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Cupons</button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Carrinho abandonado</button>
                  </div>
                )}
              </div>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-600"><HelpCircle size={20} /></button>
            <button className="text-gray-400 hover:text-gray-600"><Bell size={20} /></button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 pl-4 border-l border-gray-100">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold border border-gray-200">{user?.email?.charAt(0).toUpperCase()}</div>
                <span className="text-sm font-medium text-gray-700">{user?.email?.split('@')[0].toUpperCase()}</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <Button onClick={handleLogout} variant="outline" className="text-sm font-bold text-red-600 border-red-200 hover:bg-red-50">Sair</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-lg p-4 mb-8 flex items-center justify-between">
          <span className="text-sm text-[#856404]">Configure sua conta de pagamento para começar a vender.</span>
          <Button variant="link" className="text-[#7FFF00] font-bold p-0 h-auto hover:text-[#6FEE00]">Configurar conta</Button>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">
            {activeTab === "eventos" && "Eventos"}
            {activeTab === "vendas" && "Minhas vendas"}
            {activeTab === "clientes" && "Clientes"}
            {activeTab === "inicio" && "Início"}
          </h1>
          {activeTab === "eventos" && (
            <Button onClick={() => setShowCreateModal(true)} className="bg-[#7FFF00] hover:bg-[#6FEE00] text-black font-bold rounded-md px-6 h-11 shadow-sm">
              Novo evento
            </Button>
          )}
        </div>

        {activeTab === "eventos" && (
          <div className="animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input className="pl-10 bg-white border-gray-200 rounded-md h-11 text-sm focus:border-[#7FFF00] focus:ring-0" placeholder="Buscar" />
                </div>
                <div className="relative">
                  <Button variant="outline" onClick={() => setShowFilterMenu(!showFilterMenu)} className="bg-white border-gray-200 text-gray-600 font-medium h-11 px-4 rounded-md flex items-center gap-2">
                    {eventFilter} <ChevronDown size={14} />
                  </Button>
                  {showFilterMenu && (
                    <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-xl rounded-lg py-2 z-50 mt-1">
                      <button onClick={() => { setEventFilter("Todos os eventos"); setShowFilterMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Todos os eventos</button>
                      <button onClick={() => { setEventFilter("Criadas por mim"); setShowFilterMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Criadas por mim</button>
                      <button onClick={() => { setEventFilter("Compartilhadas"); setShowFilterMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Compartilhadas</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {events.length === 0 && !loading && (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 rounded-xl">
                  <ImageIcon size={48} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-gray-500 font-medium">Nenhum evento encontrado. Crie seu primeiro evento!</p>
                </div>
              )}
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer group relative">
                  <div onClick={() => setSelectedEvent(event)} className="aspect-[4/3] bg-gray-50 flex items-center justify-center relative border-b border-gray-100">
                    <p className="text-gray-300 font-bold text-xl uppercase tracking-tighter">Fotos em breve</p>
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${event.published ? "bg-[#E8F5E9] text-[#2E7D32]" : "bg-[#FFF3E0] text-[#E65100]"}`}>
                        {event.published ? "Publicado" : "Rascunho"}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      onClick={(e) => { e.stopPropagation(); setOpenActionMenu(openActionMenu === event.id ? null : event.id); }}
                      className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-black shadow-sm border border-gray-100"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {openActionMenu === event.id && (
                      <div className="absolute top-full right-0 w-48 bg-white border border-gray-100 shadow-xl rounded-lg py-2 z-50 mt-1">
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"><Rocket size={14} /> Publicar evento</button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"><Copy size={14} /> Duplicar evento</button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"><Edit2 size={14} /> Renomear</button>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"><Trash2 size={14} /> Excluir evento</button>
                      </div>
                    )}
                  </div>
                  <div onClick={() => setSelectedEvent(event)} className="p-5">
                    <h3 className="font-bold text-gray-900 mb-3 text-base">{event.title}</h3>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500 font-medium flex items-center gap-2"><MapPin size={14} className="text-gray-300" /> {event.location || "Local não definido"}</p>
                      <p className="text-xs text-gray-500 font-medium flex items-center gap-2"><Calendar size={14} className="text-gray-300" /> {event.event_date || "Data não definida"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "vendas" && (
          <div className="animate-in fade-in duration-200 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                  <th className="px-6 py-4">Pedido</th>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Evento</th>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4">Pagamento</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sales.length === 0 && (
                  <tr><td colSpan={7} className="px-6 py-20 text-center text-gray-500 font-medium">Nenhuma venda registrada ainda.</td></tr>
                )}
                {sales.map((sale, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors text-sm">
                    <td className="px-6 py-4 font-bold text-gray-900">{sale.order_number}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{sale.customer_name}</td>
                    <td className="px-6 py-4 text-gray-500">{sale.event_id}</td>
                    <td className="px-6 py-4 text-gray-500">{new Date(sale.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-gray-600">{sale.payment_method}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">R$ {sale.total_amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${sale.status === "Pago" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "clientes" && (
          <div className="animate-in fade-in duration-200 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Telefone</th>
                  <th className="px-6 py-4">Compras</th>
                  <th className="px-6 py-4">Última compra</th>
                  <th className="px-6 py-4">Valor Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {customers.length === 0 && (
                  <tr><td colSpan={5} className="px-6 py-20 text-center text-gray-500 font-medium">Nenhum cliente cadastrado ainda.</td></tr>
                )}
                {customers.map((customer, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors text-sm">
                    <td className="px-6 py-4 font-bold text-gray-900">{customer.name}</td>
                    <td className="px-6 py-4 text-gray-500 font-medium">{customer.phone}</td>
                    <td className="px-6 py-4 text-gray-700 font-bold">{customer.total_purchases}</td>
                    <td className="px-6 py-4 text-gray-500 font-medium">{customer.last_purchase_date ? new Date(customer.last_purchase_date).toLocaleDateString() : "-"}</td>
                    <td className="px-6 py-4 font-black text-gray-900">R$ {customer.total_spent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "inicio" && (
          <div className="animate-in fade-in duration-200 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-gray-200 rounded-xl shadow-sm"><p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ganhos Totais</p><h3 className="text-3xl font-black text-gray-900">R$ 0,00</h3></div>
            <div className="bg-white p-8 border border-gray-200 rounded-xl shadow-sm"><p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Vendas Hoje</p><h3 className="text-3xl font-black text-gray-900">0</h3></div>
            <div className="bg-white p-8 border border-gray-200 rounded-xl shadow-sm"><p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Novos Clientes</p><h3 className="text-3xl font-black text-gray-900">0</h3></div>
          </div>
        )}
      </main>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[500px] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Criar novo evento</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-black transition-colors"><X size={20} /></button>
            </div>
            <div className="p-8 space-y-8">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Título do evento</label>
                  <button className="text-[10px] text-[#7FFF00] font-bold flex items-center gap-1 hover:underline"><Info size={10} /> Guia FOTON para títulos</button>
                </div>
                <Input
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Digite o nome do evento"
                  className="h-12 border-gray-200 focus:border-[#7FFF00] focus:ring-0 rounded-md font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Categoria</label>
                <div className="relative">
                  <select
                    value={eventCategory}
                    onChange={(e) => setEventCategory(e.target.value)}
                    className="w-full h-12 px-4 border border-gray-200 rounded-md font-medium appearance-none bg-white focus:border-[#7FFF00] focus:outline-none"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 flex items-center justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowCreateModal(false)} className="font-bold text-gray-500 text-sm h-11 px-6">Cancelar</Button>
              <Button
                disabled={!eventTitle || !eventCategory}
                onClick={handleCreateEvent}
                className="bg-[#7FFF00] hover:bg-[#6FEE00] text-black font-bold text-sm px-8 h-11 rounded-md shadow-sm disabled:opacity-50"
              >
                Criar evento
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
