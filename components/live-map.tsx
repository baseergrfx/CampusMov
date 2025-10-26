import { useEffect, useRef, useState } from 'react';
import { Navigation } from 'lucide-react';

interface BusLocation {
  id: string;
  lat: number;
  lng: number;
  label: string;
  status?: 'on-time' | 'delayed' | 'alert' | 'complete';
}

interface LiveMapProps {
  busLocation?: { lat: number; lng: number };
  userLocation: { lat: number; lng: number };
  route?: Array<{ lat: number; lng: number }>;
  buses?: BusLocation[];  // For admin multi-bus view
  showUserMarker?: boolean;  // Optional: hide user marker for driver view
  zoom?: number;
  className?: string;  // Optional: custom styling
}

export function LiveMap({ 
  busLocation, 
  userLocation, 
  route, 
  buses,
  showUserMarker = true,
  zoom = 13,
  className = ''
}: LiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const busMarkerRef = useRef<any>(null);
  const busMarkersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const routePolylineRef = useRef<any>(null);
  const universityMarkerRef = useRef<any>(null);

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
          center: [userLocation.lat, userLocation.lng],
          zoom: zoom,
          zoomControl: true,
          attributionControl: false,
        });

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map);

        mapRef.current = map;

        // Wait for map to be fully loaded
        setTimeout(() => {
          if (map) {
            map.invalidateSize();
            setIsMapReady(true);
          }
        }, 100);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    const loadLeaflet = () => {
      // @ts-ignore
      if (window.L) {
        initMap();
        return;
      }

      // Add Leaflet CSS
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
      scriptElement.async = true;

      scriptElement.onload = () => {
        leafletLoaded = true;
        initMap();
      };

      document.head.appendChild(scriptElement);
    };

    loadLeaflet();

    // Cleanup
    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove();
          mapRef.current = null;
        } catch (error) {
          console.error('Error removing map:', error);
        }
      }
      setIsMapReady(false);
    };
  }, []); // Only run once on mount

  // Add/update single bus marker (student view)
  useEffect(() => {
    if (!isMapReady || !mapRef.current || !busLocation) return;

    // @ts-ignore
    const L = window.L;
    if (!L) return;

    try {
      const busIconHTML = `
        <div style="position: relative;">
          <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4); border: 3px solid white;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <rect x="3" y="6" width="18" height="11" rx="2"/>
              <path d="M3 12h18"/>
              <circle cx="8" cy="19" r="2"/>
              <circle cx="16" cy="19" r="2"/>
            </svg>
          </div>
          <div style="position: absolute; top: -32px; left: 50%; transform: translateX(-50%); background: white; padding: 4px 8px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); white-space: nowrap; font-size: 11px; font-weight: 600; color: #1f2937;">
            Bus #42
          </div>
        </div>
      `;

      if (busMarkerRef.current) {
        // Update existing marker - check if it's still on the map
        try {
          if (mapRef.current && busMarkerRef.current._map) {
            busMarkerRef.current.setLatLng([busLocation.lat, busLocation.lng]);
          } else {
            // Marker was removed, recreate it
            busMarkerRef.current = null;
          }
        } catch (e) {
          // If update fails, remove and recreate
          try {
            if (busMarkerRef.current && mapRef.current) {
              mapRef.current.removeLayer(busMarkerRef.current);
            }
          } catch (removeError) {
            // Ignore removal errors
          }
          busMarkerRef.current = null;
        }
      }
      
      if (!busMarkerRef.current && mapRef.current) {
        // Create new marker
        const busIcon = L.divIcon({
          className: 'custom-bus-marker',
          html: busIconHTML,
          iconSize: [48, 48],
          iconAnchor: [24, 48],
        });

        busMarkerRef.current = L.marker([busLocation.lat, busLocation.lng], {
          icon: busIcon,
        }).addTo(mapRef.current);
      }
    } catch (error) {
      console.error('Error updating bus marker:', error);
      // Reset marker ref on error
      busMarkerRef.current = null;
    }
  }, [isMapReady, busLocation]);

  // Add/update multiple bus markers (admin view)
  useEffect(() => {
    if (!isMapReady || !mapRef.current || !buses || buses.length === 0) return;

    // @ts-ignore
    const L = window.L;
    if (!L) return;

    try {
      // Remove old markers
      busMarkersRef.current.forEach(marker => {
        if (marker && mapRef.current) {
          mapRef.current.removeLayer(marker);
        }
      });
      busMarkersRef.current = [];

      // Add new markers for each bus
      buses.forEach((bus) => {
        const statusColor = 
          bus.status === 'on-time' ? '#16A34A' :
          bus.status === 'delayed' ? '#F59E0B' :
          bus.status === 'alert' ? '#DC2626' :
          '#3B82F6';

        const busIconHTML = `
          <div style="position: relative;">
            <div style="width: 40px; height: 40px; background: ${statusColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); border: 3px solid white;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <rect x="3" y="6" width="18" height="11" rx="2"/>
                <path d="M3 12h18"/>
                <circle cx="8" cy="19" r="2"/>
                <circle cx="16" cy="19" r="2"/>
              </svg>
            </div>
            <div style="position: absolute; top: -28px; left: 50%; transform: translateX(-50%); background: white; padding: 3px 6px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); white-space: nowrap; font-size: 10px; font-weight: 600; color: #1f2937;">
              ${bus.label}
            </div>
          </div>
        `;

        const busIcon = L.divIcon({
          className: 'custom-bus-marker',
          html: busIconHTML,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        });

        const marker = L.marker([bus.lat, bus.lng], {
          icon: busIcon,
        }).addTo(mapRef.current);

        busMarkersRef.current.push(marker);
      });

      // Fit map to show all buses
      if (buses.length > 0) {
        const bounds = L.latLngBounds(buses.map(b => [b.lat, b.lng]));
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    } catch (error) {
      console.error('Error updating bus markers:', error);
    }
  }, [isMapReady, buses]);

  // Add/update user marker
  useEffect(() => {
    if (!isMapReady || !mapRef.current || !showUserMarker) return;

    // @ts-ignore
    const L = window.L;
    if (!L) return;

    try {
      const userIconHTML = `
        <div style="position: relative;">
          <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4); border: 4px solid white;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div style="position: absolute; top: -32px; left: 50%; transform: translateX(-50%); background: white; padding: 4px 8px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); white-space: nowrap; font-size: 11px; font-weight: 600; color: #1f2937;">
            You
          </div>
        </div>
      `;

      if (userMarkerRef.current) {
        // Update existing marker - check if it's still on the map
        try {
          if (mapRef.current && userMarkerRef.current._map) {
            userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
          } else {
            // Marker was removed, recreate it
            userMarkerRef.current = null;
          }
        } catch (e) {
          // If update fails, remove and recreate
          try {
            if (userMarkerRef.current && mapRef.current) {
              mapRef.current.removeLayer(userMarkerRef.current);
            }
          } catch (removeError) {
            // Ignore removal errors
          }
          userMarkerRef.current = null;
        }
      }
      
      if (!userMarkerRef.current && mapRef.current) {
        // Create new marker
        const userIcon = L.divIcon({
          className: 'custom-user-marker',
          html: userIconHTML,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        });

        userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
          icon: userIcon,
        }).addTo(mapRef.current);
      }
    } catch (error) {
      console.error('Error updating user marker:', error);
      // Reset marker ref on error
      userMarkerRef.current = null;
    }
  }, [isMapReady, userLocation, showUserMarker]);

  // Add/update route polyline
  useEffect(() => {
    if (!isMapReady || !mapRef.current || !route || route.length === 0) return;

    // @ts-ignore
    const L = window.L;
    if (!L) return;

    try {
      // Remove old polyline
      if (routePolylineRef.current) {
        mapRef.current.removeLayer(routePolylineRef.current);
        routePolylineRef.current = null;
      }

      // Create new polyline
      const latlngs = route.map(point => [point.lat, point.lng]);

      routePolylineRef.current = L.polyline(latlngs, {
        color: '#3B82F6',
        weight: 5,
        opacity: 0.7,
        smoothFactor: 1,
      }).addTo(mapRef.current);

      // Fit map to show entire route
      const bounds = L.latLngBounds(latlngs);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    } catch (error) {
      console.error('Error updating route:', error);
    }
  }, [isMapReady, route]);

  // Add University Destination Marker
  useEffect(() => {
    if (!isMapReady || !mapRef.current || !route || route.length === 0) return;

    // @ts-ignore
    const L = window.L;
    if (!L) return;

    try {
      // Remove old university marker
      if (universityMarkerRef.current) {
        mapRef.current.removeLayer(universityMarkerRef.current);
        universityMarkerRef.current = null;
      }

      // Get the last point in the route (destination - City University)
      const destination = route[route.length - 1];

      // University icon HTML
      const universityIconHTML = `
        <div style="position: relative;">
          <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 16px rgba(139, 92, 246, 0.5); border: 3px solid white;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1.5">
              <path d="M12 3L2 9l10 6 10-6-10-6z"/>
              <path d="M2 15l10 6 10-6"/>
              <path d="M2 12l10 6 10-6"/>
            </svg>
          </div>
          <div style="position: absolute; top: -36px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%); color: white; padding: 5px 10px; border-radius: 8px; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4); white-space: nowrap; font-size: 12px; font-weight: 700; border: 2px solid white;">
            City University
          </div>
        </div>
      `;

      const universityIcon = L.divIcon({
        className: 'custom-university-marker',
        html: universityIconHTML,
        iconSize: [48, 48],
        iconAnchor: [24, 48],
      });

      universityMarkerRef.current = L.marker([destination.lat, destination.lng], {
        icon: universityIcon,
      }).addTo(mapRef.current);

    } catch (error) {
      console.error('Error adding university marker:', error);
    }
  }, [isMapReady, route]);

  const handleRecenter = () => {
    if (mapRef.current && userLocation) {
      try {
        mapRef.current.setView([userLocation.lat, userLocation.lng], 14);
      } catch (error) {
        console.error('Error recentering map:', error);
      }
    }
  };

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mapContainerRef} 
        className={`w-full h-full rounded-2xl overflow-hidden shadow-xl ${className}`}
        style={{ minHeight: '400px' }}
      />

      {/* Recenter button */}
      {showUserMarker && (
        <button
          onClick={handleRecenter}
          className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-[1000] active:scale-95"
          title="Recenter map"
        >
          <Navigation className="w-5 h-5 text-blue-600" />
        </button>
      )}

      {/* Loading indicator */}
      {!isMapReady && (
        <div className="absolute inset-0 bg-gray-100 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-600 text-sm">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
}