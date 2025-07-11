import { useEffect, useRef } from "react";
import { type ClickEvent } from "@shared/schema";

interface MapComponentProps {
  clickEvents: ClickEvent[];
}

export function MapComponent({ clickEvents }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = (window as any).L.map(mapRef.current, {
      center: [40.7128, -74.0060],
      zoom: 2,
      zoomControl: true,
    });

    // Dark theme tiles
    (window as any).L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors © CARTO',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    mapInstanceRef.current.eachLayer((layer: any) => {
      if (layer instanceof (window as any).L.Marker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    // Add markers for click events with valid coordinates
    clickEvents.forEach((event) => {
      if (event.latitude && event.longitude) {
        const marker = (window as any).L.marker([event.latitude, event.longitude])
          .addTo(mapInstanceRef.current);
        
        marker.bindPopup(`
          <div style="color: #000; font-size: 12px;">
            <strong>${event.city || 'Unknown Location'}</strong><br>
            IP: <code>${event.ipAddress || 'Unknown'}</code><br>
            Coords: ${event.latitude.toFixed(4)}, ${event.longitude.toFixed(4)}<br>
            Time: ${event.timestamp ? new Date(event.timestamp).toLocaleString() : 'Unknown'}
          </div>
        `);
      }
    });
  }, [clickEvents]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-80 bg-cyber-dark rounded-lg border border-slate-600"
    />
  );
}
