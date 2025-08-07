import { Button } from "@/components/ui/button";
import { Heart, Phone } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b shadow-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-medical-primary" />
          <h1 className="text-2xl font-bold text-foreground">HealthCare+</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-foreground hover:text-medical-primary transition-colors">
            Services
          </a>
          <a href="#about" className="text-foreground hover:text-medical-primary transition-colors">
            About
          </a>
          <a href="#contact" className="text-foreground hover:text-medical-primary transition-colors">
            Contact
          </a>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Button variant="emergency" size="sm" className="hidden sm:flex">
            <Phone className="h-4 w-4" />
            Emergency
          </Button>
          <Button variant="medical" size="sm">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};