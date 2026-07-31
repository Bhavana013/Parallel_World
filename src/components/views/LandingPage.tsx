import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Play, 
  Layers, 
  TreePine, 
  Droplet, 
  Recycle, 
  Trophy, 
  ShieldAlert, 
  ArrowRight,
  Flame,
  Award,
  BookOpen
} from 'lucide-react';
import levelsData from '../../data/levels.json';

export const LandingPage: React.FC = () => {
  const { setActivePage, toggleWorld, activeWorld } = useGame();
  const [sliderPos, setSliderPos] = useState<number>(50);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden flex flex-col justify-between">
      {/* Background Particle Canvas */}
      <ParticleCanvas effectOverride="fireflies" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
        
        {/* Event Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-lg shadow-emerald-500/10"
        >
          <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
          <span>IIT National Gamethon Flagship Entry</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight max-w-4xl mx-auto leading-tight mb-6"
        >
          Every Real Action Echoes in the <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            PARALLEL FANTASY REALM
          </span>
        </motion.h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          Wake up in a damaged Reality World. Step through magical portals and solve 10 eco-transformation challenges to evolve a breathtaking, bioluminescent Fantasy Realm.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => setActivePage('story-intro')}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>PLAY GAME & STORY</span>
          </button>

          <button
            onClick={() => setActivePage('level-select')}
            className="flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-bold text-base backdrop-blur-md hover:scale-105 transition-all"
          >
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>EXPLORE 10 LEVELS</span>
          </button>
        </div>

        {/* Interactive Dual-World Split Comparison Slider */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-slate-900 group">
          <div className="relative h-[380px] sm:h-[480px] w-full select-none">
            
            {/* Reality Side (Background Left) */}
            <div className="absolute inset-0 bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"
                alt="Reality World Damaged"
                className="w-full h-full object-cover filter grayscale contrast-125 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute top-6 left-6 bg-slate-950/90 backdrop-blur-md px-4 py-2 rounded-xl border border-red-500/40 text-red-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>REALITY: POLLUTED & BARREN</span>
              </div>
            </div>

            {/* Fantasy Side (Clipped Right) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
            >
              <img
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
                alt="Fantasy World Transformed"
                className="w-full h-full object-cover filter saturate-150 brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute top-6 right-6 bg-slate-950/90 backdrop-blur-md px-4 py-2 rounded-xl border border-emerald-500/40 text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span>FANTASY: CRYSTAL PARADISE</span>
              </div>
            </div>

            {/* Interactive Slider Bar Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 via-cyan-400 to-purple-500 cursor-ew-resize z-20 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.8)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-9 h-9 rounded-full bg-slate-900 border-2 border-cyan-400 shadow-xl flex items-center justify-center text-cyan-400 font-extrabold text-xs">
                ↔
              </div>
            </div>

            {/* Hidden Input Range overlay for touch & mouse dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
            />
          </div>

          <div className="p-4 bg-slate-900/90 backdrop-blur-md text-xs text-slate-400 flex items-center justify-between border-t border-slate-800">
            <span>Drag slider horizontally to preview reality vs fantasy transformation</span>
            <span className="font-semibold text-emerald-400">100% Dynamic Evolution Engine</span>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/60">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-2">
            Game Features & IIT Gamethon Innovation
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Combining engaging mini-game physics with cause-and-effect ecological storytelling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-col gap-3 hover:border-emerald-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              <TreePine className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-100">10 Mini-Game Levels</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              From Soil Planting and Water Stream Puzzles to Bridge Building and Dual-World Maze Escapes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-col gap-3 hover:border-cyan-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-100">Visible Realm Growth</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Every completed quest increases Fantasy Growth % from 0% to 100%, unlocking bioluminescent flora and creatures.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-col gap-3 hover:border-amber-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-100">XP, Badges & Leaderboard</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Compete on the IIT Gamethon leaderboard, unlock eco titles, collect rare vault artifacts, and maintain daily login streaks.
            </p>
          </div>
        </div>
      </section>

      {/* Levels Showcase Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-800/60">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Progressive Level Map</h2>
            <p className="text-slate-400 text-xs">Unlock 10 unique mechanics as you restore the dimensional equilibrium.</p>
          </div>
          <button
            onClick={() => setActivePage('level-select')}
            className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-bold transition-all"
          >
            <span>View Full Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {levelsData.map((lvl) => (
            <div 
              key={lvl.id}
              onClick={() => setActivePage('level-select')}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/60 cursor-pointer transition-all hover:scale-105 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                <span>LVL {lvl.id}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">{lvl.difficulty}</span>
              </div>
              <h4 className="font-semibold text-sm text-slate-200 line-clamp-1">{lvl.subtitle}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">{lvl.fantasyTransformation}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
