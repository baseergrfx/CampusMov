import { MessageCircle, Sparkles } from 'lucide-react';
import type { MainScreen } from './main-app';

interface ChatbotButtonProps {
  onNavigate: (screen: MainScreen) => void;
}

export function ChatbotButton({ onNavigate }: ChatbotButtonProps) {
  return (
    <button
      onClick={() => onNavigate('ai-assistant')}
      className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50 active:scale-95 group"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 text-white" />
        <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
      </div>
      {/* Tooltip */}
      <div className="absolute right-16 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
        AI Assistant
        <div className="absolute top-1/2 -translate-y-1/2 right-[-4px] w-2 h-2 bg-gray-900 rotate-45"></div>
      </div>
    </button>
  );
}
