import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, MessageCircle, Share, Send, Image as ImageIcon, MoreHorizontal, Briefcase, CheckCircle, XCircle, Megaphone, MapPin, Clock, Building2 } from 'lucide-react';
import { Post, Comment, JobPost } from '@/types/auth';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Feed: React.FC = () => {
  const { user } = useAuth();
  const [newPost, setNewPost] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [showJobForm, setShowJobForm] = useState(false);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        id: '2',
        name: 'Anjali Mehta',
        email: 'anjali@example.com',
        role: 'ca',
        title: 'Tax Consultant',
        company: 'Mehta & Associates',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali'
      },
      content: 'Just completed a complex GST audit for a multinational client. The new compliance requirements are challenging but manageable with proper planning. #GST #Audit #ICAI',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: ['1', '3'],
      type: 'post',
      isApproved: true,
      comments: [
        {
          id: '1',
          author: {
            id: '1',
            name: 'Priya Sharma',
            email: 'priya@example.com',
            role: 'ca',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya'
          },
          content: 'Great work! GST audits can be quite complex. Any specific challenges you faced?',
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: '2',
      author: {
        id: '4',
        name: 'TechCorp India',
        email: 'hr@techcorp.com',
        role: 'enterprise',
        title: 'HR Team',
        company: 'TechCorp India',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=techcorp'
      },
      content: 'We\'re looking for experienced CAs to join our finance team in Bangalore. Excellent opportunity to work with cutting-edge fintech solutions.',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: ['1', '2', '5'],
      type: 'job',
      isApproved: true,
      jobDetails: {
        id: '2',
        title: 'Senior Finance Analyst',
        company: 'TechCorp India',
        location: 'Bangalore, Karnataka',
        description: 'We\'re looking for experienced CAs to join our finance team. Excellent opportunity to work with cutting-edge fintech solutions.',
        requirements: ['CA qualification', '3+ years experience', 'Fintech knowledge'],
        postedBy: '4',
        postedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        applicants: []
      },
      comments: []
    },
    {
      id: '3',
      author: {
        id: '3',
        name: 'Dr. Anjali Patel',
        email: 'admin@demo.com',
        role: 'admin',
        title: 'ICAI Secretariat',
        company: 'ICAI Head Office',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali'
      },
      content: 'Important Update: New CPE requirements are now live. All members must complete 40 hours of Continuing Professional Education by March 2024. Visit ICAI portal for detailed guidelines.',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: ['1', '2', '4', '5'],
      type: 'announcement',
      isApproved: true,
      comments: []
    }
  ]);

  const handleCreatePost = () => {
    if (!newPost.trim() || !user) return;

    const post: Post = {
      id: Date.now().toString(),
      author: user,
      content: newPost,
      createdAt: new Date(),
      likes: [],
      comments: [],
      type: 'post',
      isApproved: user.role === 'admin'
    };

    setPosts([post, ...posts]);
    setNewPost('');
    toast({
      title: "Post Created",
      description: user.role === 'admin' ? "Post published!" : "Post submitted for review!"
    });
  };

  const handleCreateJob = () => {
    if (!jobTitle.trim() || !jobLocation.trim() || !jobDescription.trim() || !user) return;

    const jobPost: JobPost = {
      id: Date.now().toString(),
      title: jobTitle,
      company: user.company || 'Company',
      location: jobLocation,
      description: jobDescription,
      requirements: ['CA qualification required'],
      postedBy: user.id,
      postedAt: new Date(),
      applicants: []
    };

    const post: Post = {
      id: Date.now().toString(),
      author: user,
      content: `New job opportunity: ${jobTitle} at ${user.company || 'our company'} in ${jobLocation}`,
      createdAt: new Date(),
      likes: [],
      comments: [],
      type: 'job',
      jobDetails: jobPost,
      isApproved: true
    };

    setPosts([post, ...posts]);
    setJobTitle('');
    setJobLocation('');
    setJobDescription('');
    setShowJobForm(false);
    toast({
      title: "Job Posted",
      description: "Your job opportunity has been published!"
    });
  };

  const handleCreateAnnouncement = () => {
    if (!newPost.trim() || !user) return;

    const post: Post = {
      id: Date.now().toString(),
      author: user,
      content: newPost,
      createdAt: new Date(),
      likes: [],
      comments: [],
      type: 'announcement',
      isApproved: true
    };

    setPosts([post, ...posts]);
    setNewPost('');
    setShowAnnouncementForm(false);
    toast({
      title: "Announcement Published",
      description: "ICAI announcement has been published to all users!"
    });
  };

  const handleApprovePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, isApproved: true } : post
    ));
    toast({
      title: "Post Approved",
      description: "The post has been approved and is now visible to all users."
    });
  };

  const handleRejectPost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
    toast({
      title: "Post Rejected",
      description: "The post has been removed from the feed."
    });
  };

  const handleApplyToJob = (jobId: string) => {
    if (!user) return;
    
    setPosts(posts.map(post => {
      if (post.id === jobId && post.jobDetails) {
        const updatedJob = {
          ...post.jobDetails,
          applicants: [...post.jobDetails.applicants, user.id]
        };
        return { ...post, jobDetails: updatedJob };
      }
      return post;
    }));
    
    toast({
      title: "Application Submitted",
      description: "Your application has been sent to the employer!"
    });
  };

  const handleLike = (postId: string) => {
    if (!user) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(user.id);
        return {
          ...post,
          likes: isLiked 
            ? post.likes.filter(id => id !== user.id)
            : [...post.likes, user.id]
        };
      }
      return post;
    }));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  // Filter posts based on user role and approval status
  const visiblePosts = posts.filter(post => {
    if (user?.role === 'admin') return true; // Admins see all posts
    return post.isApproved; // Other users only see approved posts
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Create Post */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.profileImage} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              {!showJobForm && !showAnnouncementForm && (
                <Textarea
                  placeholder={
                    user?.role === 'enterprise' 
                      ? "Share an update or post a job opportunity..." 
                      : user?.role === 'admin' 
                      ? "Share an announcement or update..." 
                      : "What's on your professional mind?"
                  }
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[80px] border-none resize-none focus-visible:ring-0 p-0 text-base"
                />
              )}
              
              {/* Job Form */}
              {showJobForm && (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                  <Textarea
                    placeholder="Job Description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              )}

              {/* Announcement Form */}
              {showAnnouncementForm && (
                <Textarea
                  placeholder="Write your ICAI announcement..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[80px] border-none resize-none focus-visible:ring-0 p-0 text-base"
                />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <ImageIcon className="w-4 h-4 mr-2" />
                Photo
              </Button>
              
              {/* Enterprise Job Posting */}
              {user?.role === 'enterprise' && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setShowJobForm(!showJobForm);
                    setShowAnnouncementForm(false);
                  }}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  {showJobForm ? 'Cancel' : 'Job Post'}
                </Button>
              )}
              
              {/* Admin Announcement */}
              {user?.role === 'admin' && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setShowAnnouncementForm(!showAnnouncementForm);
                    setShowJobForm(false);
                  }}
                >
                  <Megaphone className="w-4 h-4 mr-2" />
                  {showAnnouncementForm ? 'Cancel' : 'Announcement'}
                </Button>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {showJobForm && (
                <Button 
                  onClick={handleCreateJob}
                  disabled={!jobTitle.trim() || !jobLocation.trim() || !jobDescription.trim()}
                  className="bg-gradient-primary hover:bg-primary-hover"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Post Job
                </Button>
              )}
              
              {showAnnouncementForm && (
                <Button 
                  onClick={handleCreateAnnouncement}
                  disabled={!newPost.trim()}
                  className="bg-gradient-primary hover:bg-primary-hover"
                >
                  <Megaphone className="w-4 h-4 mr-2" />
                  Publish
                </Button>
              )}
              
              {!showJobForm && !showAnnouncementForm && (
                <Button 
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                  className="bg-gradient-primary hover:bg-primary-hover"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-4">
        {visiblePosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              {/* Post Header */}
              <div className="flex items-start space-x-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.profileImage} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{post.author.name}</h3>
                    {post.author.title && (
                      <span className="text-sm text-muted-foreground">• {post.author.title}</span>
                    )}
                    
                    {/* Post Type Badge */}
                    {post.type === 'job' && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        <Briefcase className="w-3 h-3 mr-1" />
                        Job
                      </Badge>
                    )}
                    {post.type === 'announcement' && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                        <Megaphone className="w-3 h-3 mr-1" />
                        ICAI
                      </Badge>
                    )}
                    
                    {/* Approval Status for Admins */}
                    {user?.role === 'admin' && !post.isApproved && (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        Pending Review
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {post.author.company} • {formatTimeAgo(post.createdAt)}
                  </p>
                </div>
                
                {/* Admin Actions */}
                {user?.role === 'admin' && !post.isApproved && (
                  <div className="flex items-center space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleApprovePost(post.id)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRejectPost(post.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                {(user?.role !== 'admin' || post.isApproved) && (
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-base leading-relaxed">{post.content}</p>
                
                {/* Job Details */}
                {post.type === 'job' && post.jobDetails && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{post.jobDetails.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center">
                            <Building2 className="w-4 h-4 mr-1" />
                            {post.jobDetails.company}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {post.jobDetails.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatTimeAgo(post.jobDetails.postedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-3">{post.jobDetails.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {post.jobDetails.applicants.length} applicant{post.jobDetails.applicants.length !== 1 ? 's' : ''}
                      </div>
                      
                      {user?.role === 'ca' && !post.jobDetails.applicants.includes(user.id) && (
                        <Button 
                          size="sm"
                          onClick={() => handleApplyToJob(post.id)}
                          className="bg-gradient-primary hover:bg-primary-hover"
                        >
                          Apply Now
                        </Button>
                      )}
                      
                      {user?.role === 'ca' && post.jobDetails.applicants.includes(user.id) && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Applied
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center space-x-6">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={post.likes.includes(user?.id || '') ? 'text-red-500' : ''}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Like {post.likes.length > 0 && `(${post.likes.length})`}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Comment {post.comments.length > 0 && `(${post.comments.length})`}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Comments */}
              {post.comments.length > 0 && (
                <div className="mt-4 pt-4 border-t space-y-3">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author.profileImage} alt={comment.author.name} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 bg-muted rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-sm">{comment.author.name}</h4>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Feed;