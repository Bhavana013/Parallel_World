import React from 'react';
import { useGame } from '../../context/GameContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import initialLeaderboard from '../../data/leaderboardMock.json';
import { Trophy, Medal, Sparkles, Award, Flame } from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { playerStats } = useGame();

  // Combine mock dataset with active player
  const leaderboardData = initialLeaderboard.map((entry) => {
    if (entry.isCurrentUser) {
      return {
        ...entry,
        username: `${playerStats.username} (You)`,
        xp: playerStats.xp,
        level: playerStats.level,
        fantasyGrowthPercentage: playerStats.fantasyGrowthPercentage,
        positiveEnergy: playerStats.positiveEnergy,
        badgesCount: playerStats.achievements.filter(a => a.unlocked).length,
      };
    }
    return entry;
  });

  leaderboardData.sort((a, b) => b.xp - a.xp);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <ParticleCanvas effectOverride="fireflies" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-8">
        
        <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mx-auto">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>IIT National Gamethon Leaderboard</span>
          </div>
          <h1 className="text-3xl font-black">Top Eco Champions</h1>
          <p className="text-xs text-slate-400">
            Real-time standings based on Total XP, Fantasy Growth %, and Positive Energy scores.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-4 px-6">Rank</th>
                  <th className="py-4 px-6">Champion</th>
                  <th className="py-4 px-6">Level</th>
                  <th className="py-4 px-6">Total XP</th>
                  <th className="py-4 px-6">Fantasy Growth</th>
                  <th className="py-4 px-6">Positive Energy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {leaderboardData.map((entry, idx) => {
                  const rank = idx + 1;
                  return (
                    <tr
                      key={idx}
                      className={`transition-colors ${
                        entry.isCurrentUser
                          ? 'bg-emerald-950/40 border-l-4 border-l-emerald-400 text-emerald-200'
                          : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="py-4 px-6 font-bold">
                        {rank === 1 ? '🥇 #1' : rank === 2 ? '🥈 #2' : rank === 3 ? '🥉 #3' : `#${rank}`}
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-100 flex items-center gap-2">
                        <span>{entry.username}</span>
                        {entry.isCurrentUser && <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 text-[9px] uppercase font-black">YOU</span>}
                      </td>
                      <td className="py-4 px-6 text-emerald-400 font-bold">LVL {entry.level}</td>
                      <td className="py-4 px-6 font-bold text-amber-400">{entry.xp} XP</td>
                      <td className="py-4 px-6 font-bold text-cyan-400">{entry.fantasyGrowthPercentage}%</td>
                      <td className="py-4 px-6 font-bold text-purple-400">{entry.positiveEnergy} Energy</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
