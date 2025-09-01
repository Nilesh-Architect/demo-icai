import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { JobPost } from '@/types/auth';
import { MapPin, Calendar, Building2, Plus, Users, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Jobs: React.FC = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<JobPost[]>([
    {
      id: '1',
      title: 'Senior Tax Consultant',
      company: 'KPMG India',
      location: 'Mumbai, Maharashtra',
      description: 'Looking for an experienced CA with expertise in direct and indirect taxation. Must have 5+ years of experience in tax consulting.',
      requirements: ['CA qualification', '5+ years experience', 'Tax expertise', 'Client management'],
      postedBy: 'KPMG HR Team',
      postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      applicants: ['1', '3']
    },
    {
      id: '2',
      title: 'Finance Manager - Fintech',
      company: 'PayTech Solutions',
      location: 'Bangalore, Karnataka',
      description: 'Join our growing fintech startup as Finance Manager. Lead financial planning, analysis, and compliance for innovative payment solutions.',
      requirements: ['CA/CMA qualification', '3-5 years experience', 'Fintech knowledge', 'Financial modeling'],
      postedBy: 'PayTech HR',
      postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      applicants: ['2']
    },
    {
      id: '3',
      title: 'Audit Senior Associate',
      company: 'Deloitte India',
      location: 'Delhi NCR',
      description: 'Opportunity to work on large-scale audit engagements with multinational clients. Growth-oriented role with excellent learning opportunities.',
      requirements: ['CA qualification', '2-4 years audit experience', 'Team leadership', 'Client interaction'],
      postedBy: 'Deloitte Talent Team',
      postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      applicants: []
    }
  ]);

  const [newJob, setNewJob] = useState({
    title: '',
    location: '',
    description: '',
    requirements: ''
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateJob = () => {
    if (!user || user.role !== 'enterprise') return;
    if (!newJob.title || !newJob.location || !newJob.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const job: JobPost = {
      id: Date.now().toString(),
      title: newJob.title,
      company: user.company || 'Company',
      location: newJob.location,
      description: newJob.description,
      requirements: newJob.requirements.split('\n').filter(req => req.trim()),
      postedBy: user.name,
      postedAt: new Date(),
      applicants: []
    };

    setJobs([job, ...jobs]);
    setNewJob({ title: '', location: '', description: '', requirements: '' });
    setIsDialogOpen(false);
    toast({
      title: "Job Posted",
      description: "Your job posting has been published successfully!"
    });
  };

  const handleApply = (jobId: string) => {
    if (!user || user.role !== 'ca') return;

    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        const hasApplied = job.applicants.includes(user.id);
        return {
          ...job,
          applicants: hasApplied 
            ? job.applicants.filter(id => id !== user.id)
            : [...job.applicants, user.id]
        };
      }
      return job;
    }));

    const hasApplied = jobs.find(job => job.id === jobId)?.applicants.includes(user.id);
    toast({
      title: hasApplied ? "Application Withdrawn" : "Application Sent",
      description: hasApplied 
        ? "Your application has been withdrawn"
        : "Your application has been submitted successfully!"
    });
  };

  const formatDate = (date: Date) => {
    const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Job Opportunities</h1>
          <p className="text-muted-foreground">
            {user?.role === 'ca' ? 'Find your next career opportunity' : 'Manage your job postings'}
          </p>
        </div>
        
        {user?.role === 'enterprise' && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:bg-primary-hover">
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Post a New Job Opportunity</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={newJob.title}
                    onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                    placeholder="e.g. Senior Tax Consultant"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={newJob.location}
                    onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                    placeholder="e.g. Mumbai, Maharashtra"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    placeholder="Describe the role, responsibilities, and what you're looking for..."
                    className="min-h-[120px]"
                  />
                </div>
                <div>
                  <Label htmlFor="requirements">Requirements (one per line)</Label>
                  <Textarea
                    id="requirements"
                    value={newJob.requirements}
                    onChange={(e) => setNewJob({...newJob, requirements: e.target.value})}
                    placeholder="CA qualification&#10;5+ years experience&#10;Tax expertise"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateJob} className="bg-gradient-primary hover:bg-primary-hover">
                    Post Job
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats */}
      {user?.role === 'enterprise' && (
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Postings</p>
                  <p className="text-2xl font-bold">{jobs.filter(job => job.postedBy === user.name).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Applications</p>
                  <p className="text-2xl font-bold">
                    {jobs.filter(job => job.postedBy === user.name).reduce((acc, job) => acc + job.applicants.length, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold">
                    {jobs.filter(job => job.postedBy === user.name && 
                      (Date.now() - job.postedAt.getTime()) < 7 * 24 * 60 * 60 * 1000).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Job Listings */}
      <div className="grid gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Building2 className="w-4 h-4 mr-1" />
                      {job.company}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(job.postedAt)}
                    </span>
                  </div>
                </div>
                {job.applicants.length > 0 && (
                  <Badge variant="secondary">
                    <Users className="w-3 h-3 mr-1" />
                    {job.applicants.length} applicant{job.applicants.length !== 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm leading-relaxed">{job.description}</p>
                
                {job.requirements.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-muted-foreground">Posted by {job.postedBy}</span>
                  
                  {user?.role === 'ca' && (
                    <Button 
                      onClick={() => handleApply(job.id)}
                      variant={job.applicants.includes(user.id) ? "outline" : "default"}
                      className={!job.applicants.includes(user.id) ? "bg-gradient-primary hover:bg-primary-hover" : ""}
                    >
                      {job.applicants.includes(user.id) ? 'Withdraw Application' : 'Apply Now'}
                    </Button>
                  )}
                  
                  {user?.role === 'enterprise' && job.postedBy === user.name && (
                    <Button variant="outline">
                      View Applications ({job.applicants.length})
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Jobs;