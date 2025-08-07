import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Video, Clock, Star, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const VideoConsultation = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { toast } = useToast();

  const availableDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      rating: 4.9,
      experience: "15 years",
      status: "available",
      nextSlot: "Available Now"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "General Medicine",
      rating: 4.8,
      experience: "12 years",
      status: "available",
      nextSlot: "Available Now"
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "Dermatology",
      rating: 4.7,
      experience: "10 years",
      status: "busy",
      nextSlot: "Available in 30 mins"
    }
  ];

  const handleStartConsultation = (doctor: any) => {
    toast({
      title: "Connecting to Video Call",
      description: `Preparing secure video consultation with ${doctor.name}...`,
    });
    
    // Simulate video call initialization
    setTimeout(() => {
      toast({
        title: "Video Call Connected",
        description: "You are now connected with your doctor.",
      });
    }, 2000);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Video Consultation
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Connect instantly with certified doctors for online consultations
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {availableDoctors.map((doctor) => (
            <Card key={doctor.id} className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                  </div>
                  <Badge 
                    variant={doctor.status === "available" ? "default" : "secondary"}
                    className={doctor.status === "available" ? "bg-success text-white" : ""}
                  >
                    {doctor.status === "available" ? "Available" : "Busy"}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{doctor.nextSlot}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{doctor.experience} experience</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleStartConsultation(doctor)}
                  className="w-full"
                  variant={doctor.status === "available" ? "medical" : "secondary"}
                  disabled={doctor.status !== "available"}
                >
                  <Video className="h-4 w-4 mr-2" />
                  {doctor.status === "available" ? "Start Video Call" : "Join Queue"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="mt-12 max-w-4xl mx-auto shadow-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-medical-primary">
              <Video className="h-6 w-6" />
              <span>Quick Consultation Form</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="patient-name">Patient Name</Label>
                <Input id="patient-name" placeholder="Enter patient name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="Patient age" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="symptoms">Main Symptoms</Label>
                <Input id="symptoms" placeholder="Describe your symptoms" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" placeholder="How long have you had these symptoms?" />
              </div>
            </div>
            
            <Button variant="medical" size="lg" className="w-full">
              Find Available Doctor
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};