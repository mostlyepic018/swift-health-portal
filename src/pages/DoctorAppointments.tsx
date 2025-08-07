import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Search, Filter, Clock, User, Phone, Video, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const appointments = [
    {
      id: "APT001",
      time: "09:00 AM",
      date: "2024-01-20",
      patient: "John Smith",
      age: 35,
      phone: "+1-555-0123",
      reason: "Annual Check-up",
      status: "upcoming",
      type: "in-person"
    },
    {
      id: "APT002",
      time: "10:30 AM",
      date: "2024-01-20",
      patient: "Sarah Johnson",
      age: 42,
      phone: "+1-555-0124",
      reason: "Follow-up consultation",
      status: "completed",
      type: "video"
    },
    {
      id: "APT003",
      time: "11:15 AM",
      date: "2024-01-20",
      patient: "Mike Davis",
      age: 28,
      phone: "+1-555-0125",
      reason: "Skin condition check",
      status: "in-progress",
      type: "in-person"
    },
    {
      id: "APT004",
      time: "02:00 PM",
      date: "2024-01-20",
      patient: "Emily Wilson",
      age: 31,
      phone: "+1-555-0126",
      reason: "Prescription renewal",
      status: "upcoming",
      type: "video"
    },
    {
      id: "APT005",
      time: "03:30 PM",
      date: "2024-01-20",
      patient: "David Brown",
      age: 54,
      phone: "+1-555-0127",
      reason: "Blood pressure monitoring",
      status: "upcoming",
      type: "in-person"
    }
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Appointment ${appointmentId} status changed to ${newStatus}.`,
    });
  };

  const handleStartConsultation = (appointment: any) => {
    if (appointment.type === "video") {
      toast({
        title: "Starting Video Call",
        description: `Connecting with ${appointment.patient}...`,
      });
    } else {
      toast({
        title: "Patient Ready",
        description: `${appointment.patient} is ready for consultation.`,
      });
    }
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
              <h1 className="text-2xl font-bold text-foreground">Appointment Management</h1>
              <p className="text-muted-foreground">Manage your patient appointments</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-medical-primary">
              <Filter className="h-6 w-6" />
              <span>Filter Appointments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by patient name or reason..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="text-center">
                        <p className="font-bold text-foreground text-lg">{appointment.time}</p>
                        <p className="text-sm text-muted-foreground">{appointment.date}</p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-foreground text-lg">{appointment.patient}</h3>
                          <Badge variant="outline">Age {appointment.age}</Badge>
                          <Badge variant={appointment.type === "video" ? "default" : "secondary"}>
                            {appointment.type === "video" ? (
                              <>
                                <Video className="h-3 w-3 mr-1" />
                                Video
                              </>
                            ) : (
                              <>
                                <User className="h-3 w-3 mr-1" />
                                In-person
                              </>
                            )}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-1">{appointment.reason}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>{appointment.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={
                        appointment.status === "completed" ? "default" :
                        appointment.status === "in-progress" ? "destructive" : "secondary"
                      }
                      className={
                        appointment.status === "completed" ? "bg-success text-white" :
                        appointment.status === "in-progress" ? "bg-orange-500 text-white" : ""
                      }
                    >
                      {appointment.status}
                    </Badge>
                    
                    <div className="flex space-x-2">
                      {appointment.status === "upcoming" && (
                        <Button 
                          variant="medical"
                          size="sm"
                          onClick={() => handleStartConsultation(appointment)}
                        >
                          {appointment.type === "video" ? (
                            <>
                              <Video className="h-4 w-4 mr-1" />
                              Start Call
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 mr-1" />
                              Begin
                            </>
                          )}
                        </Button>
                      )}
                      
                      {appointment.status === "in-progress" && (
                        <Button 
                          variant="default"
                          size="sm"
                          onClick={() => handleStatusChange(appointment.id, "completed")}
                        >
                          Complete
                        </Button>
                      )}
                      
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No appointments found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;