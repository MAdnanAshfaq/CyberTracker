import { 
  MessageSquare, 
  Mail, 
  Database, 
  Shield, 
  Webhook,
  Github,
  Slack,
  Chrome
} from "lucide-react";

export function IntegrationsSection() {
  const integrations = [
    {
      icon: MessageSquare,
      name: "Discord",
      description: "Real-time threat alerts",
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: Slack,
      name: "Slack",
      description: "Team collaboration",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: Mail,
      name: "Email",
      description: "Automated reports",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Database,
      name: "Notion",
      description: "Intelligence docs",
      color: "from-gray-500 to-gray-700"
    },
    {
      icon: Shield,
      name: "Stripe",
      description: "Fraud prevention",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Github,
      name: "GitHub",
      description: "Security workflows",
      color: "from-gray-600 to-gray-800"
    },
    {
      icon: Webhook,
      name: "Webhooks",
      description: "Custom integrations",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Chrome,
      name: "Browser",
      description: "Extension support",
      color: "from-blue-400 to-blue-600"
    }
  ];

  return (
    <section id="integrations" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Connect with your stack
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Seamlessly integrate TraceIntel with your existing security tools and workflows
          </p>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${integration.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${integration.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <integration.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">
                  {integration.name}
                </h3>
                
                <p className="text-slate-400 text-sm">
                  {integration.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 mb-6">
            <span className="text-sm font-medium text-yellow-300">Coming Soon</span>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-4">
            Enterprise Integrations
          </h3>
          
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            SIEM integration, custom APIs, and enterprise-grade security tools integration coming in Q2 2024
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {['Splunk', 'Microsoft Sentinel', 'Elastic', 'Datadog', 'AWS Security Hub'].map((tool) => (
              <div
                key={tool}
                className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 text-sm"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}