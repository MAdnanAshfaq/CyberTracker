import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  BarChart3, 
  Link, 
  MapPin, 
  TrendingUp, 
  Settings, 
  LogOut,
  User
} from "lucide-react";

export function Sidebar() {
  const { user, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="w-64 bg-cyber-gray border-r border-slate-700 flex flex-col">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-cyber-blue rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">TraceIntel</h1>
            <p className="text-xs text-slate-400">Intelligence Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-white bg-cyber-blue hover:bg-blue-600"
        >
          <BarChart3 className="mr-3 h-4 w-4" />
          Dashboard
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          <Link className="mr-3 h-4 w-4" />
          Tracking Links
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          <MapPin className="mr-3 h-4 w-4" />
          Geolocation
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          <TrendingUp className="mr-3 h-4 w-4" />
          Analytics
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          <Settings className="mr-3 h-4 w-4" />
          Settings
        </Button>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-slate-300" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">
              {user?.email || "User"}
            </p>
            <p className="text-xs text-slate-400">Security Analyst</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white p-1"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
