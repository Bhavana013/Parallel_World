import React, { useState } from 'react';
import { Sparkles, Star, Award, Coins, Zap, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';
import confetti from 'canvas-confetti';

interface RewardChestModalProps {
  coinsEarned: number;
  xpEarned: number;
  starsEarned: number;
  levelTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export const RewardChestModal: React.FC<RewardChestModalProps> = ({
  coinsEarned,
  xpEarned,
  starsEarned,
  levelTitle,
  isOpen,
  onClose,
}) => {
  const [isOpenChest, setIsOpenChest] = useState(false);

  if (!isOpen) return null;

  const handleOpenChest = () => {
    if (isOpenChest) return;
    setIsOpenChest(true);
    audioEngine.narrateRewards();

    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6'],
      });
    } catch (e) {
      console.warn('Confetti burst trigger notice:', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md p-6 rounded-3xl bg-slate-900 border-2 border-amber-500/60 shadow-2xl flex flex-col items-center text-center gap-5 overflow-hidden">
        
        {/* Background Radial Light Rays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-emerald-500/10 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-widest">
            Level Cleared!
          </span>
          <h2 className="text-2xl font-black text-slate-100 mt-2">{levelTitle}</h2>
        </div>

        {/* Cartoon Treasure Chest Animation */}
        <div
          onClick={handleOpenChest}
          className={`relative z-10 w-36 h-36 rounded-3xl border-4 cursor-pointer select-none transition-all flex items-center justify-center text-6xl shadow-2xl ${
            isOpenChest
              ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 border-yellow-200 scale-110 rotate-3 ring-8 ring-amber-400/40'
              : 'bg-gradient-to-tr from-amber-800 to-amber-600 border-amber-400 hover:scale-105 animate-bounce'
          }`}
        >
          {isOpenChest ? '🎁✨' : '🧰🔒'}
          {!isOpenChest && (
            <div className="absolute -bottom-3 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
              Tap to Open!
            </div>
          )}
        </div>

        {/* Revealed Rewards */}
        {isOpenChest ? (
          <div className="relative z-10 flex flex-col gap-3 w-full animate-in slide-in-from-bottom duration-500">
            {/* Stars Earned */}
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3].map((starIdx) => (
                <Star
                  key={starIdx}
                  className={`w-8 h-8 transition-all ${
                    starIdx <= starsEarned
                      ? 'text-amber-400 fill-amber-400 animate-bounce'
                      : 'text-slate-700'
                  }`}
                />
              ))}
            </div>

            {/* Rewards Breakdown */}
            <div className="grid grid-cols-2 gap-3 mt-1">
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-amber-500/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-lg">
                  🪙
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase">Eco Coins</span>
                  <p className="font-black text-amber-300 text-lg">+{coinsEarned}</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/80 border border-emerald-500/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-lg">
                  ⚡
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase">Magic XP</span>
                  <p className="font-black text-emerald-300 text-lg">+{xpEarned}</p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Collect & Continue</span>
            </button>
          </div>
        ) : (
          <p className="text-xs text-amber-300/80 font-bold animate-pulse">
            Tap the treasure chest above to claim your rewards!
          </p>
        )}
      </div>
    </div>
  );
};
