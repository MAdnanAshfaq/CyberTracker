import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { type ClickEvent } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/sidebar";
import { MapComponent } from "@/components/map-component";
import { useState, useRef } from "react";
import { 
  MapPin, 
  Globe, 
  Users, 
  Clock,
  Shield,
  AlertTriangle,
  MousePointer
} from "lucide-react";

export default function GeolocationPage() {
  const { user } = useAuth();
  const [focusedEvent, setFocusedEvent] = useState<ClickEvent | null>(null);
  const mapRef = useRef<any>(null);

  const { data: clickEvents, isLoading: clicksLoading } = useQuery<ClickEvent[]>({
    queryKey: ["/api/clicks"],
  });

  const recentEvents = clickEvents?.slice(0, 10) || [];
  const uniqueCountries = [...new Set(clickEvents?.map(e => e.country).filter(Boolean))];
  const uniqueCities = [...new Set(clickEvents?.map(e => e.city).filter(Boolean))];

  const handleEventClick = (event: ClickEvent) => {
    if (event.latitude && event.longitude) {
      setFocusedEvent(event);
      if (mapRef.current) {
        mapRef.current.focusOnLocation(event.latitude, event.longitude);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#0f172a] to-[#1e293b] text-slate-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Geolocation Intelligence</h2>
              <p className="text-slate-400">Monitor visitor locations and geographic patterns</p>
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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Locations</p>
                      <p className="text-2xl font-bold text-white">
                        {clicksLoading ? "..." : clickEvents?.length || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Countries</p>
                      <p className="text-2xl font-bold text-white">
                        {clicksLoading ? "..." : uniqueCountries.length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Globe className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Cities</p>
                      <p className="text-2xl font-bold text-white">
                        {clicksLoading ? "..." : uniqueCities.length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Risk Level</p>
                      <p className="text-2xl font-bold text-yellow-400">
                        {clicksLoading ? "..." : "Medium"}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-yellow-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Interactive Map */}
              <div className="lg:col-span-2">
                <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <MapPin className="mr-2 h-5 w-5" />
                      Global Activity Map
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Real-time visualization of visitor locations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MapComponent 
                      ref={mapRef}
                      clickEvents={clickEvents || []} 
                      focusedEvent={focusedEvent}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-1">
                <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Clock className="mr-2 h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Latest geolocation events
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
                    ) : recentEvents.length > 0 ? (
                      <div className="space-y-4">
                        {recentEvents.map((event) => (
                          <div
                            key={event.id}
                            onClick={() => handleEventClick(event)}
                            className={`bg-slate-900/50 rounded-lg p-3 border transition-all duration-200 cursor-pointer hover:bg-slate-800/70 hover:border-blue-500/50 ${
                              focusedEvent?.id === event.id ? 'border-blue-500 bg-slate-800/70' : 'border-slate-700/50'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <MousePointer className="h-4 w-4 text-blue-400" />
                                  <span className="text-sm font-medium text-white">
                                    {event.city || "Unknown City"}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">
                                  {event.country || "Unknown Country"}
                                </p>
                                <div className="mt-2 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500">IP:</span>
                                    <span className="text-xs text-slate-300 font-mono">
                                      {event.ipAddress || "Unknown"}
                                    </span>
                                  </div>
                                  {event.browser && (
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-slate-500">Browser:</span>
                                      <span className="text-xs text-slate-300">
                                        {event.browser}
                                      </span>
                                    </div>
                                  )}
                                  {event.os && (
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-slate-500">OS:</span>
                                      <span className="text-xs text-slate-300">
                                        {event.os}
                                      </span>
                                    </div>
                                  )}
                                  {event.isp && (
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-slate-500">ISP:</span>
                                      <span className="text-xs text-slate-300">
                                        {event.isp}
                                      </span>
                                    </div>
                                  )}
                                  {event.deviceModel && (
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-slate-500">Device:</span>
                                      <span className="text-xs text-slate-300">
                                        {event.deviceModel}
                                      </span>
                                    </div>
                                  )}
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500">Time:</span>
                                    <span className="text-xs text-slate-300">
                                      {event.timestamp ? new Date(event.timestamp).toLocaleString() : "Unknown"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-center space-y-2">
                                {event.latitude && event.longitude ? (
                                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                ) : (
                                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                )}
                                {focusedEvent?.id === event.id && (
                                  <div className="text-xs text-blue-400 font-medium">
                                    Focused
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <MapPin className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-slate-400 mb-2">No location data yet</p>
                        <p className="text-slate-500 text-sm">
                          Share tracking links to start collecting geolocation intelligence
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}