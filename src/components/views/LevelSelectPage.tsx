import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import levelsData from '../../data/levels.json';
import { LevelConfig } from '../../types/game';
import { 
  Play, 
  Lock, 
  Star, 
  Sparkles, 
  Coins, 
  Zap, 
  Clock, 
  Trophy, 
  X, 
  CheckCircle2,
  Info
} from 'lucide-react';

export const LevelSelectPage: React.FC = () => {
  const { playerStats, setSelectedLevel, setActivePage } = useGame();
  const [modalLevel, setModalLevel] = useState<LevelConfig | null>(null);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <ParticleCanvas effectOverride="fireflies" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Map Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Dimensional Map Navigator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">10 Progressive Level Nodes</h1>
            <p className="text-xs text-slate-400">
              Select a node to inspect eco objectives, difficulty rating, and fantasy transformation rewards.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold">
            <span className="text-slate-400">Unlocked:</span>
            <span className="text-emerald-400 font-extrabold">{playerStats.unlockedLevelId} / 10 Levels</span>
          </div>
        </div>

        {/* Node Grid Map */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {levelsData.map((lvl) => {
            const isUnlocked = lvl.id <= playerStats.unlockedLevelId;
            const userProg = playerStats.levelsProgress[lvl.id] || { stars: 0, highScore: 0, completed: false };

            return (
              <div
                key={lvl.id}
                onClick={() => {
                  if (isUnlocked) setModalLevel(lvl as any);
                }}
                className={`group relative rounded-3xl p-5 border transition-all flex flex-col justify-between gap-4 cursor-pointer ${
                  userProg.completed
                    ? 'bg-gradient-to-b from-slate-900 via-emerald-950/30 to-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-500/10 hover:border-emerald-400'
                    : isUnlocked
                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-cyan-500/60 shadow-lg shadow-cyan-500/10 hover:border-cyan-400 hover:scale-105'
                    : 'bg-slate-950 border-slate-850 opacity-40 cursor-not-allowed'
                }`}
              >
                {/* Node Top Row */}
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm ${
                    isUnlocked ? 'bg-emerald-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {isUnlocked ? lvl.id : <Lock className="w-4 h-4" />}
                  </div>

                  {/* Stars earned */}
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3].map((starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-3.5 h-3.5 ${
                          starIdx <= userProg.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Level Details */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {lvl.difficulty}
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-100 mt-2 line-clamp-1">{lvl.subtitle}</h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{lvl.fantasyTransformation}</p>
                </div>

                {/* Reward Badges */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[11px]">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Coins className="w-3.5 h-3.5" />
                    <span>+{lvl.rewardCoins}</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>+{lvl.rewardXP} XP</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Level Inspection Modal */}
        {modalLevel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 flex flex-col gap-6">
              
              <button
                onClick={() => setModalLevel(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-xl">
                  {modalLevel.id}
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{modalLevel.title}</span>
                  <h2 className="text-xl font-extrabold text-slate-100">{modalLevel.subtitle}</h2>
                </div>
              </div>

              {/* Reality Problem vs Fantasy Result */}
              <div className="flex flex-col gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                <div>
                  <span className="text-red-400 font-bold block mb-0.5">Reality Problem:</span>
                  <p className="text-slate-300">{modalLevel.realityProblem}</p>
                </div>
                <div className="w-full h-px bg-slate-800" />
                <div>
                  <span className="text-emerald-400 font-bold block mb-0.5">Fantasy Transformation:</span>
                  <p className="text-slate-300">{modalLevel.fantasyTransformation}</p>
                </div>
              </div>

              {/* Instructions list */}
              <div>
                <span className="text-xs font-bold text-slate-300 block mb-2">Instructions & Goal:</span>
                <ul className="flex flex-col gap-1.5 text-xs text-slate-400">
                  {modalLevel.instructions.map((inst, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Launch Button */}
              <button
                onClick={() => {
                  setSelectedLevel(modalLevel);
                  setModalLevel(null);
                  setActivePage('gameplay');
                }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>START LEVEL {modalLevel.id}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
