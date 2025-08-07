import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AppointmentBooking = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { toast } = useToast();

  const specialties = [
    "Cardiology", "Dermatology", "Neurology", "Orthopedics", 
    "Pediatrics", "Psychiatry", "General Medicine"
  ];

  const doctors = {
    "Cardiology": ["Dr. Sarah Johnson", "Dr. Michael Chen"],
    "Dermatology": ["Dr. Emily Davis", "Dr. Robert Wilson"],
    "Neurology": ["Dr. Lisa Anderson", "Dr. James Martinez"],
    "Orthopedics": ["Dr. David Brown", "Dr. Jennifer Garcia"],
    "Pediatrics": ["Dr. Maria Rodriguez", "Dr. William Taylor"],
    "Psychiatry": ["Dr. Jessica Thompson", "Dr. Daniel Lee"],
    "General Medicine": ["Dr. Amanda White", "Dr. Christopher Clark"]
  };

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", 
    "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleBooking = () => {
    if (!selectedSpecialty || !selectedDoctor || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${selectedDoctor} on ${selectedDate} at ${selectedTime} has been confirmed.`,
    });
  };

  return (
    <section id="services" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Book Your Appointment
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose your specialty, select a doctor, and book your preferred time slot
          </p>
        </div>
        
        <Card className="max-w-4xl mx-auto shadow-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-medical-primary">
              <Calendar className="h-6 w-6" />
              <span>Schedule Appointment</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="specialty" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Medical Specialty</span>
                </Label>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="doctor" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Select Doctor</span>
                </Label>
                <Select 
                  value={selectedDoctor} 
                  onValueChange={setSelectedDoctor}
                  disabled={!selectedSpecialty}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedSpecialty && doctors[selectedSpecialty as keyof typeof doctors]?.map((doctor) => (
                      <SelectItem key={doctor} value={doctor}>
                        {doctor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Appointment Date</span>
                </Label>
                <Input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Time Slot</span>
                </Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Patient Name</Label>
                <Input id="name" placeholder="Enter patient name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter phone number" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Input id="reason" placeholder="Brief description of your concern" />
              </div>
            </div>
            
            <Button 
              onClick={handleBooking}
              className="w-full"
              variant="medical"
              size="lg"
            >
              Confirm Appointment
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};