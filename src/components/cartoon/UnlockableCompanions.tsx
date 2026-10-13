import React, { useState } from 'react';
import { Sparkles, Heart, Zap, Lock, CheckCircle, ShieldAlert } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

export interface Companion {
  id: string;
  name: string;
  species: 'Fairy' | 'Fox' | 'Owl' | 'Dragon' | 'Phoenix';
  rarity: 'Rare' | 'Epic' | 'Legendary';
  perk: string;
  unlocked: boolean;
  level: number;
  avatarSvg: string;
  voiceBark: string;
}

interface UnlockableCompanionsProps {
  equippedId: string;
  coins: number;
  onEquip: (id: string) => void;
  onUnlock: (id: string, cost: number) => void;
}

export const INITIAL_COMPANIONS: Companion[] = [
  {
    id: 'comp-1',
    name: 'Lumi',
    species: 'Fairy',
    rarity: 'Rare',
    perk: 'Sparkle Burst: +15% XP on all completed eco tasks.',
    unlocked: true,
    level: 2,
    avatarSvg: '🧚‍♀️',
    voiceBark: 'Lumi sparkles! Ready to illuminate your path!',
  },
  {
    id: 'comp-2',
    name: 'Aurelius',
    species: 'Fox',
    rarity: 'Epic',
    perk: 'Flame Dash: Unearths extra rare seeds and +20 coins.',
    unlocked: true,
    level: 1,
    avatarSvg: '🦊',
    voiceBark: 'Aurelius yips happily! Sniffing out hidden treasures!',
  },
  {
    id: 'comp-3',
    name: 'Strix',
    species: 'Owl',
    rarity: 'Rare',
    perk: 'Wisdom Gaze: Highlights hint tiles during puzzle levels.',
    unlocked: false,
    level: 1,
    avatarSvg: '🦉',
    voiceBark: 'Strix hoots wisely! Knowledge is the ultimate power.',
  },
  {
    id: 'comp-4',
    name: 'Ignis',
    species: 'Dragon',
    rarity: 'Legendary',
    perk: 'Ember Flare: Banishes smog barriers in Fantasy World.',
    unlocked: false,
    level: 1,
    avatarSvg: '🐉',
    voiceBark: 'Ignis roars with friendly dragon warmth!',
  },
  {
    id: 'comp-5',
    name: 'Solaria',
    species: 'Phoenix',
    rarity: 'Legendary',
    perk: 'Rebirth Pulse: Instantly grants +50 Positive Energy daily.',
    unlocked: false,
    level: 1,
    avatarSvg: '🦅',
    voiceBark: 'Solaria screeches majestically! Celestial energy re-ignited!',
  },
];

export const UnlockableCompanions: React.FC<UnlockableCompanionsProps> = ({
  equippedId,
  coins,
  onEquip,
  onUnlock,
}) => {
  const [companions, setCompanions] = useState<Companion[]>(INITIAL_COMPANIONS);
  const [activePetId, setActivePetId] = useState<string | null>(null);

  const handlePet = (comp: Companion) => {
    setActivePetId(comp.id);
    audioEngine.playAchievementUnlocking();
    audioEngine.speak(comp.voiceBark);
    setTimeout(() => setActivePetId(null), 1500);
  };

  const handleUnlockClick = (comp: Companion) => {
    const cost = comp.rarity === 'Legendary' ? 500 : 300;
    if (coins < cost) {
      audioEngine.playClick();
      audioEngine.speak(`Need ${cost} Eco Coins to unlock ${comp.name}!`);
      return;
    }
    setCompanions((prev) =>
      prev.map((c) => (c.id === comp.id ? { ...c, unlocked: true } : c))
    );
    onUnlock(comp.id, cost);
    audioEngine.narrateCompanionUnlock(comp.name);
  };

  return (
    <div className="flex flex-col gap-5 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-100 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span>Unlockable Magical Companions</span>
          </h2>
          <p className="text-xs text-slate-400">
            Choose a companion to accompany your Guardian Hero across parallel realms.
          </p>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-xs flex items-center gap-1.5">
          <span>🪙 {coins} Eco Coins</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companions.map((comp) => {
          const isEquipped = equippedId === comp.id;
          const isPetting = activePetId === comp.id;
          const unlockCost = comp.rarity === 'Legendary' ? 500 : 300;

          return (
            <div
              key={comp.id}
              className={`relative p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                isEquipped
                  ? 'bg-emerald-950/60 border-emerald-500/80 shadow-lg shadow-emerald-900/30'
                  : comp.unlocked
                  ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/40 border-slate-900 opacity-80'
              }`}
            >
              {/* Petting heart indicator */}
              {isPetting && (
                <div className="absolute top-2 right-2 animate-ping text-pink-500">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
              )}

              <div className="flex items-start gap-3">
                <div
                  onClick={() => comp.unlocked && handlePet(comp)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl cursor-pointer select-none transition-transform ${
                    isPetting ? 'scale-125 rotate-12' : 'hover:scale-110'
                  } ${
                    comp.rarity === 'Legendary'
                      ? 'bg-gradient-to-tr from-amber-600 to-rose-600'
                      : comp.rarity === 'Epic'
                      ? 'bg-gradient-to-tr from-purple-600 to-fuchsia-600'
                      : 'bg-gradient-to-tr from-teal-600 to-emerald-600'
                  }`}
                >
                  {comp.avatarSvg}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-100 text-sm">{comp.name}</h3>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                        comp.rarity === 'Legendary'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : comp.rarity === 'Epic'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          : 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      }`}
                    >
                      {comp.rarity}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{comp.species} • Lvl {comp.level}</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-emerald-300 font-semibold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{comp.perk}</span>
              </div>

              <div className="pt-1 flex items-center gap-2">
                {comp.unlocked ? (
                  <>
                    <button
                      onClick={() => handlePet(comp)}
                      className="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/40 text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <Heart className="w-3.5 h-3.5 fill-pink-400" />
                      <span>Pet</span>
                    </button>

                    <button
                      onClick={() => onEquip(comp.id)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
                        isEquipped
                          ? 'bg-emerald-500 text-slate-950 font-black'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      {isEquipped ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Equipped</span>
                        </>
                      ) : (
                        <span>Equip Companion</span>
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleUnlockClick(comp)}
                    className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Unlock for 🪙 {unlockCost} Coins</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
