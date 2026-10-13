import React from 'react';
import { useGame } from '../../context/GameContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import initialCharacters from '../../data/characters.json';
import { Check, Sparkles, Shield, Zap, Heart, BookOpen, ArrowRight } from 'lucide-react';
import { CartoonCharacterAvatar } from '../cartoon/CartoonCharacterAvatar';
import { CharacterAnimationViewer } from '../cartoon/CharacterAnimationViewer';
import { audioEngine } from '../../utils/audioEngine';

export const CharacterSelectPage: React.FC = () => {
  const { playerStats, selectCharacter, setActivePage } = useGame();

  const activeChar = initialCharacters.find(c => c.id === playerStats.characterId) || initialCharacters[0];

  const handleCharSelect = (id: string, name: string) => {
    selectCharacter(id);
    audioEngine.narrateCharacterSelect(name);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <ParticleCanvas effectOverride="fireflies" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mx-auto">
            <Sparkles className="w-4 h-4" />
            <span>Cartoon Eco Guardians Assembly</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">Choose Your Guardian Hero</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Each guardian features full cartoon animation rigs, voice barks, and specialized elemental perks.
          </p>
        </div>

        {/* Character Cards Grid with Cartoon Avatars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialCharacters.map((char) => {
            const isSelected = playerStats.characterId === char.id;

            return (
              <div
                key={char.id}
                onClick={() => handleCharSelect(char.id, char.name)}
                className={`group relative rounded-3xl overflow-hidden border-2 transition-all cursor-pointer flex flex-col justify-between p-5 ${
                  isSelected
                    ? 'border-emerald-400 bg-slate-900 shadow-2xl shadow-emerald-500/20 ring-4 ring-emerald-500/30 scale-[1.02]'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:scale-105'
                }`}
              >
                {/* Cartoon Avatar Header */}
                <div className="flex flex-col items-center gap-3 pt-2">
                  <CartoonCharacterAvatar
                    characterId={char.id}
                    animationState={isSelected ? 'celebrate' : 'idle'}
                    size="xl"
                  />

                  <div className="text-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-slate-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      {char.title}
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-100 mt-2">{char.name}</h3>
                  </div>
                </div>

                {/* Content & Stats */}
                <div className="flex flex-col gap-4 mt-4">
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{char.bio}</p>

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
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCharSelect(char.id, char.name);
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-black'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {isSelected ? 'Active Guardian' : 'Select Hero'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Hero Animation Controller Previewer */}
        <div className="mt-4">
          <CharacterAnimationViewer
            characterId={activeChar.id}
            characterName={activeChar.name}
            specialPerk={activeChar.specialPerk}
          />
        </div>

        <div className="flex justify-center mt-2">
          <button
            onClick={() => {
              audioEngine.narratePlay();
              setActivePage('dashboard');
            }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform"
          >
            <span>Proceed to Game Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
