
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Building2, MapPin, Globe, Users, Star, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Company {
  id: number;
  name: string;
  industry: string;
  description: string;
  location: string;
  website: string;
  services: string[];
  logoUrl?: string;
  rating: number;
  employeeCount: string;
  foundedYear: number;
}

const CompanySearch = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [companies] = useState<Company[]>([
    {
      id: 1,
      name: 'TechCorp Solutions',
      industry: 'Technology',
      description: 'Leading provider of enterprise software solutions with 15+ years of experience in digital transformation.',
      location: 'San Francisco, CA',
      website: 'https://techcorp.com',
      services: ['Web Development', 'Cloud Computing', 'AI/ML', 'DevOps'],
      logoUrl: '',
      rating: 4.8,
      employeeCount: '50-200',
      foundedYear: 2008
    },
    {
      id: 2,
      name: 'Innovation Labs',
      industry: 'Design',
      description: 'Creative design agency specializing in user experience and digital product design for startups and enterprises.',
      location: 'New York, NY',
      website: 'https://innovationlabs.com',
      services: ['UI/UX Design', 'Branding', 'Product Strategy', 'Prototyping'],
      logoUrl: '',
      rating: 4.9,
      employeeCount: '10-50',
      foundedYear: 2015
    },
    {
      id: 3,
      name: 'BuildRight Construction',
      industry: 'Construction',
      description: 'Commercial construction company with expertise in sustainable building practices and project management.',
      location: 'Austin, TX',
      website: 'https://buildright.com',
      services: ['Commercial Construction', 'Project Management', 'Green Building', 'Renovation'],
      logoUrl: '',
      rating: 4.6,
      employeeCount: '200-500',
      foundedYear: 2005
    },
    {
      id: 4,
      name: 'DataFlow Analytics',
      industry: 'Analytics',
      description: 'Business intelligence and data analytics consultancy helping companies make data-driven decisions.',
      location: 'Seattle, WA',
      website: 'https://dataflow.com',
      services: ['Data Analytics', 'Business Intelligence', 'Machine Learning', 'Consulting'],
      logoUrl: '',
      rating: 4.7,
      employeeCount: '20-100',
      foundedYear: 2012
    },
    {
      id: 5,
      name: 'GreenTech Energy',
      industry: 'Energy',
      description: 'Renewable energy solutions provider specializing in solar and wind power installations for businesses.',
      location: 'Denver, CO',
      website: 'https://greentech.com',
      services: ['Solar Installation', 'Wind Power', 'Energy Consulting', 'Maintenance'],
      logoUrl: '',
      rating: 4.5,
      employeeCount: '100-300',
      foundedYear: 2010
    },
    {
      id: 6,
      name: 'ConsultPro Services',
      industry: 'Consulting',
      description: 'Management consulting firm helping businesses optimize operations and drive strategic growth.',
      location: 'Chicago, IL',
      website: 'https://consultpro.com',
      services: ['Strategy Consulting', 'Operations', 'Change Management', 'Digital Transformation'],
      logoUrl: '',
      rating: 4.4,
      employeeCount: '500+',
      foundedYear: 2000
    }
  ]);

  const industries = ['All', 'Technology', 'Design', 'Construction', 'Analytics', 'Energy', 'Consulting', 'Healthcare', 'Finance'];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = searchQuery === '' || 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase())) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = selectedIndustry === '' || selectedIndustry === 'All' || company.industry === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

  const handleViewProfile = (companyId: number) => {
    const company = companies.find(c => c.id === companyId);
    toast({
      title: "Profile Viewed",
      description: `Viewing ${company?.name} profile details.`,
    });
  };

  const CompanyCard = ({ company }: { company: Company }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={company.logoUrl} />
            <AvatarFallback className="bg-blue-100 text-blue-800 text-lg font-semibold">
              {company.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl mb-1">{company.name}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <span className="font-medium text-blue-600">{company.industry}</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{company.employeeCount} employees</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{company.rating}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-600">Founded {company.foundedYear}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleViewProfile(company.id)}>
                <Eye className="h-4 w-4 mr-1" />
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">{company.description}</p>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Globe className="h-4 w-4 text-gray-400" />
            <a href={company.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              {company.website}
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {company.services.map((service) => (
              <Badge key={service} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Company Search</h2>
        <p className="text-gray-600 mt-1">Discover and connect with potential business partners</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search companies by name, services, or industry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {isFilterOpen && (
              <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="industry-filter">Industry</Label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Industries" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location-filter">Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="ca">California</SelectItem>
                      <SelectItem value="ny">New York</SelectItem>
                      <SelectItem value="tx">Texas</SelectItem>
                      <SelectItem value="wa">Washington</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size-filter">Company Size</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Sizes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sizes</SelectItem>
                      <SelectItem value="startup">1-10 employees</SelectItem>
                      <SelectItem value="small">10-50 employees</SelectItem>
                      <SelectItem value="medium">50-200 employees</SelectItem>
                      <SelectItem value="large">200+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {filteredCompanies.length} Companies Found
          </h3>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Sort by Relevance</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="name">Company Name</SelectItem>
              <SelectItem value="founded">Recently Founded</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters to find more results.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompanySearch;
