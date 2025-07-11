import { useLocation } from "wouter";
import { useEffect } from "react";

export default function TrackingPage() {
  const [location] = useLocation();
  const slug = location.split("/s/")[1];

  useEffect(() => {
    // This page should not be rendered by React
    // The server handles the /s/:slug route directly
    // Redirect to home if somehow this component is rendered
    window.location.href = "/";
  }, []);

  return (
    <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white mb-2">Redirecting...</h2>
        <p className="text-slate-400">Please wait while we redirect you...</p>
      </div>
    </div>
  );
}
