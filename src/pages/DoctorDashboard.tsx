import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  Clock, 
  Star, 
  Activity,
  FileText,
  Video,
  Phone,
  Settings,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const stats = [
    { title: "Today's Appointments", value: "12", icon: Calendar, color: "text-blue-600" },
    { title: "Total Patients", value: "1,247", icon: Users, color: "text-green-600" },
    { title: "Pending Reviews", value: "5", icon: Clock, color: "text-orange-600" },
    { title: "Rating", value: "4.9", icon: Star, color: "text-yellow-600" },
  ];

  const todayAppointments = [
    { time: "09:00 AM", patient: "John Smith", type: "Consultation", status: "upcoming" },
    { time: "10:30 AM", patient: "Sarah Johnson", type: "Follow-up", status: "completed" },
    { time: "11:15 AM", patient: "Mike Davis", type: "Check-up", status: "in-progress" },
    { time: "02:00 PM", patient: "Emily Wilson", type: "Consultation", status: "upcoming" },
    { time: "03:30 PM", patient: "David Brown", type: "Follow-up", status: "upcoming" },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/doctor/login");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b shadow-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Doctor Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Dr. Sarah Johnson</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/doctor/settings")}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Appointments */}
          <div className="lg:col-span-2">
            <Card className="shadow-medical">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-medical-primary">
                  <Calendar className="h-6 w-6" />
                  <span>Today's Appointments</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-md hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="font-medium text-foreground">{appointment.time}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{appointment.patient}</p>
                          <p className="text-sm text-muted-foreground">{appointment.type}</p>
                        </div>
                      </div>
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
                    </div>
                  ))}
                </div>
                <Button variant="medical" className="w-full mt-4" onClick={() => navigate("/doctor/appointments")}>
                  View All Appointments
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="shadow-medical">
              <CardHeader>
                <CardTitle className="text-medical-primary">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/doctor/patients")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Manage Patients
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/doctor/appointments")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Management
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/doctor/prescriptions")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Write Prescriptions
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Start Video Call
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Patient Records
                </Button>
                <Button 
                  variant="emergency" 
                  className="w-full justify-start"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Cases
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-card mt-6">
              <CardHeader>
                <CardTitle className="text-medical-primary">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-muted-foreground">Completed consultation with John Smith</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-medical-primary rounded-full"></div>
                    <span className="text-muted-foreground">Updated prescription for Sarah Johnson</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-muted-foreground">New appointment request pending</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;