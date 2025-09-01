import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from './dropdown-menu';
import { Home, Briefcase, Users, Settings, LogOut, Bell } from 'lucide-react';
import { Badge } from './badge';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getNavigationItems = () => {
    switch (user?.role) {
      case 'ca':
        return [
          { path: '/feed', label: 'Feed', icon: Home },
          { path: '/jobs', label: 'Jobs', icon: Briefcase },
          { path: '/network', label: 'Network', icon: Users },
        ];
      case 'enterprise':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: Home },
          { path: '/jobs', label: 'Job Posts', icon: Briefcase },
          { path: '/candidates', label: 'Candidates', icon: Users },
        ];
      case 'admin':
        return [
          { path: '/admin', label: 'Dashboard', icon: Home },
          { path: '/users', label: 'User Management', icon: Users },
          { path: '/content', label: 'Content Moderation', icon: Settings },
        ];
      default:
        return [];
    }
  };

  const getRoleBadge = () => {
    switch (user?.role) {
      case 'ca':
        return <Badge variant="secondary">CA Member</Badge>;
      case 'enterprise':
        return <Badge variant="outline">Enterprise</Badge>;
      case 'admin':
        return <Badge variant="destructive">Admin</Badge>;
      default:
        return null;
    }
  };

  if (!user) return null;

  const navigationItems = getNavigationItems();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 mr-8">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IC</span>
          </div>
          <span className="font-semibold text-lg">ICAI Connect</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 flex-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs"></span>
          </Button>

          {/* Role Badge */}
          {getRoleBadge()}

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.profileImage} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};