import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Zap } from "lucide-react";

export function CTASection() {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Security Professionals"
    },
    {
      icon: Shield,
      value: "99.9%",
      label: "Uptime SLA"
    },
    {
      icon: Zap,
      value: "<100ms",
      label: "Response Time"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main CTA */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Ready to trace smarter?
            </h2>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
              Join thousands of security professionals who trust TraceIntel to stay ahead of threats. Get started with our free beta today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                onClick={() => window.location.href = '/auth'}
              >
                Join the Beta
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white text-lg px-8 py-6 rounded-xl"
                onClick={() => window.location.href = '/auth'}
              >
                Schedule Demo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-slate-300" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="border-t border-slate-800 pt-16">
            <p className="text-slate-400 mb-6">Trusted by leading security teams worldwide</p>
            
            <div className="flex justify-center items-center space-x-8 opacity-40">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="w-20 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-slate-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}