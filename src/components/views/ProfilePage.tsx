import React from 'react';
import { useGame } from '../../context/GameContext';
import { useAuth } from '../../context/AuthContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { User, Shield, Flame, Award, Zap, Coins, Sparkles, LogOut } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { playerStats, activeCharacter, setActivePage } = useGame();
  const { currentUser, logout } = useAuth();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <ParticleCanvas effectOverride="fireflies" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Profile Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center gap-8">
          <div className="relative w-28 h-28 rounded-3xl overflow-hidden border-2 border-emerald-400 shadow-2xl shrink-0">
            <img src={activeCharacter.avatarUrl} alt={activeCharacter.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col gap-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                {playerStats.equippedTitle}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                {playerStats.loginStreak} Day Streak
              </span>
            </div>

            <h1 className="text-3xl font-black text-slate-100">{playerStats.username}</h1>
            <p className="text-xs text-slate-400">{currentUser?.email || 'guest@iit.ac.in'}</p>

            <div className="flex items-center justify-center sm:justify-start gap-4 pt-3 border-t border-slate-800 text-xs">
              <button
                onClick={() => setActivePage('character-select')}
                className="text-emerald-400 hover:underline font-bold"
              >
                Change Guardian Hero
              </button>
              {currentUser && (
                <button
                  onClick={logout}
                  className="text-red-400 hover:underline font-bold flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Level</span>
            <span className="text-2xl font-black text-emerald-400">LVL {playerStats.level}</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Total XP</span>
            <span className="text-2xl font-black text-amber-400">{playerStats.xp} XP</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Fantasy Growth</span>
            <span className="text-2xl font-black text-cyan-400">{playerStats.fantasyGrowthPercentage}%</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Badges Earned</span>
            <span className="text-2xl font-black text-purple-400">
              {playerStats.achievements.filter(a => a.unlocked).length} / {playerStats.achievements.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
