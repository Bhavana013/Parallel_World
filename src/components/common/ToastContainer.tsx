import React from 'react';
import { useGame } from '../../context/GameContext';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useGame();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.8 }}
            className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all ${
              notif.type === 'reward'
                ? 'bg-gradient-to-r from-amber-950/90 to-yellow-900/90 border-amber-500/50 text-amber-100 shadow-amber-500/20'
                : notif.type === 'success'
                ? 'bg-gradient-to-r from-emerald-950/90 to-teal-900/90 border-emerald-500/50 text-emerald-100 shadow-emerald-500/20'
                : 'bg-gradient-to-r from-slate-900/90 to-cyan-950/90 border-cyan-500/50 text-cyan-100 shadow-cyan-500/20'
            }`}
          >
            {notif.type === 'reward' && <Sparkles className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />}
            {notif.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {notif.type === 'info' && <Info className="w-5 h-5 text-cyan-400 shrink-0" />}

            <span className="text-sm font-medium leading-snug flex-1">{notif.message}</span>

            <button
              onClick={() => removeNotification(notif.id)}
              className="text-white/60 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
