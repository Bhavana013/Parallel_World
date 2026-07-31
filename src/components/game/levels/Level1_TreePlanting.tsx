import React, { useState } from 'react';
import { useGame } from '../../../context/GameContext';
import { Sprout, CheckCircle2, RefreshCw, Sparkles, TreePine } from 'lucide-react';
import { audioEngine } from '../../../utils/audioEngine';

interface LevelProps {
  onWin: (score: number, stars: number) => void;
}

export const Level1_TreePlanting: React.FC<LevelProps> = ({ onWin }) => {
  const [plots, setPlots] = useState<('dug' | 'planted' | 'nurtured' | 'empty')[]>([
    'empty', 'empty', 'empty', 'empty', 'empty', 'empty'
  ]);
  const [plantedCount, setPlantedCount] = useState(0);

  const handlePlotClick = (index: number) => {
    const status = plots[index];
    const newPlots = [...plots];

    if (status === 'empty') {
      newPlots[index] = 'dug';
      audioEngine.playClick();
    } else if (status === 'dug') {
      newPlots[index] = 'planted';
      audioEngine.playPlantSeed();
    } else if (status === 'planted') {
      newPlots[index] = 'nurtured';
      audioEngine.playWaterSplash();
      const count = plantedCount + 1;
      setPlantedCount(count);
      if (count >= 5) {
        setTimeout(() => {
          onWin(count * 100, 3);
        }, 600);
      }
    }
    setPlots(newPlots);
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-xl mx-auto text-center">
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
        <p className="font-bold text-emerald-400 mb-1">Interactive Mechanics:</p>
        <p>1. Click cracked soil to dig. 2. Click again to plant sapling. 3. Click third time to nurture & blossom!</p>
      </div>

      <div className="text-sm font-bold text-emerald-400 flex items-center gap-2">
        <TreePine className="w-5 h-5" />
        <span>Trees Fully Grown: {plantedCount} / 5 Target</span>
      </div>

      {/* Grid of Soil Plots */}
      <div className="grid grid-cols-3 gap-4 w-full">
        {plots.map((status, idx) => (
          <div
            key={idx}
            onClick={() => handlePlotClick(idx)}
            className={`h-32 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 ${
              status === 'nurtured'
                ? 'bg-emerald-950/80 border-emerald-400 shadow-lg shadow-emerald-500/20'
                : status === 'planted'
                ? 'bg-amber-950/80 border-amber-500'
                : status === 'dug'
                ? 'bg-yellow-950/60 border-yellow-600'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            {status === 'empty' && (
              <span className="text-xs text-slate-500 font-semibold">Cracked Soil (Click to Dig)</span>
            )}
            {status === 'dug' && (
              <span className="text-xs text-yellow-400 font-bold">Hole Prepared (Click to Seed)</span>
            )}
            {status === 'planted' && (
              <div className="flex flex-col items-center text-amber-400">
                <Sprout className="w-8 h-8 animate-pulse" />
                <span className="text-[10px] font-bold mt-1">Sprout (Click to Water)</span>
              </div>
            )}
            {status === 'nurtured' && (
              <div className="flex flex-col items-center text-emerald-400 animate-in zoom-in">
                <TreePine className="w-10 h-10 animate-bounce" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider mt-1">World Tree Evolved</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
