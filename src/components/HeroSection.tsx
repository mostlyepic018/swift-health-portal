import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Phone, Video, Pill } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="pt-20 pb-16 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Your Health, Our
            <span className="text-medical-primary"> Priority</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book appointments, connect with doctors via video calls, get prescriptions, 
            and access emergency services - all in one platform.
          </p>
          <Button variant="hero" size="lg" className="mr-4">
            Book Appointment
          </Button>
          <Button variant="emergency" size="lg">
            Emergency Help
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 animate-slide-up">
          <ServiceCard
            icon={<Calendar className="h-8 w-8" />}
            title="Book Appointments"
            description="Schedule with top doctors"
            bgColor="bg-gradient-card"
          />
          <ServiceCard
            icon={<Video className="h-8 w-8" />}
            title="Video Consultation"
            description="Connect instantly online"
            bgColor="bg-gradient-card"
          />
          <ServiceCard
            icon={<Pill className="h-8 w-8" />}
            title="Digital Prescriptions"
            description="Get medicines delivered"
            bgColor="bg-gradient-card"
          />
          <ServiceCard
            icon={<Phone className="h-8 w-8" />}
            title="Emergency Services"
            description="24/7 ambulance booking"
            bgColor="bg-gradient-card"
          />
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

const ServiceCard = ({ icon, title, description, bgColor }: ServiceCardProps) => {
  return (
    <Card className={`${bgColor} shadow-card hover:shadow-hover transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-0`}>
      <CardContent className="p-6 text-center">
        <div className="text-medical-primary mb-4 flex justify-center">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};