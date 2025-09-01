import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Users, Building2, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive"
      });
    }
  };

  const demoAccounts = [
    {
      email: 'ca@demo.com',
      role: 'CA Member',
      description: 'Access CA dashboard, apply for jobs, create posts',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      email: 'enterprise@demo.com',
      role: 'Enterprise User',
      description: 'Post job opportunities, view candidates, manage hiring',
      icon: Building2,
      color: 'bg-green-500'
    },
    {
      email: 'admin@demo.com',
      role: 'ICAI Admin',
      description: 'Manage users, moderate content, view analytics',
      icon: Shield,
      color: 'bg-red-500'
    }
  ];

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-primary font-bold text-lg">IC</span>
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">ICAI Connect Hub</h1>
              <p className="text-white/80 text-sm">Professional Networking for Chartered Accountants</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full">
          
          {/* Left Column - Hero Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Connect. Collaborate. <br />
                <span className="text-blue-200">Grow Together.</span>
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                Join India's premier professional networking platform designed exclusively for 
                Chartered Accountants, enterprises, and the ICAI community.
              </p>
            </div>

            {/* Demo Account Cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white/90">Try with Demo Accounts:</h3>
              <div className="grid gap-3">
                {demoAccounts.map((account) => {
                  const Icon = account.icon;
                  return (
                    <Card 
                      key={account.email} 
                      className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-colors cursor-pointer"
                      onClick={() => handleDemoLogin(account.email)}
                    >
                      <CardContent className="p-4 flex items-center space-x-4">
                        <div className={`w-10 h-10 ${account.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{account.role}</h4>
                          <p className="text-white/70 text-sm">{account.description}</p>
                          <p className="text-white/60 text-xs mt-1">Email: {account.email}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md bg-white/95 backdrop-blur-md shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to your ICAI Connect account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:bg-primary-hover"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </form>
                
                <div className="mt-6 text-center text-sm text-muted-foreground">
                  Demo password for all accounts: <strong>demo123</strong>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;