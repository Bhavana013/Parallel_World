import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Volume2, VolumeX, Music, Mic, SlidersHorizontal, X, Sparkles } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

export const AudioPlayer: React.FC = () => {
  const { audioSettings, updateAudioSettings } = useGame();
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);

  const toggleMute = () => {
    updateAudioSettings({ muted: !audioSettings.muted });
  };

  const handleToggleMusic = () => {
    if (isMusicPlaying) {
      audioEngine.stopBackgroundMusic();
      setIsMusicPlaying(false);
    } else {
      audioEngine.startBackgroundMusic();
      setIsMusicPlaying(true);
    }
  };

  const handleToggleVoice = () => {
    const nextState = !voiceOn;
    setVoiceOn(nextState);
    audioEngine.toggleVoice(nextState);
    if (nextState) {
      audioEngine.speak('Speech Narration Active!');
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Mini Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => {
            audioEngine.init();
            setIsOpen(true);
          }}
          className="flex items-center gap-2 px-3.5 py-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 backdrop-blur-md rounded-full shadow-xl text-slate-200 text-xs font-semibold transition-all hover:scale-105"
        >
          {audioSettings.muted ? (
            <VolumeX className="w-4 h-4 text-red-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
          )}
          <span className="hidden sm:inline">Fantasy Audio & Voice</span>
        </button>
      )}

      {/* Expanded Control Drawer */}
      {isOpen && (
        <div className="w-80 bg-slate-900/95 border border-slate-700/80 backdrop-blur-xl p-5 rounded-2xl shadow-2xl text-slate-100 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Enchanting Audio Synthesizer</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title={audioSettings.muted ? "Unmute" : "Mute"}
              >
                {audioSettings.muted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Action Toggles */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleToggleMusic}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                isMusicPlaying
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <Music className="w-4 h-4 text-emerald-400" />
              <span>{isMusicPlaying ? 'Pause Music' : 'Play Music'}</span>
            </button>

            <button
              onClick={handleToggleVoice}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                voiceOn
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <Mic className="w-4 h-4 text-cyan-400" />
              <span>{voiceOn ? 'Voice On' : 'Voice Off'}</span>
            </button>
          </div>

          {/* Volume Sliders */}
          <div className="flex flex-col gap-3 text-xs">
            <div>
              <div className="flex justify-between mb-1 text-slate-400">
                <span>Master Synthesizer</span>
                <span>{Math.round(audioSettings.masterVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioSettings.masterVolume}
                onChange={(e) => updateAudioSettings({ masterVolume: parseFloat(e.target.value) })}
                className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-slate-400">
                <span>Fantasy Background Music (Flute, Harp, Celesta)</span>
                <span>{Math.round(audioSettings.musicVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioSettings.musicVolume}
                onChange={(e) => updateAudioSettings({ musicVolume: parseFloat(e.target.value) })}
                className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
