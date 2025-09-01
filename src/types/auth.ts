export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ca' | 'enterprise' | 'admin';
  profileImage?: string;
  title?: string;
  company?: string;
  membershipNumber?: string;
  location?: string;
  bio?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface JobPost {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  postedBy: string;
  postedAt: Date;
  applicants: string[];
}

export interface Post {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
  likes: string[];
  comments: Comment[];
  image?: string;
  type?: 'post' | 'job' | 'announcement';
  jobDetails?: JobPost;
  isApproved?: boolean;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
}