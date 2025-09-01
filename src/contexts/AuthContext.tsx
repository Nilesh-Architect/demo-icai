import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from '@/types/auth';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for different roles
const demoUsers: Record<string, User> = {
  'ca@demo.com': {
    id: '1',
    name: 'Priya Sharma',
    email: 'ca@demo.com',
    role: 'ca',
    title: 'Senior Chartered Accountant',
    company: 'Sharma & Associates',
    membershipNumber: 'CA123456',
    location: 'Mumbai, Maharashtra',
    bio: 'Experienced CA specializing in taxation and audit. Member since 2015.',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya'
  },
  'enterprise@demo.com': {
    id: '2',
    name: 'Rajesh Kumar',
    email: 'enterprise@demo.com',
    role: 'enterprise',
    title: 'HR Director',
    company: 'TechCorp India',
    location: 'Bangalore, Karnataka',
    bio: 'Leading HR initiatives and talent acquisition for a growing tech company.',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh'
  },
  'admin@demo.com': {
    id: '3',
    name: 'Dr. Anjali Patel',
    email: 'admin@demo.com',
    role: 'admin',
    title: 'ICAI Secretariat',
    company: 'ICAI Head Office',
    location: 'New Delhi',
    bio: 'Managing ICAI portal operations and member services.',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali'
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const demoUser = demoUsers[email.toLowerCase()];
    if (demoUser && password === 'demo123') {
      setUser(demoUser);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${demoUser.name}!`,
      });
    } else {
      throw new Error('Invalid credentials. Use demo emails with password: demo123');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};