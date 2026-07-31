import React, { useState } from 'react';
import { Waves, CheckCircle2, RotateCw } from 'lucide-react';
import { audioEngine } from '../../../utils/audioEngine';

interface LevelProps {
  onWin: (score: number, stars: number) => void;
}

export const Level4_NaturePuzzle: React.FC<LevelProps> = ({ onWin }) => {
  // 3x3 Grid of pipe orientations in degrees (0, 90, 180, 270)
  const [pipes, setPipes] = useState<number[]>([90, 180, 0, 270, 90, 180, 0, 90, 0]);

  const rotatePipe = (idx: number) => {
    audioEngine.playClick();
    const next = [...pipes];
    next[idx] = (next[idx] + 90) % 360;
    setPipes(next);

    // Winning condition: all pipes aligned to 0 degrees
    const isAligned = next.every(deg => deg === 0);
    if (isAligned) {
      audioEngine.playWaterSplash();
      setTimeout(() => {
        onWin(1000, 3);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-md mx-auto text-center">
      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
        Click stream tiles to rotate them until all channel stones align horizontally (0°) to flush out sludge!
      </div>

      <div className="grid grid-cols-3 gap-3 w-full">
        {pipes.map((deg, idx) => (
          <div
            key={idx}
            onClick={() => rotatePipe(idx)}
            className={`h-28 rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              deg === 0
                ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div
              className="transition-transform duration-300"
              style={{ transform: `rotate(${deg}deg)` }}
            >
              <Waves className="w-10 h-10 text-cyan-400" />
            </div>
            <span className="text-[10px] font-bold mt-2">{deg}° Aligned</span>
          </div>
        ))}
      </div>
    </div>
  );
};
