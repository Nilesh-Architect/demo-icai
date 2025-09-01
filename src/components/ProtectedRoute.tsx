import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Login from '@/pages/Login';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'ca' | 'enterprise' | 'admin';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user } = useAuth();

  // If user is not logged in, show login page
  if (!user) {
    return <Login />;
  }

  // If specific role is required and user doesn't have it, show access denied
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
          <p className="text-xl text-muted-foreground mb-4">
            You don't have permission to access this page
          </p>
          <p className="text-sm text-muted-foreground">
            Required role: {requiredRole} | Your role: {user.role}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};