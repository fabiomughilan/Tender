
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarDays, DollarSign, FileText, Plus, Eye, Edit, Trash2, Clock, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TenderManagementProps {
  currentUser: any;
}

interface Tender {
  id: number;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  category: string;
  status: 'active' | 'closed' | 'draft';
  applicationsCount: number;
  createdAt: string;
}

const TenderManagement = ({ currentUser }: TenderManagementProps) => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const [newTender, setNewTender] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    category: ''
  });

  const [myTenders, setMyTenders] = useState<Tender[]>([
    {
      id: 1,
      title: 'Web Application Development',
      description: 'Looking for experienced developers to build a modern web application with React and Node.js.',
      budget: '$50,000',
      deadline: '2024-08-15',
      category: 'Technology',
      status: 'active',
      applicationsCount: 12,
      createdAt: '2024-07-01'
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      description: 'Need professional designers for mobile app interface design and user experience optimization.',
      budget: '$25,000',
      deadline: '2024-07-30',
      category: 'Design',
      status: 'active',
      applicationsCount: 8,
      createdAt: '2024-06-15'
    },
    {
      id: 3,
      title: 'Cloud Infrastructure Setup',
      description: 'Seeking cloud architects to set up scalable infrastructure on AWS with DevOps best practices.',
      budget: '$35,000',
      deadline: '2024-07-20',
      category: 'Infrastructure',
      status: 'closed',
      applicationsCount: 15,
      createdAt: '2024-06-01'
    }
  ]);

  const [availableTenders] = useState<Tender[]>([
    {
      id: 4,
      title: 'E-commerce Platform Development',
      description: 'Building a comprehensive e-commerce solution with payment integration and inventory management.',
      budget: '$75,000',
      deadline: '2024-09-01',
      category: 'E-commerce',
      status: 'active',
      applicationsCount: 18,
      createdAt: '2024-06-20'
    },
    {
      id: 5,
      title: 'Marketing Website Redesign',
      description: 'Complete redesign of corporate website with modern design and SEO optimization.',
      budget: '$15,000',
      deadline: '2024-08-10',
      category: 'Web Design',
      status: 'active',
      applicationsCount: 22,
      createdAt: '2024-06-25'
    },
    {
      id: 6,
      title: 'Data Analytics Dashboard',
      description: 'Custom dashboard for business intelligence with real-time data visualization capabilities.',
      budget: '$40,000',
      deadline: '2024-08-25',
      category: 'Analytics',
      status: 'active',
      applicationsCount: 9,
      createdAt: '2024-07-02'
    }
  ]);

  const categories = ['Technology', 'Design', 'Marketing', 'Infrastructure', 'Consulting', 'Analytics', 'E-commerce'];

  const handleCreateTender = () => {
    if (!newTender.title || !newTender.description || !newTender.budget || !newTender.deadline || !newTender.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const tender: Tender = {
      id: Date.now(),
      ...newTender,
      status: 'active',
      applicationsCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setMyTenders([tender, ...myTenders]);
    setNewTender({
      title: '',
      description: '',
      budget: '',
      deadline: '',
      category: ''
    });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Success!",
      description: "Your tender has been published successfully.",
    });
  };

  const handleApplyToTender = (tenderId: number) => {
    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully. The company will review it soon.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const TenderCard = ({ tender, showApplyButton = false }: { tender: Tender; showApplyButton?: boolean }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-xl">{tender.title}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Building2 className="h-4 w-4" />
                <span>{tender.category}</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="h-4 w-4" />
                <span>{tender.budget}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CalendarDays className="h-4 w-4" />
                <span>{new Date(tender.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <Badge className={getStatusColor(tender.status)} variant="secondary">
            {tender.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">{tender.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{tender.applicationsCount} applications</span>
            <span>Posted {new Date(tender.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex space-x-2">
            {showApplyButton ? (
              <Button onClick={() => handleApplyToTender(tender.id)}>
                Apply Now
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Tender Management</h2>
          <p className="text-gray-600 mt-1">Create, manage, and apply to business tenders</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Tender
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Tender</DialogTitle>
              <DialogDescription>
                Publish a new tender to find the right partners for your project
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTender.title}
                  onChange={(e) => setNewTender({ ...newTender, title: e.target.value })}
                  placeholder="Enter tender title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    value={newTender.budget}
                    onChange={(e) => setNewTender({ ...newTender, budget: e.target.value })}
                    placeholder="e.g., $50,000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newTender.deadline}
                    onChange={(e) => setNewTender({ ...newTender, deadline: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newTender.category} onValueChange={(value) => setNewTender({ ...newTender, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTender.description}
                  onChange={(e) => setNewTender({ ...newTender, description: e.target.value })}
                  rows={4}
                  placeholder="Describe your project requirements, scope of work, and expectations..."
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateTender}>Publish Tender</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="my-tenders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="my-tenders">My Tenders ({myTenders.length})</TabsTrigger>
          <TabsTrigger value="available-tenders">Available Tenders ({availableTenders.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="my-tenders" className="space-y-4">
          {myTenders.length > 0 ? (
            <div className="grid gap-6">
              {myTenders.map((tender) => (
                <TenderCard key={tender.id} tender={tender} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tenders yet</h3>
                <p className="text-gray-600 mb-6">Create your first tender to start finding business partners</p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Tender
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="available-tenders" className="space-y-4">
          <div className="grid gap-6">
            {availableTenders.map((tender) => (
              <TenderCard key={tender.id} tender={tender} showApplyButton />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TenderManagement;
