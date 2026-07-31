import React, { useState } from 'react';
import { Hammer, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../../../utils/audioEngine';

interface LevelProps {
  onWin: (score: number, stars: number) => void;
}

export const Level6_BridgeBuilding: React.FC<LevelProps> = ({ onWin }) => {
  const [planksPlaced, setPlanksPlaced] = useState(0);

  const addPlank = () => {
    audioEngine.playClick();
    const count = planksPlaced + 1;
    setPlanksPlaced(count);

    if (count >= 5) {
      audioEngine.playAchievementUnlocking();
      setTimeout(() => {
        onWin(1400, 3);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-lg mx-auto text-center">
      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
        Click 'Place Support Beam' to lay wooden planks across the gorge until the bridge is complete!
      </div>

      {/* Visual Gorge */}
      <div className="relative w-full h-40 rounded-3xl bg-slate-950 border-2 border-slate-800 p-4 flex items-center justify-between overflow-hidden">
        {/* Left Cliff */}
        <div className="w-16 h-full bg-amber-950 border-r border-amber-800 rounded-l-2xl flex items-center justify-center font-bold text-[10px] text-amber-400">
          CLIFF A
        </div>

        {/* Bridge Planks Area */}
        <div className="flex-1 px-2 flex items-center gap-1.5 justify-center">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className={`h-12 flex-1 rounded-xl transition-all flex items-center justify-center font-bold text-xs ${
                idx < planksPlaced
                  ? 'bg-amber-600 border border-amber-400 text-amber-950 shadow-md animate-in slide-in-from-top-4'
                  : 'bg-slate-900 border border-dashed border-slate-700 text-slate-600'
              }`}
            >
              {idx < planksPlaced ? 'BEAM' : 'EMPTY'}
            </div>
          ))}
        </div>

        {/* Right Cliff */}
        <div className="w-16 h-full bg-amber-950 border-l border-amber-800 rounded-r-2xl flex items-center justify-center font-bold text-[10px] text-amber-400">
          CLIFF B
        </div>
      </div>

      <button
        onClick={addPlank}
        disabled={planksPlaced >= 5}
        className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-40"
      >
        <Hammer className="w-4 h-4" />
        <span>Place Support Beam ({planksPlaced}/5)</span>
      </button>
    </div>
  );
};
