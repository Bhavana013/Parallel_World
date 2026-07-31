import React, { useState } from 'react';
import { Flower2, TreePine, Sun, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../../../utils/audioEngine';

interface LevelProps {
  onWin: (score: number, stars: number) => void;
}

export const Level9_GardenDecoration: React.FC<LevelProps> = ({ onWin }) => {
  const [grid, setGrid] = useState<(string | null)[]>(Array(9).fill(null));

  const placeItem = (idx: number) => {
    audioEngine.playClick();
    const items = ['🌳 Tree', '🌸 Flower', '⛲ Fountain', '☀️ Solar'];
    const current = grid[idx];
    const nextItem = current === null ? items[0] : current === items[0] ? items[1] : current === items[1] ? items[2] : current === items[2] ? items[3] : null;

    const nextGrid = [...grid];
    nextGrid[idx] = nextItem;
    setGrid(nextGrid);

    const filledCount = nextGrid.filter(x => x !== null).length;
    if (filledCount >= 9) {
      audioEngine.playAchievementUnlocking();
      setTimeout(() => {
        onWin(2000, 3);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-md mx-auto text-center">
      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
        Click grid plots to cycle & arrange eco decorations until all 9 sanctuary tiles are filled!
      </div>

      <div className="grid grid-cols-3 gap-3 w-full">
        {grid.map((item, idx) => (
          <div
            key={idx}
            onClick={() => placeItem(idx)}
            className={`h-24 rounded-2xl border-2 flex items-center justify-center font-bold text-xs cursor-pointer transition-all hover:scale-105 ${
              item !== null
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-600'
            }`}
          >
            {item || '+ Add Eco Item'}
          </div>
        ))}
      </div>
    </div>
  );
};
