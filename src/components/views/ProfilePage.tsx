import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useAuth } from '../../context/AuthContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { audioEngine } from '../../utils/audioEngine';
import { 
  User, 
  Upload, 
  Camera, 
  Edit3, 
  Check, 
  Flame, 
  Sparkles, 
  LogOut, 
  Image as ImageIcon 
} from 'lucide-react';

const PRESET_AVATARS = [
  { id: 'pres-1', name: 'Gaia Sage', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
  { id: 'pres-2', name: 'Sol Sentinel', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
  { id: 'pres-3', name: 'Aqua Guardian', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' },
  { id: 'pres-4', name: 'Zephyr Ranger', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80' },
  { id: 'pres-5', name: 'Flora Alchemist', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80' },
  { id: 'pres-6', name: 'Cosmic Warden', url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80' },
];

export const ProfilePage: React.FC = () => {
  const { 
    playerStats, 
    activeCharacter, 
    updatePlayerAvatar, 
    updateUsername, 
    setActivePage,
    addNotification 
  } = useGame();
  const { currentUser, logout } = useAuth();

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(playerStats.username);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          updatePlayerAvatar(reader.result);
          audioEngine.speakContextual('New profile picture loaded from gallery!', 'reality');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (url: string) => {
    updatePlayerAvatar(url);
    audioEngine.speakContextual('Avatar changed from preset gallery.', 'reality');
  };

  const handleSaveName = () => {
    if (nameInput.trim()) {
      updateUsername(nameInput.trim());
      setIsEditingName(false);
      audioEngine.speakContextual(`Guardian name set to ${nameInput}`, 'reality');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <ParticleCanvas effectOverride="fireflies" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Profile Card Header */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center gap-8">
          
          {/* Avatar Container with Upload Overlay */}
          <div className="relative group shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-emerald-400 shadow-2xl bg-slate-950">
              <img src={activeCharacter.avatarUrl} alt={activeCharacter.name} className="w-full h-full object-cover" />
            </div>

            {/* Gallery Upload Label Overlay */}
            <label className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex flex-col items-center justify-center gap-1 cursor-pointer text-xs font-bold text-emerald-400 border-2 border-emerald-400">
              <Camera className="w-6 h-6 animate-bounce" />
              <span>Upload Gallery</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <div className="flex flex-col gap-2 text-center sm:text-left flex-1 w-full">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                {playerStats.equippedTitle}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                {playerStats.loginStreak} Day Streak
              </span>
            </div>

            {/* Editable Username */}
            <div className="flex items-center justify-center sm:justify-start gap-2">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="bg-slate-950 border border-emerald-500/80 rounded-xl px-3 py-1.5 text-lg font-black text-slate-100 focus:outline-none"
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-2 rounded-xl bg-emerald-500 text-slate-950 font-bold"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-100">{playerStats.username}</h1>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-400">{currentUser?.email || 'guest@gamethon.iit.ac.in'}</p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-3 border-t border-slate-800 text-xs">
              
              <label className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold cursor-pointer flex items-center gap-1.5 shadow-md">
                <Upload className="w-4 h-4" />
                <span>Upload Profile Picture (Gallery)</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>

              <button
                onClick={() => setActivePage('character-select')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
              >
                Change Guardian Class
              </button>

              {currentUser && (
                <button
                  onClick={logout}
                  className="px-3 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-300 font-bold flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Preset Avatar Gallery Selection */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col gap-4">
          <h2 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-emerald-400" />
            <span>Preset Avatar Gallery</span>
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {PRESET_AVATARS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.url)}
                className="group relative rounded-2xl overflow-hidden border-2 border-slate-800 hover:border-emerald-400 transition-all focus:outline-none"
              >
                <img src={preset.url} alt={preset.name} className="w-full h-20 object-cover group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-transparent transition-colors" />
                <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold text-center bg-slate-950/80 rounded py-0.5 truncate text-slate-200">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Level</span>
            <span className="text-2xl font-black text-emerald-400">LVL {playerStats.level}</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Total XP</span>
            <span className="text-2xl font-black text-amber-400">{playerStats.xp} XP</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Fantasy Growth</span>
            <span className="text-2xl font-black text-cyan-400">{playerStats.fantasyGrowthPercentage}%</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Badges Earned</span>
            <span className="text-2xl font-black text-purple-400">
              {playerStats.achievements.filter(a => a.unlocked).length} / {playerStats.achievements.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
