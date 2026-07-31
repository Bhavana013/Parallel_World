import React, { useState } from 'react';
import { Heart, Sparkles, ShieldAlert } from 'lucide-react';
import { audioEngine } from '../../../utils/audioEngine';

interface LevelProps {
  onWin: (score: number, stars: number) => void;
}

export const Level7_AnimalRescue: React.FC<LevelProps> = ({ onWin }) => {
  const [knots, setKnots] = useState<boolean[]>([true, true, true, true]);

  const untangle = (idx: number) => {
    audioEngine.playClick();
    const next = [...knots];
    next[idx] = false;
    setKnots(next);

    const allUntangled = next.every(k => !k);
    if (allUntangled) {
      audioEngine.playAchievementUnlocking();
      setTimeout(() => {
        onWin(1600, 3);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-md mx-auto text-center">
      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
        Click all 4 net snare knots to untangle the snare and release the Spirit Silver Fox!
      </div>

      <div className="relative w-full h-56 rounded-3xl bg-slate-950 border-2 border-slate-800 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-6xl animate-bounce">🦊</span>
          <span className="font-extrabold text-sm text-emerald-400">Spirit Silver Fox</span>
        </div>

        {/* 4 Knots around creature */}
        <div className="absolute inset-0 p-6 flex flex-wrap justify-between items-center pointer-events-none">
          {knots.map((isLocked, idx) => (
            <button
              key={idx}
              onClick={() => untangle(idx)}
              className={`pointer-events-auto p-3 rounded-2xl font-bold text-xs shadow-lg transition-all hover:scale-110 ${
                isLocked
                  ? 'bg-red-950/90 border border-red-500 text-red-300 animate-pulse'
                  : 'bg-emerald-950/60 border border-emerald-500 text-emerald-300 opacity-40'
              }`}
            >
              {isLocked ? '🪢 Snare Knot' : '✨ Rescued'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
