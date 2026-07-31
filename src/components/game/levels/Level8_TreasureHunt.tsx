import React, { useState, useEffect } from 'react';
import { Radar, Sparkles } from 'lucide-react';
import { audioEngine } from '../../../utils/audioEngine';

interface LevelProps {
  onWin: (score: number, stars: number) => void;
}

export const Level8_TreasureHunt: React.FC<LevelProps> = ({ onWin }) => {
  // 4x4 Grid (16 tiles), 4 contain hidden seeds
  const [seedIndices, setSeedIndices] = useState<number[]>([]);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [foundSeeds, setFoundSeeds] = useState<number[]>([]);

  useEffect(() => {
    const indices: number[] = [];
    while (indices.length < 4) {
      const rand = Math.floor(Math.random() * 16);
      if (!indices.includes(rand)) indices.push(rand);
    }
    setSeedIndices(indices);
  }, []);

  const scanTile = (idx: number) => {
    if (revealed.includes(idx)) return;
    audioEngine.playClick();

    const nextRevealed = [...revealed, idx];
    setRevealed(nextRevealed);

    if (seedIndices.includes(idx)) {
      audioEngine.playAchievementUnlocking();
      const nextFound = [...foundSeeds, idx];
      setFoundSeeds(nextFound);

      if (nextFound.length >= 4) {
        setTimeout(() => {
          onWin(1800, 3);
        }, 500);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-md mx-auto text-center">
      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
        Click soil cells to scan with sonar radar and unearth all 4 Ancient Heirloom Seeds!
      </div>

      <div className="text-xs font-bold text-emerald-400">
        Seeds Found: {foundSeeds.length} / 4 Target
      </div>

      <div className="grid grid-cols-4 gap-3 w-full">
        {[...Array(16)].map((_, idx) => {
          const isRev = revealed.includes(idx);
          const hasSeed = seedIndices.includes(idx);

          return (
            <div
              key={idx}
              onClick={() => scanTile(idx)}
              className={`h-20 rounded-2xl border-2 flex items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                isRev && hasSeed
                  ? 'bg-amber-950 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/20'
                  : isRev
                  ? 'bg-slate-950 border-slate-800 text-slate-600'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              {isRev && hasSeed ? (
                <span className="text-2xl animate-bounce">🌰</span>
              ) : isRev ? (
                <span className="text-[10px] text-slate-600">EMPTY</span>
              ) : (
                <Radar className="w-5 h-5 text-slate-600" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
