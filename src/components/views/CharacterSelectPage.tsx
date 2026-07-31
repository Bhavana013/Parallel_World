import React from 'react';
import { useGame } from '../../context/GameContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import initialCharacters from '../../data/characters.json';
import { Check, Sparkles, Shield, Zap, Heart, BookOpen, ArrowRight } from 'lucide-react';

export const CharacterSelectPage: React.FC = () => {
  const { playerStats, selectCharacter, setActivePage } = useGame();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <ParticleCanvas effectOverride="fireflies" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-8">
        
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mx-auto">
            <Sparkles className="w-4 h-4" />
            <span>Eco Guardians Assembly</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">Choose Your Guardian</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Each guardian possesses unique elemental affinities and gameplay perks across Parallel Worlds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialCharacters.map((char) => {
            const isSelected = playerStats.characterId === char.id;

            return (
              <div
                key={char.id}
                onClick={() => selectCharacter(char.id)}
                className={`group relative rounded-3xl overflow-hidden border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-400 bg-slate-900 shadow-2xl shadow-emerald-500/20 ring-4 ring-emerald-500/30 scale-[1.02]'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:scale-105'
                }`}
              >
                {/* Image Header */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={char.avatarUrl}
                    alt={char.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg font-bold">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-slate-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      {char.title}
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-100 mt-1">{char.name}</h3>
                  </div>
                </div>

                {/* Content & Stats */}
                <div className="p-5 flex flex-col gap-4">
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{char.bio}</p>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-emerald-300 font-medium">
                    {char.specialPerk}
                  </div>

                  {/* Stat Bars */}
                  <div className="flex flex-col gap-2 text-[11px]">
                    <div>
                      <div className="flex justify-between text-slate-400 mb-0.5">
                        <span>Nature Magic</span>
                        <span>{char.stats.natureMagic}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${char.stats.natureMagic}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 mb-0.5">
                        <span>Eco Power</span>
                        <span>{char.stats.ecoPower}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${char.stats.ecoPower}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 mb-0.5">
                        <span>Wisdom</span>
                        <span>{char.stats.wisdom}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${char.stats.wisdom}%` }} />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      selectCharacter(char.id);
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {isSelected ? 'Selected Active Hero' : 'Select Guardian'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => setActivePage('dashboard')}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform"
          >
            <span>Proceed to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
