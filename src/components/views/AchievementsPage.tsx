import React from 'react';
import { useGame } from '../../context/GameContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { Award, Sprout, Trees, Waves, Star, Flame, Crown, CheckCircle2 } from 'lucide-react';

export const AchievementsPage: React.FC = () => {
  const { playerStats, claimAchievement } = useGame();

  const renderBadgeIcon = (icon: string) => {
    switch (icon) {
      case 'Sprout': return <Sprout className="w-8 h-8 text-emerald-400" />;
      case 'Trees': return <Trees className="w-8 h-8 text-emerald-300" />;
      case 'Waves': return <Waves className="w-8 h-8 text-cyan-400" />;
      case 'Star': return <Star className="w-8 h-8 text-amber-400 fill-amber-400" />;
      case 'Flame': return <Flame className="w-8 h-8 text-orange-400 fill-orange-400" />;
      case 'Crown': return <Crown className="w-8 h-8 text-purple-400" />;
      default: return <Award className="w-8 h-8 text-emerald-400" />;
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <ParticleCanvas effectOverride="fireflies" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
              <Award className="w-4 h-4" />
              <span>Eco Milestones & Trophies</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">Badges & Accomplishments</h1>
            <p className="text-xs text-slate-400">
              Unlock badges by reaching restoration milestones across Parallel Worlds.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playerStats.achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between gap-4 shadow-xl ${
                ach.unlocked
                  ? 'bg-slate-900 border-amber-500/60 shadow-amber-500/10'
                  : 'bg-slate-950/80 border-slate-850 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner">
                  {renderBadgeIcon(ach.badgeIcon)}
                </div>
                {ach.unlocked && (
                  <span className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    <CheckCircle2 className="w-3 h-3" /> Unlocked
                  </span>
                )}
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">{ach.category} BADGE</span>
                <h3 className="font-extrabold text-base text-slate-100 mt-0.5">{ach.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{ach.description}</p>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Progress</span>
                  <span>{ach.progress} / {ach.maxProgress}</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${Math.min(100, (ach.progress / ach.maxProgress) * 100)}%` }} />
                </div>
              </div>

              <button
                onClick={() => claimAchievement(ach.id)}
                disabled={!ach.unlocked || !!ach.unlockedAt}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 disabled:opacity-40 transition-all"
              >
                {ach.unlockedAt ? 'Reward Claimed' : ach.unlocked ? `Claim Reward (+${ach.rewardCoins} Coins)` : 'Locked'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
