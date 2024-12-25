import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary to-secondary animate-gradient-y">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Build Something Amazing
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-8">
          Create beautiful applications with modern tools and frameworks
        </p>
        <Button
          size="lg"
          className="bg-white text-primary hover:bg-white/90 transition-colors"
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;