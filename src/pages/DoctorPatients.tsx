import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Filter, User, Phone, Mail, Calendar, FileText, ArrowLeft, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DoctorPatients = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = [
    {
      id: "P001",
      name: "John Smith",
      age: 35,
      gender: "Male",
      phone: "+1-555-0123",
      email: "john.smith@email.com",
      lastVisit: "2024-01-15",
      condition: "Hypertension",
      status: "active",
      nextAppointment: "2024-01-25",
      notes: "Patient responds well to current medication. Monitor blood pressure weekly.",
      medicalHistory: [
        "Hypertension diagnosed in 2020",
        "No known allergies",
        "Family history of heart disease"
      ],
      currentMedications: [
        "Lisinopril 10mg - Once daily",
        "Metformin 500mg - Twice daily"
      ]
    },
    {
      id: "P002",
      name: "Sarah Johnson",
      age: 42,
      gender: "Female",
      phone: "+1-555-0124",
      email: "sarah.j@email.com",
      lastVisit: "2024-01-18",
      condition: "Type 2 Diabetes",
      status: "active",
      nextAppointment: "2024-02-01",
      notes: "Blood sugar levels improving. Continue current treatment plan.",
      medicalHistory: [
        "Type 2 Diabetes diagnosed in 2019",
        "Allergic to penicillin",
        "Previous gestational diabetes"
      ],
      currentMedications: [
        "Metformin 1000mg - Twice daily",
        "Insulin - As prescribed"
      ]
    },
    {
      id: "P003",
      name: "Mike Davis",
      age: 28,
      gender: "Male",
      phone: "+1-555-0125",
      email: "mike.davis@email.com",
      lastVisit: "2024-01-20",
      condition: "Eczema",
      status: "recovering",
      nextAppointment: "2024-01-30",
      notes: "Skin condition showing improvement with topical treatment.",
      medicalHistory: [
        "Eczema since childhood",
        "Seasonal allergies",
        "No other significant conditions"
      ],
      currentMedications: [
        "Hydrocortisone cream 1% - Apply twice daily",
        "Antihistamine - As needed"
      ]
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNote = (patientId: string, note: string) => {
    toast({
      title: "Note Added",
      description: `Note added to patient ${patientId} record.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b shadow-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/doctor/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Patient Management</h1>
              <p className="text-muted-foreground">View and manage your patients</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-medical-primary">
              <Search className="h-6 w-6" />
              <span>Search Patients</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient name or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-foreground text-lg">{patient.name}</h3>
                          <Badge variant="outline">{patient.age}y {patient.gender}</Badge>
                          <Badge 
                            variant={patient.status === "active" ? "default" : "secondary"}
                            className={patient.status === "active" ? "bg-success text-white" : ""}
                          >
                            {patient.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">Condition: {patient.condition}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Phone className="h-4 w-4" />
                            <span>{patient.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Mail className="h-4 w-4" />
                            <span>{patient.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Last visit: {patient.lastVisit}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center space-x-2">
                            <User className="h-5 w-5 text-medical-primary" />
                            <span>{patient.name} - Patient Details</span>
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Basic Info */}
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">Basic Information</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Age:</span>
                                <span className="ml-2 text-foreground">{patient.age} years</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Gender:</span>
                                <span className="ml-2 text-foreground">{patient.gender}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Phone:</span>
                                <span className="ml-2 text-foreground">{patient.phone}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Email:</span>
                                <span className="ml-2 text-foreground">{patient.email}</span>
                              </div>
                            </div>
                          </div>

                          {/* Medical History */}
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">Medical History</h4>
                            <ul className="space-y-1 text-sm">
                              {patient.medicalHistory.map((item, index) => (
                                <li key={index} className="text-muted-foreground">• {item}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Current Medications */}
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">Current Medications</h4>
                            <ul className="space-y-1 text-sm">
                              {patient.currentMedications.map((medication, index) => (
                                <li key={index} className="text-muted-foreground">• {medication}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Notes */}
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">Doctor's Notes</h4>
                            <p className="text-muted-foreground text-sm mb-3">{patient.notes}</p>
                            <Textarea 
                              placeholder="Add new note..."
                              className="mb-2"
                            />
                            <Button 
                              variant="medical" 
                              size="sm"
                              onClick={() => handleAddNote(patient.id, "New note added")}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Add Note
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="medical" size="sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="text-center py-12">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No patients found matching your search criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DoctorPatients;