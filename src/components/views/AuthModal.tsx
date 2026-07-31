import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGame } from '../../context/GameContext';
import { Sparkles, Mail, Lock, User as UserIcon, ArrowRight, ShieldCheck, X } from 'lucide-react';

export const AuthModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { loginEmail, signupEmail, loginGuest } = useAuth();
  const { addNotification } = useGame();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await loginEmail(email, password);
        addNotification(`Welcome back, ${email.split('@')[0]}!`, 'success');
      } else if (mode === 'signup') {
        await signupEmail(email, password, name);
        addNotification(`Account created successfully! Welcome ${name || email}!`, 'success');
      } else {
        addNotification(`Password reset instructions sent to ${email}`, 'info');
      }
      onClose();
    } catch (err: any) {
      addNotification(err.message || 'Authentication error', 'info');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestPlay = () => {
    loginGuest(name || 'Eco Champion');
    addNotification('Logged in as Eco Champion (Guest Mode)', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 flex flex-col gap-6">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-slate-100">
            {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Join Parallel Worlds' : 'Reset Password'}
          </h2>
          <p className="text-xs text-slate-400">
            Save progress across devices & sync with the IIT Gamethon leaderboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === 'signup' && (
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Eco Hero"
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

          {mode !== 'forgot' && (
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
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Login' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800" /></div>
          <span className="relative bg-slate-900 px-3 text-[10px] text-slate-500 uppercase tracking-widest font-semibold">OR</span>
        </div>

        <button
          onClick={handleGuestPlay}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Continue as Guest (Instant Play)</span>
        </button>

        <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800/60">
          {mode === 'login' ? (
            <>
              <button onClick={() => setMode('forgot')} className="hover:text-emerald-400 transition-colors">
                Forgot password?
              </button>
              <button onClick={() => setMode('signup')} className="font-semibold text-emerald-400 hover:underline">
                Sign up
              </button>
            </>
          ) : (
            <button onClick={() => setMode('login')} className="font-semibold text-emerald-400 hover:underline mx-auto">
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
