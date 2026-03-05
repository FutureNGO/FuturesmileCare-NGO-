import HeroBanner from "@/components/HeroBanner";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import SubsidiariesSection from "@/components/SubsidiariesSection";
import NgoSection from "@/components/NgoSection";
import ClientsSection from "@/components/ClientsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroBanner />
      <AboutSection />
      <ServicesSection />
      <SubsidiariesSection />
      {/* <NgoSection /> */}
      <ClientsSection />
    </div>
  );
};

export default Index;
