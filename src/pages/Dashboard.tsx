import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Briefcase, TrendingUp, Award, Building2, Shield, MessageSquare, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const renderCADashboard = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">Here's your professional activity overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Applications</p>
                <p className="text-3xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Network Connections</p>
                <p className="text-3xl font-bold">247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Post Likes</p>
                <p className="text-3xl font-bold">128</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                <p className="text-3xl font-bold">89</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { company: 'KPMG India', position: 'Senior Tax Consultant', status: 'Under Review', date: '2 days ago' },
              { company: 'Deloitte', position: 'Audit Associate', status: 'Interview Scheduled', date: '5 days ago' },
              { company: 'EY', position: 'Financial Analyst', status: 'Applied', date: '1 week ago' }
            ].map((app, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{app.position}</h4>
                  <p className="text-sm text-muted-foreground">{app.company} • {app.date}</p>
                </div>
                <Badge variant={app.status === 'Interview Scheduled' ? 'default' : 'secondary'}>
                  {app.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Jobs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: 'Finance Manager', company: 'TechCorp', match: '95%' },
              { title: 'Tax Specialist', company: 'PwC India', match: '88%' },
              { title: 'Senior Accountant', company: 'Infosys', match: '82%' }
            ].map((job, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{job.title}</h4>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
                <Badge variant="outline">{job.match} match</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderEnterpriseDashboard = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Enterprise Dashboard</h1>
        <p className="text-muted-foreground">Manage your hiring and recruitment activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                <p className="text-3xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                <p className="text-3xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hiring Rate</p>
                <p className="text-3xl font-bold">23%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Building2 className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Positions</p>
                <p className="text-3xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: 'Priya Sharma', position: 'Senior Tax Consultant', status: 'New', time: '2 hours ago' },
              { name: 'Amit Patel', position: 'Finance Manager', status: 'Reviewed', time: '1 day ago' },
              { name: 'Sneha Gupta', position: 'Audit Associate', status: 'Interview', time: '3 days ago' }
            ].map((app, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{app.name}</h4>
                  <p className="text-sm text-muted-foreground">{app.position} • {app.time}</p>
                </div>
                <Badge variant={app.status === 'New' ? 'default' : 'secondary'}>
                  {app.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Jobs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: 'Senior Tax Consultant', applications: 45, views: 234 },
              { title: 'Finance Manager', applications: 38, views: 189 },
              { title: 'Audit Senior', applications: 29, views: 156 }
            ].map((job, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{job.title}</h4>
                  <p className="text-sm text-muted-foreground">{job.applications} applications • {job.views} views</p>
                </div>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">ICAI Portal Management & Analytics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold">2,847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Posts This Week</p>
                <p className="text-3xl font-bold">423</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                <p className="text-3xl font-bold">17</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Growth This Month</p>
                <p className="text-3xl font-bold">+12%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Moderation Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: 'Post Approved', user: 'Priya Sharma', time: '1 hour ago', type: 'success' },
              { action: 'User Warned', user: 'Anonymous User', time: '3 hours ago', type: 'warning' },
              { action: 'Content Removed', user: 'Spam Account', time: '1 day ago', type: 'destructive' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{item.action}</h4>
                  <p className="text-sm text-muted-foreground">{item.user} • {item.time}</p>
                </div>
                <Badge variant={item.type as any}>
                  {item.action.split(' ')[0]}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { metric: 'Server Uptime', value: '99.9%', status: 'success' },
              { metric: 'Database Response', value: '45ms', status: 'success' },
              { metric: 'Error Rate', value: '0.02%', status: 'success' },
              { metric: 'Active Sessions', value: '1,247', status: 'default' }
            ].map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{metric.metric}</h4>
                  <p className="text-sm text-muted-foreground">Current status</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{metric.value}</p>
                  <Badge variant={metric.status as any} className="text-xs">
                    {metric.status === 'success' ? 'Healthy' : 'Normal'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  switch (user?.role) {
    case 'ca':
      return renderCADashboard();
    case 'enterprise':
      return renderEnterpriseDashboard();
    case 'admin':
      return renderAdminDashboard();
    default:
      return <div>Dashboard loading...</div>;
  }
};

export default Dashboard;