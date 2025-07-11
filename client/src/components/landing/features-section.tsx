import { 
  Target, 
  MapPin, 
  Shield, 
  Zap, 
  Eye, 
  Lock,
  Globe,
  Activity,
  Database
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Target,
      title: "Intelligence at Your Fingertips",
      description: "Access precise device metadata, browser fingerprints, and behavioral patterns instantly. Get comprehensive threat intelligence in real-time.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: MapPin,
      title: "Real-time Geolocation",
      description: "GPS-level tracking accuracy when users permit location access. Visualize threat patterns and movement across interactive global maps.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Shield,
      title: "Legal + Ethical",
      description: "Operate within licensed boundaries with full user consent. Built-in compliance features ensure ethical intelligence gathering.",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const additionalFeatures = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-second response times for critical threat intelligence"
    },
    {
      icon: Eye,
      title: "Deep Visibility",
      description: "Comprehensive device and network fingerprinting"
    },
    {
      icon: Lock,
      title: "Secure by Design",
      description: "End-to-end encryption and zero-trust architecture"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Worldwide threat intelligence and IP geolocation"
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Live threat detection and instant alert systems"
    },
    {
      icon: Database,
      title: "Advanced Analytics",
      description: "Machine learning powered threat pattern recognition"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-slate-900/50 to-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Everything you need to stay ahead
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive threat intelligence tools designed for modern security professionals
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300`}></div>
              
              {/* Card */}
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 h-full transition-all duration-300 group-hover:border-slate-600">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => (
            <div key={index} className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/50 transition-colors duration-300">
              <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-slate-300" />
              </div>
              
              <h4 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h4>
              
              <p className="text-slate-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}