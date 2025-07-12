
import { ArrowRight, Activity, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-orange-800 text-white overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-400 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <Activity className="h-5 w-5 text-green-400 animate-pulse" />
            <span className="text-sm font-medium">Real-Time Monitoring Active</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="block">AI-Powered</span>
          <span className="block bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
            Disaster Detection
          </span>
          <span className="block">& Early Warning</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
          Real-time monitoring of earthquakes and floods using advanced IoT sensors and machine learning algorithms for life-saving early warnings.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Shield className="mr-2 h-5 w-5" />
            Explore Dashboard
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
            onClick={() => document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })}
          >
            How It Works
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
            <div className="text-sm text-blue-100">Continuous Monitoring</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-3xl font-bold text-orange-400 mb-2">&lt;5s</div>
            <div className="text-sm text-blue-100">Alert Response Time</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
            <div className="text-sm text-blue-100">System Reliability</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
