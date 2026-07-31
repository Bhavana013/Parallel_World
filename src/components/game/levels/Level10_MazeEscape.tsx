import React, { useState } from 'react';
import { Compass, Sparkles, Layers, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { audioEngine } from '../../../utils/audioEngine';

interface LevelProps {
  onWin: (score: number, stars: number) => void;
}

export const Level10_MazeEscape: React.FC<LevelProps> = ({ onWin }) => {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [phase, setPhase] = useState<'reality' | 'fantasy'>('reality');

  const move = (dx: number, dy: number) => {
    const nx = Math.max(0, Math.min(3, posX + dx));
    const ny = Math.max(0, Math.min(3, posY + dy));

    audioEngine.playClick();
    setPosX(nx);
    setPosY(ny);

    if (nx === 3 && ny === 3) {
      audioEngine.playAchievementUnlocking();
      setTimeout(() => {
        onWin(3000, 3);
      }, 500);
    }
  };

  const togglePhase = () => {
    audioEngine.playPortalWarp();
    setPhase(prev => prev === 'reality' ? 'fantasy' : 'reality');
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-md mx-auto text-center">
      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
        Use Directional Arrow controls to navigate your hero to the Tree of Eternity at (3,3)!
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={togglePhase}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
            phase === 'fantasy' ? 'bg-purple-950 border-purple-500 text-purple-300' : 'bg-slate-900 border-slate-700 text-slate-300'
          }`}
        >
          <Layers className="w-3.5 h-3.5 inline mr-1" />
          Shift Phase: {phase.toUpperCase()}
        </button>
      </div>

      {/* 4x4 Grid Maze */}
      <div className="grid grid-cols-4 gap-2 w-full p-4 rounded-3xl bg-slate-950 border-2 border-slate-800">
        {[0, 1, 2, 3].map((r) => (
          [0, 1, 2, 3].map((c) => {
            const isHero = posX === c && posY === r;
            const isGoal = c === 3 && r === 3;

            return (
              <div
                key={`${r}-${c}`}
                className={`h-16 rounded-xl border flex items-center justify-center font-bold text-xs ${
                  isHero
                    ? 'bg-emerald-500 border-emerald-300 text-slate-950 shadow-lg animate-bounce'
                    : isGoal
                    ? 'bg-amber-950 border-amber-400 text-amber-300'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                {isHero ? '🦸' : isGoal ? '🌳' : `(${c},${r})`}
              </div>
            );
          })
        ))}
      </div>

      {/* D-Pad Controls */}
      <div className="flex flex-col items-center gap-2">
        <button onClick={() => move(0, -1)} className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"><ArrowUp className="w-5 h-5" /></button>
        <div className="flex items-center gap-4">
          <button onClick={() => move(-1, 0)} className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"><ArrowLeft className="w-5 h-5" /></button>
          <button onClick={() => move(1, 0)} className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"><ArrowRight className="w-5 h-5" /></button>
        </div>
        <button onClick={() => move(0, 1)} className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"><ArrowDown className="w-5 h-5" /></button>
      </div>
    </div>
  );
};
