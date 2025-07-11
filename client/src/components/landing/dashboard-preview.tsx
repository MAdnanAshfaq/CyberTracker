import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  MapPin, 
  Target, 
  TrendingUp, 
  MousePointer,
  Shield,
  AlertTriangle,
  Link
} from "lucide-react";

export function DashboardPreview() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Intelligence at your fingertips
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Get comprehensive threat intelligence with real-time tracking, geolocation mapping, and advanced analytics—all in one powerful dashboard.
          </p>
        </div>

        {/* Dashboard Mock */}
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
          
          {/* Main Dashboard Container */}
          <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
            {/* Dashboard Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white">Intelligence Dashboard</h3>
                <p className="text-slate-400">Real-time threat monitoring</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-300">Live</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Active Traces</p>
                      <p className="text-2xl font-bold text-white">2,847</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Target className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400">+12.5%</span>
                    <span className="text-slate-400 ml-1">from last week</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Click Events</p>
                      <p className="text-2xl font-bold text-white">15,392</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <MousePointer className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400">+23.1%</span>
                    <span className="text-slate-400 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Threat Score</p>
                      <p className="text-2xl font-bold text-red-400">High</p>
                    </div>
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-red-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400">-5.3%</span>
                    <span className="text-slate-400 ml-1">from last week</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Links</p>
                      <p className="text-2xl font-bold text-white">1,247</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Link className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400">+8.2%</span>
                    <span className="text-slate-400 ml-1">from last week</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Chart Area */}
              <div className="lg:col-span-2">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-lg font-semibold text-white">Geolocation Intelligence</h4>
                      <Badge variant="outline" className="text-blue-400 border-blue-400">
                        Live Tracking
                      </Badge>
                    </div>
                    {/* Map Placeholder */}
                    <div className="h-64 bg-slate-900/50 rounded-lg border border-slate-600 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-slate-600 mx-auto mb-2" />
                        <p className="text-slate-400">Interactive Map View</p>
                        <p className="text-sm text-slate-500">Real-time threat locations</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Feed */}
              <div className="lg:col-span-1">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-white mb-6">Recent Activity</h4>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex items-center space-x-3 p-3 bg-slate-900/50 rounded-lg">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm text-white">
                              Link clicked from IP: 
                              <span className="font-mono text-blue-400 ml-1">
                                192.168.1.{100 + item}
                              </span>
                            </p>
                            <p className="text-xs text-slate-400">
                              {item} minutes ago
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}