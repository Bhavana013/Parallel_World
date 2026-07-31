import React from 'react';
import { useGame } from '../../context/GameContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { 
  Play, 
  Sparkles, 
  Flame, 
  Zap, 
  Coins, 
  Trophy, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Globe2,
  Calendar,
  Award
} from 'lucide-react';
import initialLevels from '../../data/levels.json';

export const DashboardPage: React.FC = () => {
  const { playerStats, activeCharacter, setActivePage, setSelectedLevel, toggleWorld } = useGame();

  const currentLevelObj = initialLevels.find(l => l.id === playerStats.unlockedLevelId) || initialLevels[0];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <ParticleCanvas effectOverride="fireflies" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Top Hero Hub Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-xl shrink-0">
              <img src={activeCharacter.avatarUrl} alt={activeCharacter.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
                  {activeCharacter.title}
                </span>
                <span className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  {playerStats.loginStreak} Day Streak
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-100">{playerStats.username}</h1>
              <p className="text-xs text-slate-400 max-w-md">{activeCharacter.specialPerk}</p>
            </div>
          </div>

          {/* Quick Launch Next Level */}
          <button
            onClick={() => {
              setSelectedLevel(currentLevelObj as any);
              setActivePage('gameplay');
            }}
            className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>PLAY LEVEL {playerStats.unlockedLevelId}: {currentLevelObj.subtitle}</span>
          </button>
        </div>

        {/* Stats & Growth Matrix Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Fantasy Realm Growth */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Fantasy Transformation</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <div className="text-3xl font-black text-cyan-400 mb-1">{playerStats.fantasyGrowthPercentage}%</div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-700" 
                  style={{ width: `${playerStats.fantasyGrowthPercentage}%` }}
                />
              </div>
            </div>
            <button 
              onClick={toggleWorld}
              className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1 mt-1"
            >
              <span>View Parallel Realm</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Positive Energy */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Positive Energy</span>
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">{playerStats.positiveEnergy}</div>
            <p className="text-[11px] text-slate-400">Earned by nurturing flora and rescue missions.</p>
          </div>

          {/* Eco Coins */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Eco Coins Balance</span>
              <Coins className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400">{playerStats.coins}</div>
            <button 
              onClick={() => setActivePage('inventory')}
              className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Open Vault & Store</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tasks Completed */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Quests Completed</span>
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-black text-purple-400">{playerStats.totalTasksCompleted}</div>
            <p className="text-[11px] text-slate-400">Restored across 10 distinct level categories.</p>
          </div>
        </div>

        {/* Level Map Roadmap Preview */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-100">Level Progression Roadmap</h3>
                <p className="text-xs text-slate-400">Complete levels sequentially to restore the Fantasy World.</p>
              </div>
            </div>
            <button
              onClick={() => setActivePage('level-select')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
            >
              Full Interactive Map
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {initialLevels.slice(0, 5).map((lvl) => {
              const isUnlocked = lvl.id <= playerStats.unlockedLevelId;
              const isCurrent = lvl.id === playerStats.unlockedLevelId;

              return (
                <div
                  key={lvl.id}
                  onClick={() => {
                    if (isUnlocked) {
                      setSelectedLevel(lvl as any);
                      setActivePage('gameplay');
                    }
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                    isCurrent
                      ? 'bg-gradient-to-b from-emerald-900/60 to-slate-900 border-emerald-500/80 shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400/50'
                      : isUnlocked
                      ? 'bg-slate-900/90 border-slate-700 hover:border-emerald-500/50'
                      : 'bg-slate-950/60 border-slate-850 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className={isUnlocked ? 'text-emerald-400' : 'text-slate-500'}>LVL {lvl.id}</span>
                    {isCurrent && <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 text-[9px] uppercase tracking-wider">NEXT</span>}
                  </div>
                  <h4 className="font-bold text-xs text-slate-200 line-clamp-1">{lvl.subtitle}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1">{lvl.fantasyTransformation}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
