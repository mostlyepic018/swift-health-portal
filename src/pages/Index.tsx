import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AppointmentBooking } from "@/components/AppointmentBooking";
import { EmergencyBooking } from "@/components/EmergencyBooking";
import { VideoConsultation } from "@/components/VideoConsultation";
import { PrescriptionManagement } from "@/components/PrescriptionManagement";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AppointmentBooking />
      <VideoConsultation />
      <PrescriptionManagement />
      <EmergencyBooking />
    </div>
  );
};

export default Index;
