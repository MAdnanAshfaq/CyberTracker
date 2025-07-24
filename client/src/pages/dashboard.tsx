import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertShortlinkSchema, type InsertShortlink, type Shortlink, type ClickEvent } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/sidebar";
import { MapComponent } from "@/components/map-component";
import {
  Shield,
  Plus,
  Link,
  Target,
  MousePointer,
  AlertTriangle,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Copy,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Chatbot } from "@/components/chatbot"; // Added Chatbot import
import { ContactForm } from "@/components/contact-form"; // Added ContactForm import
import { useState } from "react";

const createLinkSchema = insertShortlinkSchema.omit({ userId: true, slug: true });

type CreateLinkData = z.infer<typeof createLinkSchema>;

interface Stats {
  totalLinks: number;
  activeLinks: number;
  totalClicks: number;
  threatScore: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<CreateLinkData>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      targetUrl: "",
      campaignName: "",
      description: "",
      isActive: true,
    },
  });

  const { data: stats, isLoading: statsLoading } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  const { data: shortlinks, isLoading: shortlinksLoading } = useQuery<Shortlink[]>({
    queryKey: ["/api/shortlinks"],
  });

  const { data: clickEvents, isLoading: clicksLoading } = useQuery<ClickEvent[]>({
    queryKey: ["/api/clicks"],
    refetchInterval: 3000, // Refetch every 3 seconds for live updates
  });

  const createLinkMutation = useMutation({
    mutationFn: async (data: CreateLinkData) => {
      const res = await apiRequest("POST", "/api/shortlinks", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/shortlinks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      form.reset();
      toast({
        title: "Tracking link created",
        description: "Your secure tracking link has been generated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create link",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The tracking link has been copied to your clipboard.",
    });
  };

  const handleSubmit = (data: CreateLinkData) => {
    createLinkMutation.mutate(data);
  };

  const deleteClickEvent = async (id: number) => {
    await apiRequest("DELETE", `/api/clicks/${id}`);
    queryClient.invalidateQueries({ queryKey: ["/api/clicks"] });
  };

  const recentEvents = clickEvents?.slice(0, 5) || [];
  const [expandedEventId, setExpandedEventId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#0f172a] to-[#1e293b] text-slate-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Intelligence Dashboard</h2>
              <p className="text-slate-400">Monitor and analyze tracking intelligence</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                <Plus className="mr-2 h-4 w-4" />
                Create Link
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Links</p>
                    <p className="text-2xl font-bold text-white">
                      {statsLoading ? "..." : stats?.totalLinks || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Link className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-green-400">+12.5%</span>
                  <span className="text-slate-400 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Active Traces</p>
                    <p className="text-2xl font-bold text-white">
                      {statsLoading ? "..." : stats?.activeLinks || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-green-400">+8.2%</span>
                  <span className="text-slate-400 ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Click Events</p>
                    <p className="text-2xl font-bold text-white">
                      {statsLoading ? "..." : stats?.totalClicks || 0}
                    </p>
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

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Threat Score</p>
                    <p className="text-2xl font-bold text-red-400">
                      {statsLoading ? "..." : stats?.threatScore || "Low"}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-cyber-red/20 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-cyber-red" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-cyber-green mr-1" />
                  <span className="text-cyber-green">-5.3%</span>
                  <span className="text-slate-400 ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create Link Form */}
            <div className="lg:col-span-1">
              <Card className="bg-cyber-gray border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Plus className="mr-2 h-5 w-5 text-cyber-blue" />
                    Create Tracking Link
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="targetUrl" className="text-slate-300">
                        Target URL
                      </Label>
                      <Input
                        id="targetUrl"
                        type="url"
                        placeholder="https://example.com"
                        className="bg-cyber-dark border-slate-600 text-white placeholder-slate-400"
                        {...form.register("targetUrl")}
                      />
                      {form.formState.errors.targetUrl && (
                        <p className="text-red-400 text-sm">
                          {form.formState.errors.targetUrl.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="campaignName" className="text-slate-300">
                        Campaign Name
                      </Label>
                      <Input
                        id="campaignName"
                        placeholder="Investigation Alpha"
                        className="bg-cyber-dark border-slate-600 text-white placeholder-slate-400"
                        {...form.register("campaignName")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-slate-300">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Suspicious actor investigation..."
                        rows={3}
                        className="bg-cyber-dark border-slate-600 text-white placeholder-slate-400"
                        {...form.register("description")}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-cyber-blue hover:bg-blue-600"
                      disabled={createLinkMutation.isPending}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Generate Secure Link
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-cyber-gray border-slate-700 mt-6">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="mr-2 h-5 w-5 text-cyber-green" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {clicksLoading ? (
                      <div className="text-slate-400">Loading...</div>
                    ) : recentEvents.length === 0 ? (
                      <div className="text-slate-400">No recent activity</div>
                    ) : (
                      recentEvents.map((event) => {
                        const hasCoords = !!(event.latitude && event.longitude);
                        const dotColor = hasCoords ? "bg-cyber-green" : "bg-yellow-400";
                        const isExpanded = expandedEventId === event.id;
                        return (
                          <div
                            key={event.id}
                            className={`flex flex-col p-3 bg-cyber-dark rounded-lg cursor-pointer transition-all duration-200 ${isExpanded ? 'ring-2 ring-cyber-blue' : ''}`}
                            onClick={() => setExpandedEventId(isExpanded ? null : event.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
                              <div className="flex-1">
                                <p className="text-sm text-white">
                                  {event.city && event.city !== 'Unknown' ? event.city : 'Unknown City'}
                                  <span className="text-xs text-slate-400 ml-2">{event.country && event.country !== 'Unknown' ? event.country : ''}</span>
                                </p>
                              </div>
                              <span className="text-xs text-slate-400">{event.timestamp ? new Date(event.timestamp).toLocaleString() : "Unknown time"}</span>
                            </div>
                            {isExpanded && (
                              <div className="mt-2 text-xs text-slate-300 space-y-1">
                                <div><strong>IP:</strong> {event.ipAddress || 'Unknown'}</div>
                                <div><strong>Browser:</strong> {event.browser || 'Unknown'}</div>
                                <div><strong>OS:</strong> {event.os || 'Unknown'}</div>
                                <div><strong>Device:</strong> {event.deviceModel || 'Unknown'} ({event.deviceType || 'Unknown'})</div>
                                <div><strong>Coordinates:</strong> {hasCoords ? `${event.latitude}, ${event.longitude}` : 'Unknown'}</div>
                                <div><strong>Screen:</strong> {event.screenResolution || 'Unknown'}</div>
                                <div><strong>Language:</strong> {event.language || 'Unknown'}</div>
                                <div><strong>ISP:</strong> {event.isp || 'Unknown'}</div>
                                <div><strong>Timezone:</strong> {event.timezone || 'Unknown'}</div>
                                <div><strong>User Agent:</strong> {event.userAgent || 'Unknown'}</div>
                              </div>
                            )}
                            <button
                              className="ml-auto mt-2 text-red-500 hover:text-red-700 w-fit"
                              title="Delete this record"
                              onClick={e => { e.stopPropagation(); deleteClickEvent(event.id); }}
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map and Analytics */}
            <div className="lg:col-span-2 space-y-6">
              {/* Interactive Map */}
              <Card className="bg-cyber-gray border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="mr-2 h-5 w-5 text-cyber-blue" />
                      Geolocation Intelligence
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-400">Live tracking:</span>
                      <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MapComponent clickEvents={clickEvents || []} />
                </CardContent>
              </Card>

              {/* Active Links Table */}
              <Card className="bg-cyber-gray border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Link className="mr-2 h-5 w-5 text-cyber-amber" />
                    Active Tracking Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-600">
                          <th className="text-left py-3 text-sm font-medium text-slate-300">Campaign</th>
                          <th className="text-left py-3 text-sm font-medium text-slate-300">Short Link</th>
                          <th className="text-left py-3 text-sm font-medium text-slate-300">Clicks</th>
                          <th className="text-left py-3 text-sm font-medium text-slate-300">Status</th>
                          <th className="text-left py-3 text-sm font-medium text-slate-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {shortlinksLoading ? (
                          <tr>
                            <td colSpan={5} className="py-4 text-center text-slate-400">
                              Loading...
                            </td>
                          </tr>
                        ) : !shortlinks || shortlinks.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="py-4 text-center text-slate-400">
                              No tracking links created yet
                            </td>
                          </tr>
                        ) : (
                          shortlinks.map((link) => {
                            const clickCount = clickEvents?.filter(c => c.shortlinkId === link.id).length || 0;
                            const shortUrl = `${window.location.origin}/s/${link.slug}`;

                            return (
                              <tr key={link.id} className="border-b border-slate-700 hover:bg-cyber-dark/50">
                                <td className="py-4 text-white">
                                  {link.campaignName || "Unnamed Campaign"}
                                </td>
                                <td className="py-4">
                                  <code className="text-cyber-blue bg-cyber-dark px-2 py-1 rounded">
                                    {shortUrl}
                                  </code>
                                </td>
                                <td className="py-4">
                                  <span className="bg-cyber-green/20 text-cyber-green px-2 py-1 rounded-full text-xs">
                                    {clickCount}
                                  </span>
                                </td>
                                <td className="py-4">
                                  <span className={link.isActive ? "bg-cyber-green/20 text-cyber-green px-2 py-1 rounded-full text-xs" : "bg-slate-500/20 text-slate-400 px-2 py-1 rounded-full text-xs"}>
                                    {link.isActive ? "Active" : "Inactive"}
                                  </span>
                                </td>
                                <td className="py-4">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-cyber-blue hover:text-blue-400"
                                    onClick={() => copyToClipboard(shortUrl)}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-cyber-red hover:text-red-400"
                                    onClick={() => window.open(link.targetUrl, '_blank')}
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}