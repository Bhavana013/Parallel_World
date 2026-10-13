import React, { useState } from 'react';
import { CartoonCharacterAvatar, CharacterAnimationState } from './CartoonCharacterAvatar';
import { audioEngine } from '../../utils/audioEngine';
import { Play, Sparkles, Volume2, Shield, Heart } from 'lucide-react';

interface CharacterAnimationViewerProps {
  characterId: string;
  characterName: string;
  specialPerk: string;
}

export const CharacterAnimationViewer: React.FC<CharacterAnimationViewerProps> = ({
  characterId,
  characterName,
  specialPerk,
}) => {
  const [animState, setAnimState] = useState<CharacterAnimationState>('idle');
  const [speechText, setSpeechText] = useState<string>('Ready to protect the parallel realms!');

  const statesList: { id: CharacterAnimationState; label: string; speech: string }[] = [
    { id: 'idle', label: '🧍 Idle', speech: 'Awaiting your command, Guardian!' },
    { id: 'walk', label: '🚶 Walk', speech: 'Exploring the polluted wasteland...' },
    { id: 'run', label: '🏃 Run', speech: 'Rushing to restore the stream portal!' },
    { id: 'jump', label: '🦘 Jump', speech: 'Leaping across dimensional rift peaks!' },
    { id: 'celebrate', label: '🎉 Celebrate', speech: 'Fantasy Realm growth complete! Woohoo!' },
    { id: 'sleep', label: '😴 Sleep', speech: 'Zzz... Regenerating eco stamina...' },
    { id: 'think', label: '🤔 Think', speech: 'Strategizing optimal recycling routes...' },
  ];

  const handleStateSelect = (state: CharacterAnimationState, text: string) => {
    setAnimState(state);
    setSpeechText(text);
    audioEngine.playClick();
    audioEngine.speak(`${characterName}: ${text}`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md">
      
      {/* Cartoon Avatar & Speech Bubble */}
      <div className="flex flex-col items-center gap-3 shrink-0">
        {/* Cartoon Speech Bubble */}
        <div className="relative px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center max-w-[200px] shadow-lg animate-in zoom-in">
          <span>"{speechText}"</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-emerald-500/40" />
        </div>

        <CartoonCharacterAvatar
          characterId={characterId}
          animationState={animState}
          size="xl"
          showGlow={true}
        />

        <div className="text-center">
          <h3 className="font-black text-slate-100 text-base">{characterName}</h3>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">{animState} State</span>
        </div>
      </div>

      {/* Animation State Selector Controls */}
      <div className="flex flex-col gap-3 flex-1 w-full">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Cartoon Motion Rig States</span>
          </span>
          <span className="text-[11px] text-amber-400 font-semibold">{specialPerk}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {statesList.map((st) => (
            <button
              key={st.id}
              onClick={() => handleStateSelect(st.id, st.speech)}
              className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                animState === st.id
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md scale-105'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{st.label}</span>
              {animState === st.id && <Volume2 className="w-3.5 h-3.5 shrink-0" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
