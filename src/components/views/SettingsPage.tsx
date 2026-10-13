import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { exportSaveFile, importSaveFile } from '../../utils/storage';
import { audioEngine } from '../../utils/audioEngine';
import { Settings, Volume2, Mic, Download, Upload, RotateCcw, VolumeX, Sparkles, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { playerStats, audioSettings, updateAudioSettings, resetProgress, addNotification } = useGame();
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const handleExport = () => {
    exportSaveFile(playerStats);
    audioEngine.playClick();
    addNotification('Save file exported successfully!', 'success');
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await importSaveFile(file);
      window.location.reload();
    } catch (err) {
      addNotification('Failed to import save file format.', 'info');
    }
  };

  const handleVoiceToggle = () => {
    const nextState = !voiceEnabled;
    setVoiceEnabled(nextState);
    audioEngine.toggleVoice(nextState);
    if (nextState) {
      audioEngine.speak('Voice narration enabled for all game actions!');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <ParticleCanvas effectOverride="fireflies" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 backdrop-blur-md">
          <Settings className="w-8 h-8 text-emerald-400" />
          <div>
            <h1 className="text-2xl font-black">Game Configuration & Audio Synthesizer</h1>
            <p className="text-xs text-slate-400">Configure Speech Narration, Web Audio Synthesizer, and save state.</p>
          </div>
        </div>

        {/* Audio & Narration Panel */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col gap-6">
          <h2 className="font-extrabold text-slate-100 text-sm flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-emerald-400" />
            <span>Voice Narration & Enchanting Music Controls</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-100">Voice Narration Engine</h3>
                <p className="text-xs text-slate-400">Unique speech narration for buttons, rewards, level ups, and portals.</p>
              </div>
            </div>

            <button
              onClick={handleVoiceToggle}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                voiceEnabled
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {voiceEnabled ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Narration Active</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Muted</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1 font-semibold">
                <span>Master Synthesizer Volume</span>
                <span>{Math.round(audioSettings.masterVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioSettings.masterVolume}
                onChange={(e) => updateAudioSettings({ masterVolume: parseFloat(e.target.value) })}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1 font-semibold">
                <span>Enchanting Fantasy Background Music (Flute, Harp, Celesta)</span>
                <span>{Math.round(audioSettings.musicVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioSettings.musicVolume}
                onChange={(e) => updateAudioSettings({ musicVolume: parseFloat(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Save File Management */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col gap-4">
          <h3 className="font-extrabold text-slate-100 text-sm">Save Progress & Backup</h3>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Export Save File (JSON)</span>
            </button>

            <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Import Save File</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>

            <button
              onClick={() => {
                audioEngine.playClick();
                resetProgress();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-500 text-red-300 font-bold text-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Game Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
