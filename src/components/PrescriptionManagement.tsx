import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pill, Download, Search, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PrescriptionManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const prescriptions = [
    {
      id: "RX001",
      doctorName: "Dr. Sarah Johnson",
      date: "2024-01-15",
      medications: [
        { name: "Amoxicillin", dosage: "500mg", frequency: "3 times daily", duration: "7 days" },
        { name: "Ibuprofen", dosage: "200mg", frequency: "As needed", duration: "5 days" }
      ],
      diagnosis: "Upper Respiratory Infection",
      status: "active"
    },
    {
      id: "RX002",
      doctorName: "Dr. Michael Chen",
      date: "2024-01-10",
      medications: [
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days" },
        { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days" }
      ],
      diagnosis: "Hypertension Management",
      status: "active"
    },
    {
      id: "RX003",
      doctorName: "Dr. Emily Davis",
      date: "2024-01-05",
      medications: [
        { name: "Hydrocortisone Cream", dosage: "1%", frequency: "Apply twice daily", duration: "14 days" }
      ],
      diagnosis: "Eczema Treatment",
      status: "completed"
    }
  ];

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medications.some((med) =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleDownload = (prescriptionId: string) => {
    toast({
      title: "Downloading Prescription",
      description: `Prescription ${prescriptionId} is being downloaded as PDF.`,
    });
  };

  const handleOrderMedicine = (prescriptionId: string) => {
    toast({
      title: "Redirecting to Pharmacy",
      description: "Opening pharmacy portal for medicine delivery...",
    });
  };

  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Digital Prescriptions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Access your prescriptions, download PDFs, and order medicines online
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8 shadow-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-medical-primary">
                <Search className="h-6 w-6" />
                <span>Search Prescriptions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Input
                  placeholder="Search by doctor, medicine, or diagnosis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button variant="medical">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            {filteredPrescriptions.map((prescription) => (
              <Card key={prescription.id} className="shadow-card hover:shadow-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Pill className="h-5 w-5 text-medical-primary" />
                        <span>Prescription {prescription.id}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{prescription.doctorName}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(prescription.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={prescription.status === "active" ? "default" : "secondary"}
                      className={prescription.status === "active" ? "bg-success text-white" : ""}
                    >
                      {prescription.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Diagnosis</h4>
                    <p className="text-muted-foreground">{prescription.diagnosis}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Medications</h4>
                    <div className="space-y-3">
                      {prescription.medications.map((medication, index) => (
                        <div key={index} className="bg-muted/50 p-3 rounded-md">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-medium text-foreground">{medication.name}</h5>
                            <span className="text-sm text-muted-foreground">{medication.dosage}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span>{medication.frequency}</span>
                            <span className="mx-2">•</span>
                            <span>{medication.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <Button 
                      onClick={() => handleDownload(prescription.id)}
                      variant="outline"
                      className="flex-1"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button 
                      onClick={() => handleOrderMedicine(prescription.id)}
                      variant="medical"
                      className="flex-1"
                      disabled={prescription.status !== "active"}
                    >
                      <Pill className="h-4 w-4 mr-2" />
                      Order Medicine
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};