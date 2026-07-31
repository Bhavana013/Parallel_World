import React from 'react';
import { useGame } from '../../context/GameContext';
import { Sparkles, Heart, Globe, ShieldCheck, Terminal, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, playerStats } = useGame();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 text-slate-400 py-8 px-4 sm:px-6 lg:px-8 mt-auto z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
        
        {/* Left: Brand & Event info */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2 font-bold text-slate-200 text-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Parallel Worlds</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px]">
              IIT Gamethon Showcase
            </span>
          </div>
          <p className="text-slate-500 text-center md:text-left">
            An eco-transformation simulation game connecting real-world actions with parallel dimensional fantasy.
          </p>
        </div>

        {/* Center: System Status & Metrics */}
        <div className="flex items-center gap-6 text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Server: Cloud Run Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Login Streak: {playerStats.loginStreak} Days</span>
          </div>
        </div>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-4 text-slate-400">
          <button onClick={() => setActivePage('story-intro')} className="hover:text-emerald-400 transition-colors">
            Story Comic
          </button>
          <button onClick={() => setActivePage('character-select')} className="hover:text-emerald-400 transition-colors">
            Characters
          </button>
          <button onClick={() => setActivePage('settings')} className="hover:text-emerald-400 transition-colors">
            Controls
          </button>
          <button onClick={() => setActivePage('game-completion')} className="hover:text-emerald-400 transition-colors">
            Hall of Fame
          </button>
        </div>
      </div>
    </footer>
  );
};
