import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Volume2, VolumeX, Music, CloudRain, Wind, Sparkles, SlidersHorizontal, X } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

export const AudioPlayer: React.FC = () => {
  const { audioSettings, updateAudioSettings } = useGame();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMute = () => {
    updateAudioSettings({ muted: !audioSettings.muted });
  };

  const handleAmbienceChange = (type: 'nature' | 'rain' | 'wind' | 'crystal' | 'none') => {
    updateAudioSettings({ activeAmbience: type });
    audioEngine.setAmbience(type);
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
          className="flex items-center gap-2 px-3 py-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 backdrop-blur-md rounded-full shadow-lg text-slate-200 text-xs font-semibold transition-all hover:scale-105"
        >
          {audioSettings.muted ? (
            <VolumeX className="w-4 h-4 text-red-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
          )}
          <span className="hidden sm:inline">Audio Synthesizer</span>
        </button>
      )}

      {/* Expanded Control Drawer */}
      {isOpen && (
        <div className="w-80 bg-slate-900/95 border border-slate-700/80 backdrop-blur-xl p-5 rounded-2xl shadow-2xl text-slate-100 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Procedural Sound Engine</span>
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

          {/* Volume Sliders */}
          <div className="flex flex-col gap-3 text-xs">
            <div>
              <div className="flex justify-between mb-1 text-slate-400">
                <span>Master Volume</span>
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
                <span>Ambient Music Chords</span>
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

            <div>
              <div className="flex justify-between mb-1 text-slate-400">
                <span>Sound Effects (SFX)</span>
                <span>{Math.round(audioSettings.sfxVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioSettings.sfxVolume}
                onChange={(e) => updateAudioSettings({ sfxVolume: parseFloat(e.target.value) })}
                className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Nature Soundscapes Switcher */}
          <div className="pt-2 border-t border-slate-800">
            <span className="text-xs text-slate-400 block mb-2 font-medium">Environmental Soundscape</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAmbienceChange('nature')}
                className={`flex items-center gap-2 p-2 rounded-lg text-xs font-medium transition-all ${
                  audioSettings.activeAmbience === 'nature'
                    ? 'bg-emerald-600/30 border border-emerald-500 text-emerald-300'
                    : 'bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-white'
                }`}
              >
                <Music className="w-3.5 h-3.5 text-emerald-400" />
                <span>Birds & Wind</span>
              </button>

              <button
                onClick={() => handleAmbienceChange('rain')}
                className={`flex items-center gap-2 p-2 rounded-lg text-xs font-medium transition-all ${
                  audioSettings.activeAmbience === 'rain'
                    ? 'bg-cyan-600/30 border border-cyan-500 text-cyan-300'
                    : 'bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-white'
                }`}
              >
                <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                <span>Soothing Rain</span>
              </button>

              <button
                onClick={() => handleAmbienceChange('wind')}
                className={`flex items-center gap-2 p-2 rounded-lg text-xs font-medium transition-all ${
                  audioSettings.activeAmbience === 'wind'
                    ? 'bg-blue-600/30 border border-blue-500 text-blue-300'
                    : 'bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-white'
                }`}
              >
                <Wind className="w-3.5 h-3.5 text-blue-400" />
                <span>Mountain Wind</span>
              </button>

              <button
                onClick={() => handleAmbienceChange('crystal')}
                className={`flex items-center gap-2 p-2 rounded-lg text-xs font-medium transition-all ${
                  audioSettings.activeAmbience === 'crystal'
                    ? 'bg-purple-600/30 border border-purple-500 text-purple-300'
                    : 'bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Crystal Realm</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
