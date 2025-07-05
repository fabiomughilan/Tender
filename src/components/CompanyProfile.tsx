
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, Upload, Plus, X, MapPin, Globe, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompanyProfileProps {
  currentUser: any;
}

const CompanyProfile = ({ currentUser }: CompanyProfileProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [newService, setNewService] = useState('');
  
  const [profile, setProfile] = useState({
    companyName: currentUser?.companyName || 'Demo Company',
    industry: 'Technology',
    description: 'We are a leading technology company specializing in innovative software solutions and digital transformation services.',
    website: 'https://democompany.com',
    phone: '+1 (555) 123-4567',
    email: currentUser?.email || 'contact@democompany.com',
    address: '123 Business Ave, Tech City, TC 12345',
    logoUrl: '',
    services: ['Web Development', 'Mobile Apps', 'Cloud Solutions', 'UI/UX Design']
  });

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Construction',
    'Education', 'Retail', 'Transportation', 'Energy', 'Consulting'
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your company profile has been successfully updated.",
    });
  };

  const handleAddService = () => {
    if (newService.trim() && !profile.services.includes(newService.trim())) {
      setProfile({
        ...profile,
        services: [...profile.services, newService.trim()]
      });
      setNewService('');
    }
  };

  const handleRemoveService = (service: string) => {
    setProfile({
      ...profile,
      services: profile.services.filter(s => s !== service)
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to Supabase Storage
      const url = URL.createObjectURL(file);
      setProfile({ ...profile, logoUrl: url });
      toast({
        title: "Logo Uploaded",
        description: "Company logo has been updated successfully.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Company Profile</h2>
          <p className="text-gray-600 mt-1">Manage your company information and showcase your services</p>
        </div>
        <Button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          variant={isEditing ? "default" : "outline"}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.logoUrl} />
                  <AvatarFallback className="bg-blue-100 text-blue-800 text-2xl">
                    <Building2 className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="absolute -bottom-2 -right-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <Button size="sm" asChild className="rounded-full h-8 w-8 p-0">
                      <label htmlFor="logo-upload" className="cursor-pointer">
                        <Upload className="h-3 w-3" />
                      </label>
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <CardTitle>{profile.companyName}</CardTitle>
            <CardDescription>{profile.industry}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{profile.address}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Globe className="h-4 w-4" />
              <a href={profile.website} className="text-blue-600 hover:underline">{profile.website}</a>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              <span>{profile.email}</span>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Basic details about your company</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={profile.companyName}
                    onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select 
                    value={profile.industry} 
                    onValueChange={(value) => setProfile({ ...profile, industry: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  placeholder="Describe your company, its mission, and key strengths..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How other companies can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services & Expertise</CardTitle>
              <CardDescription>What your company specializes in</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing && (
                <div className="flex space-x-2 mb-4">
                  <Input
                    placeholder="Add a service or expertise area"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddService()}
                  />
                  <Button onClick={handleAddService} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {profile.services.map((service) => (
                  <Badge key={service} variant="secondary" className="px-3 py-1">
                    {service}
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => handleRemoveService(service)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
