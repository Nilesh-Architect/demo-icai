import { useAuth } from "@/contexts/AuthContext";
import Login from "./Login";

const Index = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Login />;
  }

  // Redirect to appropriate dashboard based on role
  window.location.href = user.role === 'ca' ? '/feed' : 
                        user.role === 'enterprise' ? '/dashboard' : '/admin';
  
  return null;
};

export default Index;
