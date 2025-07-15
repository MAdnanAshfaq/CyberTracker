import { useEffect, useRef } from "react";
import { type ClickEvent } from "@shared/schema";

interface MapComponentProps {
  clickEvents: ClickEvent[];
}

declare global {
  interface Window {
    L: any;
  }
}

export function MapComponent({ clickEvents }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    // Wait for Leaflet to load
    const initMap = () => {
      if (!mapRef.current || !window.L) return;

      // Clean up existing map instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Initialize Leaflet map
      const map = window.L.map(mapRef.current, {
        center: [40.7128, -74.0060],
        zoom: 2,
        zoomControl: true,
        preferCanvas: true
      });

      // Add dark theme tiles
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    };

    if (window.L) {
      initMap();
    } else {
      // Wait for Leaflet to load
      const checkLeaflet = setInterval(() => {
        if (window.L) {
          clearInterval(checkLeaflet);
          initMap();
        }
      }, 100);

      // Clean up interval after 10 seconds
      setTimeout(() => clearInterval(checkLeaflet), 10000);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !window.L) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      if (marker.remove) {
        marker.remove();
      }
    });
    markersRef.current = [];

    // Add markers for click events with valid coordinates
    clickEvents.forEach((event) => {
      if (event.latitude && event.longitude) {
        // Create custom red marker
        const redIcon = window.L.divIcon({
          html: `
            <div style="
              width: 20px;
              height: 20px;
              background: #ef4444;
              border: 2px solid #ffffff;
              border-radius: 50%;
              position: relative;
              box-shadow: 0 0 10px rgba(239, 68, 68, 0.6);
            ">
              <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 8px;
                height: 8px;
                background: #ffffff;
                border-radius: 50%;
              "></div>
            </div>
          `,
          className: 'custom-marker',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        const marker = window.L.marker([event.latitude, event.longitude], {
          icon: redIcon
        }).addTo(mapInstanceRef.current);

        const popupContent = `
          <div style="color: #000; font-size: 12px; font-family: 'Inter', sans-serif; min-width: 220px;">
            <strong style="font-size: 14px;">${event.city || 'Unknown Location'}</strong><br>
            <hr style="margin: 6px 0; border: 0; border-top: 1px solid #e5e7eb;">
            <div style="margin: 4px 0;"><strong>IP:</strong> <code style="background: #f3f4f6; padding: 2px 4px; border-radius: 3px;">${event.ipAddress || 'Unknown'}</code></div>
            <div style="margin: 4px 0;"><strong>Location:</strong> ${event.country || 'Unknown'}</div>
            <div style="margin: 4px 0;"><strong>Coordinates:</strong> ${event.latitude.toFixed(4)}, ${event.longitude.toFixed(4)}</div>
            <div style="margin: 4px 0;"><strong>Browser:</strong> ${event.userAgent?.split(' ')[0] || 'Unknown'}</div>
            <div style="margin: 4px 0;"><strong>Time:</strong> ${event.timestamp ? new Date(event.timestamp).toLocaleString() : 'Unknown'}</div>
            <hr style="margin: 6px 0; border: 0; border-top: 1px solid #e5e7eb;">
            <button 
              onclick="window.open('https://www.google.com/maps?q=${event.latitude},${event.longitude}', '_blank')" 
              style="
                width: 100%; 
                background: #4285f4; 
                color: white; 
                border: none; 
                padding: 8px 12px; 
                border-radius: 4px; 
                cursor: pointer; 
                font-size: 12px;
                margin-top: 4px;
              "
            >
              🗺️ Open in Google Maps
            </button>
          </div>
        `;

        marker.bindPopup(popupContent, {
          maxWidth: 300,
          className: 'custom-popup'
        });

        markersRef.current.push(marker);
      }
    });

    // Auto-fit map to show all markers
    if (markersRef.current.length > 0) {
      const group = new window.L.featureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));

      // Prevent over-zooming for single markers
      if (markersRef.current.length === 1) {
        mapInstanceRef.current.setZoom(Math.min(mapInstanceRef.current.getZoom(), 15));
      }
    }
  }, [clickEvents]);

  if (!clickEvents || clickEvents.length === 0) {
    return (
      <div className="w-full h-80 bg-slate-900/50 rounded-lg border border-slate-600 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-slate-400 text-sm">No click events to display</p>
          <p className="text-slate-500 text-xs mt-1">Create a tracking link and share it to see visitor locations</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-80 bg-slate-900 rounded-lg border border-slate-600"
    />
  );
}

MapComponent.displayName = 'MapComponent';