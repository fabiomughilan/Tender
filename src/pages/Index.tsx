
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Building2, FileText, Users, TrendingUp } from "lucide-react";
import AuthForm from '@/components/AuthForm';
import Dashboard from '@/components/Dashboard';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { toast } = useToast();

  const handleAuthSuccess = (user: any) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    toast({
      title: "Welcome!",
      description: "Successfully logged in to the platform.",
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "Successfully logged out of the platform.",
    });
  };

  if (isAuthenticated) {
    return <Dashboard currentUser={currentUser} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">TenderHub</h1>
                <p className="text-sm text-gray-600">B2B Tender Management Platform</p>
              </div>
            </div>
            <Button variant="outline" className="hidden sm:flex">
              Learn More
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Streamline Your
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Business Tenders</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with companies, discover opportunities, and manage tenders efficiently on our comprehensive B2B platform.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md bg-white/80 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="bg-blue-100 rounded-lg p-2 w-fit">
                    <Search className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Smart Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Find companies by industry, services, and expertise</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white/80 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="bg-indigo-100 rounded-lg p-2 w-fit">
                    <FileText className="h-5 w-5 text-indigo-600" />
                  </div>
                  <CardTitle className="text-lg">Tender Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Create, publish, and track tender applications</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white/80 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="bg-green-100 rounded-lg p-2 w-fit">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Company Profiles</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Comprehensive business profiles with portfolio showcase</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white/80 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="bg-purple-100 rounded-lg p-2 w-fit">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Growth Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Track performance and business opportunities</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right side - Auth form */}
          <div className="lg:pl-8">
            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Get Started Today
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Join the leading B2B tender management platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AuthForm onAuthSuccess={handleAuthSuccess} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <section className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Leading Businesses
            </h3>
            <p className="text-xl text-gray-600">
              Join thousands of companies already using TenderHub
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">2,500+</div>
              <div className="text-gray-600">Active Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">15,000+</div>
              <div className="text-gray-600">Tenders Published</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">45,000+</div>
              <div className="text-gray-600">Applications Submitted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
