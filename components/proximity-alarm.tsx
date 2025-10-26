import { useEffect, useState, useRef } from 'react';
import { Volume2, Bell, MapPin, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { AlarmSettings } from './alarm-settings-screen';

interface ProximityAlarmProps {
  minutesAway: number;
  isAlarmEnabled: boolean;
  distanceKm: string;
}

const defaultAlarmSettings: AlarmSettings = {
  enabled: true,
  triggerType: 'time',
  triggerDistance: 1.0,
  triggerTime: 2,
  soundType: 'beep',
  vibration: true,
  showBanner: true,
};

export function ProximityAlarm({ minutesAway, isAlarmEnabled, distanceKm }: ProximityAlarmProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Load alarm settings from localStorage
  const [alarmSettings, setAlarmSettings] = useState<AlarmSettings>(() => {
    const saved = localStorage.getItem('alarmSettings');
    if (saved) {
      try {
        return { ...defaultAlarmSettings, ...JSON.parse(saved) };
      } catch {
        return defaultAlarmSettings;
      }
    }
    return defaultAlarmSettings;
  });

  // Listen for settings changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('alarmSettings');
      if (saved) {
        try {
          setAlarmSettings({ ...defaultAlarmSettings, ...JSON.parse(saved) });
        } catch {
          // Ignore parse errors
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Reset when minutes are high again (bus restarted its route)
    if (minutesAway > 5) {
      setHasTriggered(false);
      setShowBanner(false);
    }

    // Check if we should trigger the alarm based on user settings
    const shouldTrigger = isAlarmEnabled && 
      alarmSettings.enabled &&
      !hasTriggered &&
      minutesAway > 0;

    if (shouldTrigger) {
      // Trigger based on user preference (time or distance)
      if (alarmSettings.triggerType === 'time') {
        if (minutesAway <= alarmSettings.triggerTime) {
          triggerAlarm();
        }
      } else {
        // Distance-based trigger
        const currentDistance = parseFloat(distanceKm);
        if (currentDistance <= alarmSettings.triggerDistance) {
          triggerAlarm();
        }
      }
    }
  }, [minutesAway, isAlarmEnabled, hasTriggered, alarmSettings, distanceKm]);

  const triggerAlarm = () => {
    setHasTriggered(true);
    setShowBanner(true);
    playAlarmSound();
    
    // Also show a toast notification as backup
    toast.error('🚌 Bus Arriving Soon!', {
      description: `Your bus will arrive in ${minutesAway} minute${minutesAway !== 1 ? 's' : ''}`,
      duration: 10000,
    });

    // Vibrate if supported
    if ('vibrate' in navigator && alarmSettings.vibration) {
      navigator.vibrate([500, 200, 500, 200, 500]);
    }
  };

  const playAlarmSound = () => {
    // Don't play sound if user selected silent mode
    if (alarmSettings.soundType === 'silent') return;
    
    // Create a simple alarm beep using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playTone = (frequency: number, duration: number, delay: number) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.value = frequency;
          oscillator.type = alarmSettings.soundType === 'chime' ? 'sine' : 
                           alarmSettings.soundType === 'alert' ? 'triangle' : 'square';
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + duration);
        }, delay);
      };

      // Play different sounds based on user preference
      if (alarmSettings.soundType === 'beep') {
        playTone(800, 0.2, 0);
        playTone(800, 0.2, 300);
      } else if (alarmSettings.soundType === 'chime') {
        playTone(523, 0.2, 0); // C
        playTone(659, 0.2, 200); // E
        playTone(784, 0.3, 400); // G
      } else if (alarmSettings.soundType === 'alert') {
        playTone(900, 0.15, 0);
        playTone(700, 0.15, 150);
        playTone(900, 0.15, 300);
        playTone(700, 0.15, 450);
      }
      
      setIsPlaying(true);
      
      // Stop after pattern completes
      setTimeout(() => {
        setIsPlaying(false);
      }, 2000);
    } catch (error) {
      console.log('Audio playback not supported:', error);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
  };

  // iOS-Style Clean Banner Notification - System Level
  if (!showBanner || !isAlarmEnabled || !alarmSettings.showBanner) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] p-4 pointer-events-none animate-in slide-in-from-top duration-500">
      <div className="max-w-md mx-auto pointer-events-auto">
        {/* Clean iOS Banner */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
          {/* Top Color Bar - Alert Indicator */}
          <div className="h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"></div>
          
          {/* Content */}
          <div className="p-5">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              {/* App Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Volume2 className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              
              {/* Title & Subtitle */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900">CampusMove</span>
                  <span className="text-xs text-gray-400">now</span>
                </div>
                <div className="text-base font-bold text-gray-900 mb-0.5">
                  ALARM: Bus Arriving Soon!
                </div>
                <div className="text-sm text-gray-600">
                  Your bus is {minutesAway} minute{minutesAway !== 1 ? 's' : ''} away
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center flex-shrink-0 transition-colors active:scale-95"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex items-center gap-2.5 px-3 py-2.5 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100/50">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500">Distance</div>
                  <div className="text-sm font-semibold text-gray-900">~{distanceKm} km</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100/50">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bell className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500">ETA</div>
                  <div className="text-sm font-semibold text-gray-900">9:45 AM</div>
                </div>
              </div>
            </div>

            {/* Action Message */}
            <div className="mt-4 px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200/50">
              <div className="text-center">
                <div className="text-sm font-bold text-gray-900 mb-1">
                  ⚠️ Please head to your stop now
                </div>
                <div className="text-xs text-gray-600">
                  Apne stop par jaldi pahunch jain
                </div>
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              className="w-full mt-4 h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-semibold text-sm transition-all active:scale-95 shadow-lg shadow-blue-500/30"
            >
              Got It - I'm Ready
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
