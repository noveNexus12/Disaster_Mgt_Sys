
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Architecture from "@/components/Architecture";
import TechStack from "@/components/TechStack";
import Dashboard from "@/components/Dashboard";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Architecture />
      <TechStack />
      <Dashboard />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
