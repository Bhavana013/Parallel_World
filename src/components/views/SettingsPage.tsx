import React from 'react';
import { useGame } from '../../context/GameContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { exportSaveFile, importSaveFile } from '../../utils/storage';
import { Settings, Sliders, Download, Upload, RotateCcw, Volume2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { playerStats, audioSettings, updateAudioSettings, resetProgress, addNotification } = useGame();

  const handleExport = () => {
    exportSaveFile(playerStats);
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

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <ParticleCanvas effectOverride="fireflies" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-8">
        
        <div className="flex items-center gap-3 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 backdrop-blur-md">
          <Settings className="w-8 h-8 text-emerald-400" />
          <div>
            <h1 className="text-2xl font-black">Game Configuration & Save Data</h1>
            <p className="text-xs text-slate-400">Manage audio synthesizer, save slots, and controls.</p>
          </div>
        </div>

        {/* Save File Management */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col gap-4">
          <h3 className="font-extrabold text-slate-100 text-sm">Save Progress & IIT Gamethon Backup</h3>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
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
              onClick={resetProgress}
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
