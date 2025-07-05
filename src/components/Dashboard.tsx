
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, FileText, Search, Plus, LogOut, Bell, Settings, User } from "lucide-react";
import CompanyProfile from './CompanyProfile';
import TenderManagement from './TenderManagement';
import CompanySearch from './CompanySearch';
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  currentUser: any;
  onLogout: () => void;
}

const Dashboard = ({ currentUser, onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const mockStats = {
    activeTenders: 12,
    applications: 8,
    companies: 156,
    successRate: 85
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">TenderHub</h1>
                <p className="text-sm text-gray-600">{currentUser?.companyName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="tenders" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Tenders</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
                <p className="text-gray-600 mt-1">Here's what's happening with your business today.</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Tender
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Active Tenders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-900">{mockStats.activeTenders}</div>
                  <p className="text-blue-700 text-sm">+2 from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-900">{mockStats.applications}</div>
                  <p className="text-green-700 text-sm">+5 this week</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-purple-800 flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Companies Found
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-900">{mockStats.companies}</div>
                  <p className="text-purple-700 text-sm">In your network</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-orange-800 flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Success Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-900">{mockStats.successRate}%</div>
                  <p className="text-orange-700 text-sm">Above average</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest business activities and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-blue-500 rounded-full p-2">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">New tender published</p>
                    <p className="text-sm text-gray-600">Software Development Services - $50,000</p>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-green-500 rounded-full p-2">
                    <Building2 className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Application received</p>
                    <p className="text-sm text-gray-600">TechCorp Solutions applied to your tender</p>
                  </div>
                  <span className="text-sm text-gray-500">4 hours ago</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-purple-500 rounded-full p-2">
                    <Search className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Profile viewed</p>
                    <p className="text-sm text-gray-600">Innovation Labs viewed your company profile</p>
                  </div>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <CompanyProfile currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="tenders">
            <TenderManagement currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="search">
            <CompanySearch />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
