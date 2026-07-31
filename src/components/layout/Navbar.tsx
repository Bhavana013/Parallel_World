import React from 'react';
import { useGame } from '../../context/GameContext';
import { PageView } from '../../types/game';
import { 
  Compass, 
  Map, 
  Package, 
  Trophy, 
  User, 
  Settings, 
  Sparkles, 
  Zap, 
  Coins, 
  Flame, 
  Globe2, 
  Award,
  Layers,
  BookOpen
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    activeWorld, 
    toggleWorld, 
    playerStats, 
    activeCharacter 
  } = useGame();

  const navItems: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Compass className="w-4 h-4" /> },
    { id: 'world-view', label: 'Parallel Worlds', icon: <Globe2 className="w-4 h-4" /> },
    { id: 'level-select', label: 'Map & Levels', icon: <Map className="w-4 h-4" /> },
    { id: 'inventory', label: 'Vault', icon: <Package className="w-4 h-4" /> },
    { id: 'leaderboard', label: 'Ranks', icon: <Trophy className="w-4 h-4" /> },
    { id: 'achievements', label: 'Badges', icon: <Award className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & IIT Badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('landing')}
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  PARALLEL WORLDS
                </span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest -mt-1">
                  IIT GAMETHON EDITION
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Player Stats HUD & Portal Toggle */}
          <div className="flex items-center gap-3">
            
            {/* World Warp Portal Button */}
            <button
              onClick={toggleWorld}
              className={`relative group flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border shadow-lg transition-all hover:scale-105 active:scale-95 ${
                activeWorld === 'fantasy'
                  ? 'bg-gradient-to-r from-purple-900/90 to-fuchsia-900/90 border-purple-500/60 text-purple-200 shadow-purple-500/20'
                  : 'bg-gradient-to-r from-slate-900/90 to-emerald-950/90 border-emerald-500/60 text-emerald-200 shadow-emerald-500/20'
              }`}
              title="Shift Dimensional View (Reality vs Fantasy)"
            >
              <div className="relative">
                <Layers className={`w-4 h-4 ${activeWorld === 'fantasy' ? 'text-purple-400 animate-spin' : 'text-emerald-400'}`} />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <span className="hidden sm:inline uppercase tracking-wider">
                {activeWorld === 'reality' ? 'REALITY' : 'FANTASY'}
              </span>
            </button>

            {/* Stats Bar */}
            <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs">
              
              {/* Level & XP */}
              <div className="flex items-center gap-1.5" title="Player Level & XP">
                <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-[11px]">
                  LVL {playerStats.level}
                </span>
                <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (playerStats.xp % 500) / 5)}%` }}
                  />
                </div>
              </div>

              <div className="w-px h-4 bg-slate-800" />

              {/* Energy */}
              <div className="flex items-center gap-1 text-emerald-400 font-semibold" title="Positive Energy Meter">
                <Zap className="w-3.5 h-3.5" />
                <span>{playerStats.positiveEnergy}</span>
              </div>

              {/* Coins */}
              <div className="flex items-center gap-1 text-amber-400 font-semibold" title="Eco Coins">
                <Coins className="w-3.5 h-3.5" />
                <span>{playerStats.coins}</span>
              </div>

              {/* Fantasy Growth % */}
              <div className="flex items-center gap-1 text-cyan-400 font-semibold" title="Fantasy Realm Transformation Growth">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{playerStats.fantasyGrowthPercentage}%</span>
              </div>
            </div>

            {/* Character Avatar Trigger */}
            <button
              onClick={() => setActivePage('profile')}
              className="relative w-9 h-9 rounded-xl overflow-hidden border-2 border-emerald-500/60 shadow-md hover:ring-2 hover:ring-emerald-400 transition-all"
              title={`${activeCharacter.name} - ${activeCharacter.title}`}
            >
              <img
                src={activeCharacter.avatarUrl}
                alt={activeCharacter.name}
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer Row */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-slate-800/80 overflow-x-auto gap-2 text-xs no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg shrink-0 font-medium ${
                activePage === item.id ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
