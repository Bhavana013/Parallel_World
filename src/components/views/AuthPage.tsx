import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGame } from '../../context/GameContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { audioEngine } from '../../utils/audioEngine';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User as UserIcon, 
  ArrowRight, 
  ShieldCheck, 
  Globe2, 
  Trees, 
  Upload, 
  CheckCircle2 
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { loginEmail, signupEmail, loginGuest } = useAuth();
  const { setActivePage, addNotification, updatePlayerAvatar } = useGame();

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCustomAvatar(reader.result);
          addNotification('Custom Avatar selected from gallery!', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    audioEngine.playClick();

    try {
      if (activeTab === 'login') {
        await loginEmail(email, password);
        audioEngine.speakContextual(`Welcome back, ${email.split('@')[0]}!`, 'reality');
        addNotification(`Welcome back to Parallel Worlds!`, 'success');
      } else {
        await signupEmail(email, password, name);
        if (customAvatar && updatePlayerAvatar) {
          updatePlayerAvatar(customAvatar);
        }
        audioEngine.speakContextual(`Account created for ${name || email}!`, 'reality');
        addNotification(`Account created successfully!`, 'success');
      }
      setActivePage('dashboard');
    } catch (err: any) {
      addNotification(err.message || 'Authentication failed', 'info');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestPlay = () => {
    audioEngine.playClick();
    loginGuest(name || 'Eco Hero');
    if (customAvatar && updatePlayerAvatar) {
      updatePlayerAvatar(customAvatar);
    }
    audioEngine.speakContextual('Continuing as Guest Eco Guardian.', 'reality');
    addNotification('Playing as Eco Guardian (Guest Mode)', 'success');
    setActivePage('dashboard');
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-12 flex items-center justify-center overflow-hidden">
      <ParticleCanvas effectOverride="fireflies" />

      {/* Main Glassmorphism Auth Container */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
        
        {/* Left Side: Fantasy World Narrative Banner */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-slate-950 to-cyan-950/80 border border-emerald-500/30">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-xs w-fit">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>IIT GAMETHON 2026 OFFICIAL EDITION</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Restore Reality, <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Awaken Fantasy
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every real-world environmental action sequentially transforms 5 stages of the fantasy realm. Unlock magical crystal waterfalls, sky islands, and mythical dragons step-by-step!
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-800/80 pt-6">
            <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Dual World Realm Switching & Reality Transformation</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Context-Aware Speech Narration & Web Audio Synthesizer</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Sequential 10-Level Creative Fantasy World Unlocks</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login / Sign Up Form */}
        <div className="lg:col-span-6 flex flex-col justify-center gap-6">
          
          {/* Tab Switcher */}
          <div className="flex items-center p-1.5 bg-slate-950 rounded-2xl border border-slate-800">
            <button
              onClick={() => {
                audioEngine.playClick();
                setActiveTab('login');
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'login'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                audioEngine.playClick();
                setActiveTab('signup');
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'signup'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {activeTab === 'signup' && (
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Guardian Hero Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav EcoGuardian"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hero@iit.ac.in"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Upload Custom Avatar Option */}
            {activeTab === 'signup' && (
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 overflow-hidden border border-slate-700 shrink-0 flex items-center justify-center">
                    {customAvatar ? (
                      <img src={customAvatar} alt="Custom Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-200 block">Custom Avatar (Gallery)</span>
                    <span className="text-[10px] text-slate-400">Upload profile image from device gallery</span>
                  </div>
                </div>

                <label className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer flex items-center gap-1.5 shrink-0">
                  <Upload className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Browse</span>
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs tracking-wider uppercase shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? 'Processing...' : activeTab === 'login' ? 'Sign In & Play' : 'Create Account & Begin'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800" /></div>
            <span className="relative bg-slate-900 px-3 text-[10px] text-slate-500 uppercase tracking-widest font-bold">OR</span>
          </div>

          <button
            onClick={handleGuestPlay}
            className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Continue as Guest (Instant Play Mode)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
