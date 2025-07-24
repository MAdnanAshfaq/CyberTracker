import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
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
  const [location, navigate] = useLocation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const isActive = (path: string) => location === path;

  return (
    <div className="w-64 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700/50 flex flex-col">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <img src="ChatGPT Image Jul 24, 2025, 04_15_44 PM.png" alt="Tracentel Logo" className="w-10 h-10 object-contain" />
          <div>
            <h1 className="text-xl font-bold text-white">TRACENTEL</h1>
            <p className="text-xs text-slate-400">Intelligence Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${
            isActive('/') 
              ? 'text-white bg-gradient-to-r from-blue-500/30 to-blue-600/30 border-r-2 border-blue-400' 
              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
          }`}
          onClick={() => navigate('/')}
        >
          <BarChart3 className="mr-3 h-4 w-4" />
          Dashboard
        </Button>
        
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${
            isActive('/tracking-links') 
              ? 'text-white bg-gradient-to-r from-blue-500/30 to-blue-600/30 border-r-2 border-blue-400' 
              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
          }`}
          onClick={() => navigate('/tracking-links')}
        >
          <Link className="mr-3 h-4 w-4" />
          Tracking Links
        </Button>
        
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${
            isActive('/geolocation') 
              ? 'text-white bg-gradient-to-r from-blue-500/30 to-blue-600/30 border-r-2 border-blue-400' 
              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
          }`}
          onClick={() => navigate('/geolocation')}
        >
          <MapPin className="mr-3 h-4 w-4" />
          Geolocation
        </Button>
        
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${
            isActive('/analytics') 
              ? 'text-white bg-gradient-to-r from-blue-500/30 to-blue-600/30 border-r-2 border-blue-400' 
              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
          }`}
          onClick={() => navigate('/analytics')}
        >
          <TrendingUp className="mr-3 h-4 w-4" />
          Analytics
        </Button>
        
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${
            isActive('/settings') 
              ? 'text-white bg-gradient-to-r from-blue-500/30 to-blue-600/30 border-r-2 border-blue-400' 
              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
          }`}
          onClick={() => navigate('/settings')}
        >
          <Settings className="mr-3 h-4 w-4" />
          Settings
        </Button>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
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
