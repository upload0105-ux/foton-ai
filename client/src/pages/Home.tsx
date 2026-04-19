import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RecentEvents from "@/components/RecentEvents";
import PortalSection from "@/components/PortalSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <RecentEvents />
        <PortalSection />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
