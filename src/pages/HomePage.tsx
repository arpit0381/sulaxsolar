
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesPreview from '../components/ServicesPreview';
import WhySulax from '../components/WhySulax';
import StatsCounterSection from '../components/StatsCounterSection';
import TestimonialSection from '../components/TestimonialSection';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Sulax Solar - Leading Solar Energy Solutions in North India</title>
        <meta name="description" content="Transform your business and houses with Sulax Solar's premium solar energy solutions. Expert installation, PM Surya Ghar Yojna, 30-year warranty. Get free consultation today!" />
        <meta name="keywords" content="solar panels, solar energy, renewable energy, PM Suryaghar Yojna, subsidy wala solar,solar installation, Kanpur, Uttar Pradesh, green energy" />
        <meta property="og:title" content="Sulax Solar - Leading Solar Energy Solutions" />
        <meta property="og:description" content="Transform your home and business with premium solar energy solutions. Expert installation, government subsidies, 25-year warranty." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sulaxsolar.com" />
        <link rel="canonical" href="https://sulaxsolar.com" />
      </Helmet>
      
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        <ServicesPreview />
        <WhySulax />
        <StatsCounterSection />
        <TestimonialSection />
        <CTA />
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default HomePage;
