import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117]/80 backdrop-blur-lg border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="ChatGPT Image Jul 24, 2025, 04_15_44 PM.png" alt="Tracentel Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold text-white">TRACENTEL</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#integrations" className="text-slate-300 hover:text-white transition-colors">
              Integrations
            </a>
            <a href="#ai" className="text-slate-300 hover:text-white transition-colors">
              AI Assistant
            </a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">
              Pricing
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-slate-300 hover:text-white hover:bg-slate-800"
              onClick={() => window.location.href = '/auth'}
            >
              Sign In
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              onClick={() => window.location.href = '/auth'}
            >
              Join Beta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800/50">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#integrations" className="text-slate-300 hover:text-white transition-colors">
                Integrations
              </a>
              <a href="#ai" className="text-slate-300 hover:text-white transition-colors">
                AI Assistant
              </a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">
                Pricing
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button 
                  variant="ghost" 
                  className="text-slate-300 hover:text-white hover:bg-slate-800 justify-start"
                  onClick={() => window.location.href = '/auth'}
                >
                  Sign In
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white justify-start"
                  onClick={() => window.location.href = '/auth'}
                >
                  Join Beta
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}