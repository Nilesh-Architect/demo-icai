import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, MessageCircle, Share, Send, Image as ImageIcon, MoreHorizontal } from 'lucide-react';
import { Post, Comment } from '@/types/auth';
import { toast } from '@/hooks/use-toast';

const Feed: React.FC = () => {
  const { user } = useAuth();
  const [newPost, setNewPost] = useState('');
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
      content: 'We\'re looking for experienced CAs to join our finance team in Bangalore. Excellent opportunity to work with cutting-edge fintech solutions. DM for details! #Hiring #CA #Fintech',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: ['1', '2', '5'],
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
      comments: []
    };

    setPosts([post, ...posts]);
    setNewPost('');
    toast({
      title: "Post Created",
      description: "Your post has been shared successfully!"
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
              <Textarea
                placeholder="What's on your professional mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[80px] border-none resize-none focus-visible:ring-0 p-0 text-base"
              />
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
            </div>
            <Button 
              onClick={handleCreatePost}
              disabled={!newPost.trim()}
              className="bg-gradient-primary hover:bg-primary-hover"
            >
              <Send className="w-4 h-4 mr-2" />
              Post
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
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
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {post.author.company} • {formatTimeAgo(post.createdAt)}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-base leading-relaxed">{post.content}</p>
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