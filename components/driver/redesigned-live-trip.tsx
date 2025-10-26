import { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { AlertTriangle, Camera, Users, Square, ChevronUp, ChevronDown, X } from 'lucide-react';

interface Stop {
  id: string;
  name: string;
  students: number;
  position: [number, number];
  status: 'current' | 'next' | 'upcoming' | 'skipped';
  reason?: string;
}

interface RedesignedLiveTripProps {
  onScanQR: () => void;
  onSendDelay: () => void;
  onOpenPassengerList: () => void;
  onEndTrip: () => void;
}

const stops: Stop[] = [
  {
    id: '1',
    name: 'Karkhano Market',
    students: 3,
    position: [34.0151, 71.5782],
    status: 'current',
  },
  {
    id: '2',
    name: 'Phase 3 Chowk',
    students: 1,
    position: [34.0181, 71.5812],
    status: 'skipped',
    reason: 'Maria - Marked Absent',
  },
  {
    id: '3',
    name: 'University Town',
    students: 5,
    position: [34.0211, 71.5842],
    status: 'next',
  },
  {
    id: '4',
    name: 'Tehkal Bala',
    students: 2,
    position: [34.0241, 71.5872],
    status: 'upcoming',
  },
  {
    id: '5',
    name: 'Abdara Road',
    students: 4,
    position: [34.0271, 71.5902],
    status: 'upcoming',
  },
  {
    id: '6',
    name: 'CUST Campus',
    students: 0,
    position: [34.0301, 71.5932],
    status: 'upcoming',
  },
];

export function RedesignedLiveTrip({
  onScanQR,
  onSendDelay,
  onOpenPassengerList,
  onEndTrip,
}: RedesignedLiveTripProps) {
  const [isStopsExpanded, setIsStopsExpanded] = useState(false);
  const [showReroutingToast, setShowReroutingToast] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const routePolylineRef = useRef<any>(null);

  // Initialize Leaflet and create map
  useEffect(() => {
    let leafletLoaded = false;
    let linkElement: HTMLLinkElement | null = null;
    let scriptElement: HTMLScriptElement | null = null;

    const initMap = () => {
      // @ts-ignore
      const L = window.L;
      if (!L || !mapContainerRef.current || mapRef.current) return;

      try {
        // Create map instance
        const map = L.map(mapContainerRef.current, {
          center: [34.0151, 71.5782],
          zoom: 13,
          zoomControl: false,
        });

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(map);

        mapRef.current = map;
        setIsMapReady(true);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    // Check if Leaflet is already loaded
    // @ts-ignore
    if (window.L) {
      leafletLoaded = true;
      setTimeout(initMap, 100);
    } else {
      // Load Leaflet CSS
      linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      linkElement.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      linkElement.crossOrigin = '';
      document.head.appendChild(linkElement);

      // Load Leaflet JS
      scriptElement = document.createElement('script');
      scriptElement.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      scriptElement.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      scriptElement.crossOrigin = '';
      scriptElement.onload = () => {
        leafletLoaded = true;
        setTimeout(initMap, 100);
      };
      document.head.appendChild(scriptElement);
    }

    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove();
          mapRef.current = null;
        } catch (error) {
          console.error('Error cleaning up map:', error);
        }
      }
    };
  }, []);

  // Add markers and route when map is ready
  useEffect(() => {
    if (!isMapReady || !mapRef.current) return;

    try {
      // @ts-ignore
      const L = window.L;
      if (!L) return;

      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Clear existing route
      if (routePolylineRef.current) {
        routePolylineRef.current.remove();
        routePolylineRef.current = null;
      }

      // Add route line (skip skipped stops)
      const routePositions = stops
        .filter(stop => stop.status !== 'skipped')
        .map(stop => stop.position);

      if (routePositions.length > 0) {
        const polyline = L.polyline(routePositions, {
          color: '#16A34A',
          weight: 4,
          opacity: 0.7,
        }).addTo(mapRef.current);
        routePolylineRef.current = polyline;
      }

      // Add markers for non-skipped stops
      stops
        .filter(stop => stop.status !== 'skipped')
        .forEach((stop) => {
          // Custom icon based on status
          let iconColor = '#3B82F6'; // blue for upcoming
          if (stop.status === 'current') iconColor = '#16A34A'; // green
          if (stop.status === 'next') iconColor = '#2563EB'; // darker blue

          const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${iconColor}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          });

          const marker = L.marker(stop.position, { icon: customIcon })
            .addTo(mapRef.current)
            .bindPopup(`
              <div style="text-align: center; padding: 4px;">
                <p style="font-weight: 500; margin: 0 0 4px 0;">${stop.name}</p>
                <p style="font-size: 14px; color: #666; margin: 0;">${stop.students} students</p>
              </div>
            `);

          markersRef.current.push(marker);
        });

      // Fit bounds to show all markers
      if (routePositions.length > 0) {
        const bounds = L.latLngBounds(routePositions);
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    } catch (error) {
      console.error('Error adding markers:', error);
    }
  }, [isMapReady]);

  // Simulate AI rerouting notification
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowReroutingToast(true);
      // Auto-hide after 5 seconds
      setTimeout(() => {
        setShowReroutingToast(false);
      }, 5000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const visibleStops = isStopsExpanded ? stops : stops.slice(0, 2);

  return (
    <div className="h-screen w-full relative">
      {/* Map - 90% of screen */}
      <div className="absolute inset-0">
        <div 
          ref={mapContainerRef} 
          className="h-full w-full"
        />
        
        {/* Loading indicator */}
        {!isMapReady && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      {/* AI Rerouting Toast - Small, Non-blocking */}
      {showReroutingToast && (
        <div className="absolute top-4 left-0 right-0 flex justify-center z-[1000] px-4 animate-in fade-in slide-in-from-top-4">
          <div className="bg-black/90 text-white px-4 py-3 rounded-full shadow-lg max-w-md flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            <p className="text-sm">Heavy traffic detected. Rerouting to save 8 minutes.</p>
            <button
              onClick={() => setShowReroutingToast(false)}
              className="text-white/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Upcoming Stops List - Pull-up Card at Bottom */}
      <div className="absolute bottom-20 left-0 right-0 z-[1000]">
        <div className="px-4">
          <Card className="shadow-2xl border-2 border-gray-200 overflow-hidden">
            {/* Swipe Handle */}
            <button
              onClick={() => setIsStopsExpanded(!isStopsExpanded)}
              className="w-full py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isStopsExpanded ? (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span className="text-xs">Swipe down to close</span>
                </>
              ) : (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span className="text-xs">Swipe up for all stops</span>
                </>
              )}
            </button>

            {/* Stops List */}
            <div className={`overflow-auto ${isStopsExpanded ? 'max-h-64' : 'max-h-32'}`}>
              {visibleStops.map((stop) => (
                <div
                  key={stop.id}
                  className={`p-3 border-b border-gray-100 last:border-b-0 ${
                    stop.status === 'current'
                      ? 'bg-green-50'
                      : stop.status === 'skipped'
                      ? 'bg-gray-100'
                      : 'bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {stop.status === 'current' && (
                          <Badge className="bg-green-600 text-xs">CURRENT</Badge>
                        )}
                        {stop.status === 'next' && (
                          <Badge className="bg-blue-600 text-xs">NEXT</Badge>
                        )}
                        {stop.status === 'skipped' && (
                          <Badge className="bg-gray-600 text-xs">SKIPPED</Badge>
                        )}
                        {stop.status === 'upcoming' && (
                          <Badge variant="outline" className="text-xs">
                            STOP {stops.indexOf(stop) + 1}
                          </Badge>
                        )}
                      </div>
                      <p className={`font-medium ${
                        stop.status === 'skipped' ? 'text-gray-500 line-through' : 'text-gray-900'
                      }`}>
                        {stop.name}
                      </p>
                      {stop.status === 'skipped' ? (
                        <p className="text-xs text-gray-500 italic mt-1">{stop.reason}</p>
                      ) : (
                        <p className="text-sm text-gray-600">{stop.students} Students</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {!isStopsExpanded && stops.length > 2 && (
                <div className="p-2 text-center bg-gray-50 text-xs text-gray-500">
                  +{stops.length - 2} more stops
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions Bar - Bottom - Clean iOS Style */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 z-[1001]">
        <div className="flex items-center justify-around h-20 px-4">
          {/* Send Delay */}
          <button
            onClick={onSendDelay}
            className="flex flex-col items-center justify-center gap-1.5 text-gray-700 hover:text-gray-900 active:scale-95 transition-all p-2"
          >
            <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-xs text-gray-600">Delay</span>
          </button>

          {/* Scan QR */}
          <button
            onClick={onScanQR}
            className="flex flex-col items-center justify-center gap-1.5 text-gray-700 hover:text-gray-900 active:scale-95 transition-all p-2"
          >
            <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <span className="text-xs text-gray-600">Scan QR</span>
          </button>

          {/* Passengers */}
          <button
            onClick={onOpenPassengerList}
            className="flex flex-col items-center justify-center gap-1.5 text-gray-700 hover:text-gray-900 active:scale-95 transition-all p-2"
          >
            <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs text-gray-600">List</span>
          </button>

          {/* End Trip */}
          <button
            onClick={onEndTrip}
            className="flex flex-col items-center justify-center gap-1.5 text-gray-700 hover:text-gray-900 active:scale-95 transition-all p-2"
          >
            <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
              <Square className="w-5 h-5 fill-current" />
            </div>
            <span className="text-xs text-gray-600">End Trip</span>
          </button>
        </div>
      </div>
    </div>
  );
}