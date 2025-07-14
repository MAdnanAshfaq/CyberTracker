import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { type ClickEvent, type Shortlink } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/sidebar";
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Activity,
  Globe,
  Clock,
  Users,
  MousePointer
} from "lucide-react";

interface Stats {
  totalLinks: number;
  activeLinks: number;
  totalClicks: number;
  threatScore: string;
}

export default function AnalyticsPage() {
  const { user } = useAuth();

  const { data: stats, isLoading: statsLoading } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  const { data: shortlinks, isLoading: shortlinksLoading } = useQuery<Shortlink[]>({
    queryKey: ["/api/shortlinks"],
  });

  const { data: clickEvents, isLoading: clicksLoading } = useQuery<ClickEvent[]>({
    queryKey: ["/api/clicks"],
  });

  // Analytics calculations
  const topCountries = clickEvents?.reduce((acc, event) => {
    if (event.country) {
      acc[event.country] = (acc[event.country] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topBrowsers = clickEvents?.reduce((acc, event) => {
    if (event.userAgent) {
      const browser = event.userAgent.split(' ')[0] || 'Unknown';
      acc[browser] = (acc[browser] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const recentClicks = clickEvents?.slice(0, 24) || [];
  const clicksToday = recentClicks.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.timestamp || '');
    return eventDate.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#0f172a] to-[#1e293b] text-slate-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
              <p className="text-slate-400">Comprehensive intelligence analysis and insights</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300">Live</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Clicks</p>
                      <p className="text-2xl font-bold text-white">
                        {statsLoading ? "..." : stats?.totalClicks || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <MousePointer className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400">+{clicksToday}</span>
                    <span className="text-slate-400 ml-1">today</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Active Links</p>
                      <p className="text-2xl font-bold text-white">
                        {statsLoading ? "..." : stats?.activeLinks || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Activity className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-slate-400">
                      {statsLoading ? "..." : stats?.totalLinks || 0} total
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Countries</p>
                      <p className="text-2xl font-bold text-white">
                        {clicksLoading ? "..." : Object.keys(topCountries || {}).length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Globe className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-slate-400">Global reach</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Threat Level</p>
                      <p className="text-2xl font-bold text-yellow-400">
                        {statsLoading ? "..." : stats?.threatScore || "Low"}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-yellow-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-slate-400">Risk assessment</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Countries */}
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Globe className="mr-2 h-5 w-5" />
                    Top Countries
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Most active visitor locations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {clicksLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : topCountries && Object.keys(topCountries).length > 0 ? (
                    <div className="space-y-4">
                      {Object.entries(topCountries)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 5)
                        .map(([country, count]) => (
                          <div key={country} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <span className="text-white">{country}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 h-2 bg-slate-700 rounded-full">
                                <div 
                                  className="h-2 bg-blue-400 rounded-full"
                                  style={{ width: `${(count / Math.max(...Object.values(topCountries))) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-slate-400 text-sm w-8 text-right">{count}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Globe className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-400">No country data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Browser Analysis */}
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Browser Analysis
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Visitor browser distribution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {clicksLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : topBrowsers && Object.keys(topBrowsers).length > 0 ? (
                    <div className="space-y-4">
                      {Object.entries(topBrowsers)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 5)
                        .map(([browser, count]) => (
                          <div key={browser} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              <span className="text-white">{browser}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 h-2 bg-slate-700 rounded-full">
                                <div 
                                  className="h-2 bg-green-400 rounded-full"
                                  style={{ width: `${(count / Math.max(...Object.values(topBrowsers))) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-slate-400 text-sm w-8 text-right">{count}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-400">No browser data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Latest click events and tracking data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {clicksLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : recentClicks.length > 0 ? (
                    <div className="space-y-4">
                      {recentClicks.map((event) => (
                        <div
                          key={event.id}
                          className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-blue-400" />
                              </div>
                              <div>
                                <p className="text-white font-medium">
                                  {event.city || "Unknown Location"}
                                </p>
                                <p className="text-sm text-slate-400">
                                  {event.country || "Unknown Country"} • {event.ipAddress || "Unknown IP"}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-slate-400">
                                {event.timestamp ? new Date(event.timestamp).toLocaleString() : "Unknown time"}
                              </p>
                              <p className="text-xs text-slate-500">
                                {event.userAgent?.split(' ')[0] || "Unknown browser"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Activity className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-slate-400 mb-2">No activity data yet</p>
                      <p className="text-slate-500 text-sm">
                        Start creating tracking links to see analytics
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}