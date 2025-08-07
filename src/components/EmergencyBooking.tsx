import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MapPin, AlertTriangle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const EmergencyBooking = () => {
  const [location, setLocation] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [emergencyType, setEmergencyType] = useState("");
  const [patientName, setPatientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const getLocation = () => {
    setIsGettingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          setIsGettingLocation(false);
          toast({
            title: "Location Retrieved",
            description: "Your current location has been detected automatically.",
          });
        },
        (error) => {
          setIsGettingLocation(false);
          toast({
            title: "Location Error",
            description: "Please enter your location manually.",
            variant: "destructive"
          });
        }
      );
    } else {
      setIsGettingLocation(false);
      toast({
        title: "Geolocation not supported",
        description: "Please enter your location manually.",
        variant: "destructive"
      });
    }
  };

  const handleEmergencyBooking = () => {
    if (!patientName || !phoneNumber || !location || !emergencyType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Emergency Request Sent!",
      description: "An ambulance has been dispatched to your location. ETA: 8-12 minutes.",
    });
  };

  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Emergency Ambulance
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Quick ambulance booking with automatic location tracking - no login required
          </p>
        </div>
        
        <Card className="max-w-3xl mx-auto shadow-medical border-emergency/20">
          <CardHeader className="bg-emergency/5">
            <CardTitle className="flex items-center space-x-2 text-emergency">
              <AlertTriangle className="h-6 w-6" />
              <span>Emergency Request</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="emergency-name">Patient Name *</Label>
                <Input 
                  id="emergency-name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter patient name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergency-phone">Phone Number *</Label>
                <Input 
                  id="emergency-phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Emergency contact number"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Location *</span>
              </Label>
              <div className="flex space-x-2">
                <Input 
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your address or use auto-detect"
                  className="flex-1"
                />
                <Button 
                  onClick={getLocation}
                  disabled={isGettingLocation}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  {isGettingLocation ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                  Auto-Detect
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emergency-type">Emergency Type *</Label>
              <Input 
                id="emergency-type"
                value={emergencyType}
                onChange={(e) => setEmergencyType(e.target.value)}
                placeholder="e.g., Heart attack, Accident, Fall, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Additional Details</Label>
              <Textarea 
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide any additional information about the emergency"
                rows={3}
              />
            </div>
            
            <div className="bg-emergency/10 p-4 rounded-md border border-emergency/20">
              <p className="text-sm text-foreground flex items-center space-x-2">
                <Phone className="h-4 w-4 text-emergency" />
                <span>For immediate life-threatening emergencies, call <strong>911</strong> directly</span>
              </p>
            </div>
            
            <Button 
              onClick={handleEmergencyBooking}
              className="w-full"
              variant="emergency"
              size="lg"
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              Request Emergency Ambulance
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};