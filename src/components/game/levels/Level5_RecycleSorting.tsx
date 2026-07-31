import React, { useState } from 'react';
import { Recycle, CheckCircle2, Zap } from 'lucide-react';
import { audioEngine } from '../../../utils/audioEngine';

interface LevelProps {
  onWin: (score: number, stars: number) => void;
}

interface WasteItem {
  id: number;
  name: string;
  category: 'plastic' | 'ewaste' | 'organic' | 'metal';
  icon: string;
}

export const Level5_RecycleSorting: React.FC<LevelProps> = ({ onWin }) => {
  const initialItems: WasteItem[] = [
    { id: 1, name: 'Plastic Bottle', category: 'plastic', icon: '🍾' },
    { id: 2, name: 'Lithium Battery', category: 'ewaste', icon: '🔋' },
    { id: 3, name: 'Apple Core', category: 'organic', icon: '🍎' },
    { id: 4, name: 'Soda Can', category: 'metal', icon: '🥫' },
    { id: 5, name: 'Shopping Bag', category: 'plastic', icon: '🛍️' },
    { id: 6, name: 'Broken Circuit', category: 'ewaste', icon: '💻' },
    { id: 7, name: 'Banana Peel', category: 'organic', icon: '🍌' },
    { id: 8, name: 'Copper Wire', category: 'metal', icon: '⚙️' },
  ];

  const [items, setItems] = useState<WasteItem[]>(initialItems);
  const [sortedCount, setSortedCount] = useState(0);

  const activeItem = items[0];

  const handleSort = (binCategory: 'plastic' | 'ewaste' | 'organic' | 'metal') => {
    if (!activeItem) return;

    if (activeItem.category === binCategory) {
      audioEngine.playClick();
      const count = sortedCount + 1;
      setSortedCount(count);
      setItems(prev => prev.slice(1));

      if (items.length <= 1) {
        audioEngine.playLevelSuccess();
        setTimeout(() => {
          onWin(1200, 3);
        }, 500);
      }
    } else {
      audioEngine.playWaterSplash();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-lg mx-auto text-center">
      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
        Click the correct bin category to sort the current waste item on top!
      </div>

      {activeItem ? (
        <div className="p-6 rounded-3xl bg-slate-900 border-2 border-emerald-500/60 shadow-xl flex flex-col items-center gap-2 w-full max-w-xs animate-in zoom-in">
          <span className="text-5xl">{activeItem.icon}</span>
          <span className="font-extrabold text-base text-slate-100">{activeItem.name}</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">Item {8 - items.length + 1} of 8</span>
        </div>
      ) : (
        <div className="text-emerald-400 font-bold text-lg">All Waste Sorted Clean!</div>
      )}

      {/* 4 Bins */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
        <button
          onClick={() => handleSort('plastic')}
          className="p-4 rounded-2xl bg-blue-950/80 border border-blue-500 text-blue-300 font-bold text-xs hover:scale-105 transition-all"
        >
          ♻️ PLASTIC
        </button>

        <button
          onClick={() => handleSort('ewaste')}
          className="p-4 rounded-2xl bg-purple-950/80 border border-purple-500 text-purple-300 font-bold text-xs hover:scale-105 transition-all"
        >
          ⚡ E-WASTE
        </button>

        <button
          onClick={() => handleSort('organic')}
          className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 font-bold text-xs hover:scale-105 transition-all"
        >
          🌱 ORGANIC
        </button>

        <button
          onClick={() => handleSort('metal')}
          className="p-4 rounded-2xl bg-amber-950/80 border border-amber-500 text-amber-300 font-bold text-xs hover:scale-105 transition-all"
        >
          🔩 METAL
        </button>
      </div>
    </div>
  );
};
