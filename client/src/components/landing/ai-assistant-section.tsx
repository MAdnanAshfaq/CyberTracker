import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Zap, 
  TrendingUp, 
  AlertTriangle,
  Send,
  Sparkles
} from "lucide-react";

export function AIAssistantSection() {
  const suggestions = [
    "Analyze IP 192.168.1.100 behavior patterns",
    "Show threat correlation for Campaign Alpha",
    "Generate security report for last 7 days",
    "Detect anomalies in recent click events"
  ];

  const capabilities = [
    {
      icon: TrendingUp,
      title: "Pattern Recognition",
      description: "Identifies unusual behavior patterns and potential threats"
    },
    {
      icon: AlertTriangle,
      title: "Anomaly Detection",
      description: "Automatically flags suspicious activities and locations"
    },
    {
      icon: Zap,
      title: "Instant Analysis",
      description: "Real-time threat assessment and risk scoring"
    },
    {
      icon: Sparkles,
      title: "Predictive Intelligence",
      description: "Forecasts potential security incidents and trends"
    }
  ];

  return (
    <section id="ai" className="py-20 bg-gradient-to-b from-slate-800/50 to-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6">
            <Bot className="h-4 w-4 text-purple-400 mr-2" />
            <span className="text-sm font-medium text-purple-300">AI-Powered Intelligence</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Meet TraceAI
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Your built-in AI analyst for link activity, location movement patterns, and anomaly detection. Get intelligent insights that help you stay one step ahead.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* AI Chat Interface */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
            
            <Card className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                {/* Chat Header */}
                <div className="border-b border-slate-700/50 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Bot className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">TraceAI</h3>
                        <p className="text-sm text-slate-400">Intelligence Assistant</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      Online
                    </Badge>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-6 space-y-4">
                  {/* AI Message */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-slate-700/50 rounded-xl p-4 max-w-md">
                      <p className="text-slate-200 text-sm">
                        I've analyzed your recent tracking data. There's been a 23% increase in suspicious activity from the EMEA region. Would you like me to generate a detailed report?
                      </p>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 max-w-md">
                      <p className="text-white text-sm">
                        Yes, please focus on IP patterns and geolocation clusters.
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-medium">U</span>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-slate-700/50 rounded-xl p-4 max-w-md">
                      <p className="text-slate-200 text-sm">
                        Generated comprehensive threat analysis. Key findings: 3 IP clusters in Frankfurt, unusual click patterns detected. Report ready for download.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="border-t border-slate-700/50 p-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-slate-700/50 rounded-xl p-3">
                      <p className="text-slate-400 text-sm">Ask TraceAI anything about your intelligence data...</p>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Quick Suggestions */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="px-3 py-1 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/50 rounded-full text-xs text-slate-300 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Capabilities */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Intelligent Analysis
              </h3>
              <p className="text-slate-300 mb-8">
                TraceAI processes millions of data points to provide you with actionable intelligence insights in natural language.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {capabilities.map((capability, index) => (
                <div key={index} className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                    <capability.icon className="h-6 w-6 text-purple-400" />
                  </div>
                  
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {capability.title}
                  </h4>
                  
                  <p className="text-slate-400 text-sm">
                    {capability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}