import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Edit, Save, X, MapPin, Building2, Calendar, Award } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    title: user?.title || '',
    company: user?.company || '',
    location: user?.location || '',
    bio: user?.bio || ''
  });

  const handleSave = () => {
    // In a real app, this would update the user in the backend
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully!"
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      title: user?.title || '',
      company: user?.company || '',
      location: user?.location || '',
      bio: user?.bio || ''
    });
    setIsEditing(false);
  };

  const getRoleInfo = () => {
    switch (user?.role) {
      case 'ca':
        return {
          title: 'CA Member',
          color: 'bg-blue-500',
          description: 'Chartered Accountant'
        };
      case 'enterprise':
        return {
          title: 'Enterprise User',
          color: 'bg-green-500',
          description: 'Corporate Professional'
        };
      case 'admin':
        return {
          title: 'ICAI Admin',
          color: 'bg-red-500',
          description: 'Portal Administrator'
        };
      default:
        return {
          title: 'User',
          color: 'bg-gray-500',
          description: 'Platform User'
        };
    }
  };

  const roleInfo = getRoleInfo();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage src={user?.profileImage} alt={user?.name} />
                <AvatarFallback className="text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 ${roleInfo.color} rounded-full flex items-center justify-center`}>
                <Award className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <h1 className="text-3xl font-bold">{user?.name}</h1>
                    <p className="text-xl text-muted-foreground">{user?.title}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    {user?.company && (
                      <span className="flex items-center">
                        <Building2 className="w-4 h-4 mr-1" />
                        {user.company}
                      </span>
                    )}
                    {user?.location && (
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {user.location}
                      </span>
                    )}
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Member since 2024
                    </span>
                  </div>
                  
                  {user?.bio && (
                    <p className="text-base leading-relaxed max-w-2xl">{user.bio}</p>
                  )}
                  
                  <div className="flex items-center space-x-3">
                    <Badge className={roleInfo.color}>{roleInfo.title}</Badge>
                    {user?.membershipNumber && (
                      <Badge variant="outline">Member: {user.membershipNumber}</Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col space-y-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} className="bg-gradient-primary hover:bg-primary-hover">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Profile Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">89</div>
            <p className="text-sm text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Network Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">247</div>
            <p className="text-sm text-muted-foreground">+5 new this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Post Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">128</div>
            <p className="text-sm text-muted-foreground">Total likes received</p>
          </CardContent>
        </Card>
      </div>

      {/* Professional Details */}
      {user?.role === 'ca' && (
        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Taxation</Badge>
                  <Badge variant="secondary">Audit & Assurance</Badge>
                  <Badge variant="secondary">Financial Consulting</Badge>
                  <Badge variant="secondary">Corporate Finance</Badge>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Certifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm">Chartered Accountant - ICAI (2020)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">GST Practitioner Certificate</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Email Address</Label>
              <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
            </div>
            <div>
              <Label>Account Type</Label>
              <p className="text-sm text-muted-foreground mt-1">{roleInfo.description}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Privacy Settings</h4>
                <p className="text-sm text-muted-foreground">Control who can see your profile and contact you</p>
              </div>
              <Button variant="outline" size="sm">
                Manage Privacy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;