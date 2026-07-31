import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { Sparkles, Trophy, Crown, Award, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const GameCompletionPage: React.FC = () => {
  const { playerStats, resetProgress, setActivePage } = useGame();

  useEffect(() => {
    // Grand celebratory fireworks
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <ParticleCanvas effectOverride="blooming_pollen" />

      <div className="relative z-10 w-full max-w-3xl mx-auto rounded-3xl border-2 border-emerald-400 bg-gradient-to-b from-slate-900 via-emerald-950/50 to-slate-900 p-8 sm:p-12 shadow-2xl text-center flex flex-col items-center gap-6">
        
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-2xl shadow-emerald-500/30">
          <Crown className="w-10 h-10 animate-bounce" />
        </div>

        <div>
          <span className="px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-black text-xs uppercase tracking-widest">
            IIT GAMETHON GRAND CHAMPION
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-100 mt-3">
            100% Fantasy World Transformation Complete!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2 leading-relaxed">
            You have successfully cleared all 10 ecological levels, restoring the parallel realm into a thriving, bioluminescent crystal paradise.
          </p>
        </div>

        {/* Certificate Card */}
        <div className="w-full p-6 rounded-2xl bg-slate-950 border border-slate-800 text-left flex flex-col gap-3 font-mono text-xs text-slate-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-emerald-400">CERTIFICATE OF IIT GAMETHON EXCELLENCE</span>
            <span>ID: {playerStats.id}</span>
          </div>
          <div><span className="text-slate-500">HERO CHAMPION:</span> {playerStats.username}</div>
          <div><span className="text-slate-500">LEVEL ATTAINED:</span> LVL {playerStats.level} ({playerStats.xp} XP)</div>
          <div><span className="text-slate-500">POSITIVE ENERGY GENERATED:</span> {playerStats.positiveEnergy} Points</div>
          <div><span className="text-slate-500">STREAK RECORD:</span> {playerStats.loginStreak} Consecutive Days</div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <button
            onClick={() => setActivePage('dashboard')}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-emerald-500/25 hover:scale-105 transition-all"
          >
            Dashboard Overview
          </button>

          <button
            onClick={resetProgress}
            className="px-6 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Game Plus</span>
          </button>
        </div>
      </div>
    </div>
  );
};
