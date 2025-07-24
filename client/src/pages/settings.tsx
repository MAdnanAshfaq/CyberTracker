import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Database,
  Key,
  Globe,
  Save
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<'profile' | 'security' | 'notifications' | 'privacy' | 'apikeys'>('profile');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#0f172a] to-[#1e293b] text-slate-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Settings</h2>
              <p className="text-slate-400">Configure your TraceIntel preferences</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300">Live</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Settings Navigation */}
              <div className="lg:col-span-1">
                <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-1">
                      <Button variant="ghost" className={`w-full justify-start ${tab === 'profile' ? 'text-white bg-blue-500/20' : 'text-slate-300 hover:bg-slate-700/50'}`} onClick={() => setTab('profile')}>
                        <User className="mr-3 h-4 w-4" />
                        Profile
                      </Button>
                      <Button variant="ghost" className={`w-full justify-start ${tab === 'security' ? 'text-white bg-blue-500/20' : 'text-slate-300 hover:bg-slate-700/50'}`} onClick={() => setTab('security')}>
                        <Shield className="mr-3 h-4 w-4" />
                        Security
                      </Button>
                      <Button variant="ghost" className={`w-full justify-start ${tab === 'notifications' ? 'text-white bg-blue-500/20' : 'text-slate-300 hover:bg-slate-700/50'}`} onClick={() => setTab('notifications')}>
                        <Bell className="mr-3 h-4 w-4" />
                        Notifications
                      </Button>
                      <Button variant="ghost" className={`w-full justify-start ${tab === 'privacy' ? 'text-white bg-blue-500/20' : 'text-slate-300 hover:bg-slate-700/50'}`} onClick={() => setTab('privacy')}>
                        <Database className="mr-3 h-4 w-4" />
                        Data & Privacy
                      </Button>
                      <Button variant="ghost" className={`w-full justify-start ${tab === 'apikeys' ? 'text-white bg-blue-500/20' : 'text-slate-300 hover:bg-slate-700/50'}`} onClick={() => setTab('apikeys')}>
                        <Key className="mr-3 h-4 w-4" />
                        API Keys
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Settings Content */}
              <div className="lg:col-span-2 space-y-8">
                {tab === 'profile' && (
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <User className="mr-2 h-5 w-5" />
                        Profile Settings
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Update your account information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-300">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={user?.email || ""}
                          disabled
                          className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400"
                        />
                        <p className="text-xs text-slate-500">
                          Email changes require verification
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role" className="text-slate-300">
                          Role
                        </Label>
                        <Input
                          id="role"
                          value="Security Analyst"
                          disabled
                          className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone" className="text-slate-300">
                          Timezone
                        </Label>
                        <Input
                          id="timezone"
                          value="UTC"
                          className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400"
                        />
                      </div>

                      <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>
                )}
                {tab === 'security' && (
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Shield className="mr-2 h-5 w-5" />
                        Security Settings
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Manage your account security
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="current-password" className="text-slate-300">
                          Current Password
                        </Label>
                        <Input
                          id="current-password"
                          type="password"
                          placeholder="Enter current password"
                          className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-password" className="text-slate-300">
                          New Password
                        </Label>
                        <Input
                          id="new-password"
                          type="password"
                          placeholder="Enter new password"
                          className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-slate-300">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm new password"
                          className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400"
                        />
                      </div>

                      <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                        <Shield className="mr-2 h-4 w-4" />
                        Update Password
                      </Button>
                    </CardContent>
                  </Card>
                )}
                {tab === 'notifications' && (
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Bell className="mr-2 h-5 w-5" />
                        Notification Settings
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Configure alert preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Email Notifications</p>
                            <p className="text-sm text-slate-400">Receive alerts via email</p>
                          </div>
                          <div className="w-12 h-6 bg-slate-700 rounded-full relative">
                            <div className="w-5 h-5 bg-blue-500 rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Real-time Alerts</p>
                            <p className="text-sm text-slate-400">Instant notifications for new clicks</p>
                          </div>
                          <div className="w-12 h-6 bg-slate-700 rounded-full relative">
                            <div className="w-5 h-5 bg-slate-500 rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Weekly Reports</p>
                            <p className="text-sm text-slate-400">Summary of weekly activity</p>
                          </div>
                          <div className="w-12 h-6 bg-slate-700 rounded-full relative">
                            <div className="w-5 h-5 bg-blue-500 rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                          </div>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                        <Save className="mr-2 h-4 w-4" />
                        Save Preferences
                      </Button>
                    </CardContent>
                  </Card>
                )}
                {tab === 'privacy' && (
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Database className="mr-2 h-5 w-5" />
                        Data & Privacy
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Manage your data and privacy settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-slate-300">Download My Data</Label>
                        <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                          Download
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">Delete My Account</Label>
                        <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white">
                          Delete Account
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {tab === 'apikeys' && (
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Key className="mr-2 h-5 w-5" />
                        API Keys
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Manage your API keys
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-slate-300">Your API Key</Label>
                        <Input value="sk-xxxx-xxxx-xxxx" readOnly className="bg-slate-900/50 border-slate-600 text-white" />
                        <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                          Copy
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}