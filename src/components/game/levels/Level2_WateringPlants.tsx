import React, { useState } from 'react';
import { Droplet, Flower2, Sparkles } from 'lucide-react';
import { audioEngine } from '../../../utils/audioEngine';

interface LevelProps {
  onWin: (score: number, stars: number) => void;
}

export const Level2_WateringPlants: React.FC<LevelProps> = ({ onWin }) => {
  const [moisture, setMoisture] = useState<number[]>([10, 20, 15, 0, 30, 25, 10, 5]);

  const waterPlant = (index: number) => {
    audioEngine.playWaterSplash();
    const next = [...moisture];
    next[index] = Math.min(100, next[index] + 25);
    setMoisture(next);

    const allBloomed = next.every(m => m >= 100);
    if (allBloomed) {
      setTimeout(() => {
        onWin(800, 3);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-xl mx-auto text-center">
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
        <p className="font-bold text-cyan-400 mb-1">Moisture Hydration Goal:</p>
        <p>Click plants continuously with your moisture spray until all 8 flowers hit 100% hydration!</p>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full">
        {moisture.map((val, idx) => (
          <div
            key={idx}
            onClick={() => waterPlant(idx)}
            className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 cursor-pointer transition-all hover:scale-105 ${
              val >= 100
                ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <Flower2 className={`w-8 h-8 ${val >= 100 ? 'text-cyan-300 animate-spin' : 'text-slate-600'}`} />
            
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full transition-all" style={{ width: `${val}%` }} />
            </div>

            <span className="text-[10px] font-bold">{val >= 100 ? 'BLOOMED!' : `${val}% Water`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
