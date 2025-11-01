import Header from './components/Header';
import HeroSection from './components/HeroSection';
import OverviewSection from './components/OverviewSection';
import RegistrationSection from './components/RegistrationSection';
import AboutSection from './components/AboutSection';
import PaymentPlanSection from './components/PaymentPlanSection';
import ProjectFactsSection from './components/ProjectFactsSection';
import AmenitiesFacilitiesSection from './components/AmenitiesFacilitiesSection';
import DiscoverGalleriesSection from './components/DiscoverGalleriesSection';
import FloorPlansSection from './components/FloorPlansSection';
import ContactSection from './components/ContactSection';
import DiscoverMoreProjectsSection from './components/DiscoverMoreProjectsSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <HeroSection />
      <div id="overview">
        <OverviewSection />
      </div>
      <RegistrationSection />
      <div id="floor-plans">
        <FloorPlansSection />
      </div>
      <AmenitiesFacilitiesSection />
      <ProjectFactsSection />
      <div id="pricing">
        <PaymentPlanSection />
      </div>
      
      <div id="gallery">
        <DiscoverGalleriesSection />
      </div>
      {/* /* <AboutSection /> */}
      
       
      
      
      
      <div id="contact">
        <ContactSection />
      </div>
      {/* <DiscoverMoreProjectsSection /> */}
      <Footer />
    </div>
  );
}
