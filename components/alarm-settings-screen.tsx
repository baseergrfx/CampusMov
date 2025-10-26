import { useState, useEffect } from 'react';
import { ArrowLeft, Bell, MapPin, Clock, Volume2, VolumeX, Music, Zap, Radio } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { toast } from 'sonner@2.0.3';
import type { MainScreen } from './main-app';

interface AlarmSettingsScreenProps {
  onNavigate: (screen: MainScreen) => void;
}

export interface AlarmSettings {
  enabled: boolean;
  triggerType: 'distance' | 'time';
  triggerDistance: number; // in km
  triggerTime: number; // in minutes
  soundType: 'beep' | 'chime' | 'alert' | 'silent';
  vibration: boolean;
  showBanner: boolean;
}

const defaultSettings: AlarmSettings = {
  enabled: true,
  triggerType: 'time',
  triggerDistance: 1.0,
  triggerTime: 2,
  soundType: 'beep',
  vibration: true,
  showBanner: true,
};

export function AlarmSettingsScreen({ onNavigate }: AlarmSettingsScreenProps) {
  const [settings, setSettings] = useState<AlarmSettings>(() => {
    const saved = localStorage.getItem('alarmSettings');
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  const saveSettings = (newSettings: AlarmSettings) => {
    setSettings(newSettings);
    localStorage.setItem('alarmSettings', JSON.stringify(newSettings));
    localStorage.setItem('proximityAlarmEnabled', JSON.stringify(newSettings.enabled));
    window.dispatchEvent(new Event('storage'));
  };

  const handleTestAlarm = () => {
    if (settings.soundType !== 'silent') {
      playSound(settings.soundType);
    }
    if (settings.vibration && 'vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
    toast.success('Test Alarm', {
      description: 'This is how your alarm will sound',
      duration: 3000,
    });
  };

  const playSound = (type: string) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playTone = (frequency: number, duration: number, delay: number) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.value = frequency;
          oscillator.type = type === 'chime' ? 'sine' : type === 'alert' ? 'triangle' : 'square';
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + duration);
        }, delay);
      };

      if (type === 'beep') {
        playTone(800, 0.2, 0);
        playTone(800, 0.2, 300);
      } else if (type === 'chime') {
        playTone(523, 0.2, 0); // C
        playTone(659, 0.2, 200); // E
        playTone(784, 0.3, 400); // G
      } else if (type === 'alert') {
        playTone(900, 0.15, 0);
        playTone(700, 0.15, 150);
        playTone(900, 0.15, 300);
        playTone(700, 0.15, 450);
      }
    } catch (error) {
      console.log('Audio playback not supported:', error);
    }
  };

  const soundOptions = [
    { id: 'beep', label: 'Beep', description: 'Classic alarm beep', icon: Volume2 },
    { id: 'chime', label: 'Chime', description: 'Gentle chime sound', icon: Music },
    { id: 'alert', label: 'Alert', description: 'Urgent alert tone', icon: Bell },
    { id: 'silent', label: 'Silent', description: 'Visual only', icon: VolumeX },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* iOS-style Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-14">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('notification-settings')}
            className="gap-1 text-blue-600 hover:text-blue-700 hover:bg-transparent -ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Settings</span>
          </Button>
          <h1 className="font-semibold text-gray-900 absolute left-1/2 -translate-x-1/2">
            Proximity Alarm
          </h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-2xl mx-auto pb-24">
        {/* Master Toggle */}
        <Card className="p-4 border-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Enable Alarm</div>
                <div className="text-sm text-gray-500">Get notified when bus is near</div>
              </div>
            </div>
            <Switch
              checked={settings.enabled}
              onCheckedChange={(enabled) => saveSettings({ ...settings, enabled })}
            />
          </div>
        </Card>

        {settings.enabled && (
          <>
            {/* Trigger Type Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Zap className="w-4 h-4 text-gray-500" />
                <h2 className="font-semibold text-gray-900">Trigger Type</h2>
              </div>
              
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-200">
                <button
                  onClick={() => saveSettings({ ...settings, triggerType: 'time' })}
                  className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                      settings.triggerType === 'time' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Clock className={`w-4.5 h-4.5 ${
                        settings.triggerType === 'time' ? 'text-blue-600' : 'text-gray-500'
                      }`} strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Time Based</div>
                      <div className="text-sm text-gray-500">Alert X minutes before arrival</div>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    settings.triggerType === 'time' ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {settings.triggerType === 'time' && (
                      <div className="w-3 h-3 bg-blue-600 rounded-full" />
                    )}
                  </div>
                </button>

                <button
                  onClick={() => saveSettings({ ...settings, triggerType: 'distance' })}
                  className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                      settings.triggerType === 'distance' ? 'bg-orange-100' : 'bg-gray-100'
                    }`}>
                      <MapPin className={`w-4.5 h-4.5 ${
                        settings.triggerType === 'distance' ? 'text-orange-600' : 'text-gray-500'
                      }`} strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Distance Based</div>
                      <div className="text-sm text-gray-500">Alert when bus is X km away</div>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    settings.triggerType === 'distance' ? 'border-orange-600' : 'border-gray-300'
                  }`}>
                    {settings.triggerType === 'distance' && (
                      <div className="w-3 h-3 bg-orange-600 rounded-full" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Trigger Value Slider */}
            <Card className="p-5 border-0 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {settings.triggerType === 'time' ? (
                    <Clock className="w-4.5 h-4.5 text-blue-600" strokeWidth={2.5} />
                  ) : (
                    <MapPin className="w-4.5 h-4.5 text-orange-600" strokeWidth={2.5} />
                  )}
                  <span className="font-semibold text-gray-900">
                    {settings.triggerType === 'time' ? 'Alert Time' : 'Alert Distance'}
                  </span>
                </div>
                <span className="text-2xl font-semibold text-gray-900">
                  {settings.triggerType === 'time' 
                    ? `${settings.triggerTime} min` 
                    : `${settings.triggerDistance.toFixed(1)} km`}
                </span>
              </div>

              {settings.triggerType === 'time' ? (
                <>
                  <Slider
                    value={[settings.triggerTime]}
                    onValueChange={([value]) => saveSettings({ ...settings, triggerTime: value })}
                    min={1}
                    max={10}
                    step={1}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 min</span>
                    <span>5 min</span>
                    <span>10 min</span>
                  </div>
                  <p className="text-sm text-gray-600 pt-1">
                    You'll be notified {settings.triggerTime} minute{settings.triggerTime !== 1 ? 's' : ''} before the bus arrives at your stop
                  </p>
                </>
              ) : (
                <>
                  <Slider
                    value={[settings.triggerDistance * 10]}
                    onValueChange={([value]) => saveSettings({ ...settings, triggerDistance: value / 10 })}
                    min={5}
                    max={30}
                    step={5}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0.5 km</span>
                    <span>1.5 km</span>
                    <span>3.0 km</span>
                  </div>
                  <p className="text-sm text-gray-600 pt-1">
                    You'll be notified when the bus is {settings.triggerDistance.toFixed(1)} km away from your stop
                  </p>
                </>
              )}
            </Card>

            {/* Sound Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Volume2 className="w-4 h-4 text-gray-500" />
                <h2 className="font-semibold text-gray-900">Alert Sound</h2>
              </div>
              
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-200">
                {soundOptions.map((option, index) => {
                  const Icon = option.icon;
                  const isSelected = settings.soundType === option.id;
                  
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        saveSettings({ ...settings, soundType: option.id as any });
                        if (option.id !== 'silent') {
                          playSound(option.id);
                        }
                      }}
                      className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-4.5 h-4.5 ${
                            isSelected ? 'text-blue-600' : 'text-gray-500'
                          }`} strokeWidth={2.5} />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-xs text-gray-500">{option.description}</div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-blue-600' : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <div className="w-3 h-3 bg-blue-600 rounded-full" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Radio className="w-4 h-4 text-gray-500" />
                <h2 className="font-semibold text-gray-900">Additional Options</h2>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-200">
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center">
                      <Volume2 className="w-4.5 h-4.5 text-purple-600" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Vibration</div>
                      <div className="text-xs text-gray-500">Vibrate on alarm</div>
                    </div>
                  </div>
                  <Switch
                    checked={settings.vibration}
                    onCheckedChange={(vibration) => saveSettings({ ...settings, vibration })}
                  />
                </div>

                <div className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center">
                      <Bell className="w-4.5 h-4.5 text-green-600" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Banner Notification</div>
                      <div className="text-xs text-gray-500">Show persistent banner</div>
                    </div>
                  </div>
                  <Switch
                    checked={settings.showBanner}
                    onCheckedChange={(showBanner) => saveSettings({ ...settings, showBanner })}
                  />
                </div>
              </div>
            </div>

            {/* Test Button */}
            <Button
              onClick={handleTestAlarm}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              Test Alarm
            </Button>

            {/* Info Card */}
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <div className="flex gap-3">
                <Bell className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900 space-y-1">
                  <p className="font-medium">How it works</p>
                  <p className="text-blue-700">
                    Based on your settings, you'll receive an alarm when the bus is{' '}
                    {settings.triggerType === 'time' 
                      ? `${settings.triggerTime} minute${settings.triggerTime !== 1 ? 's' : ''} away` 
                      : `${settings.triggerDistance.toFixed(1)} km away`} from your stop.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
