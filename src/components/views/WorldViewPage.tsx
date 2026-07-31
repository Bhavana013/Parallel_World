import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { Sparkles, Layers, ShieldAlert, ArrowRight, TreePine, Droplet, Sun, Wind, Eye } from 'lucide-react';
import levelsData from '../../data/levels.json';

export const WorldViewPage: React.FC = () => {
  const { playerStats, activeWorld, toggleWorld, setActivePage, setSelectedLevel } = useGame();
  const [viewMode, setViewMode] = useState<'toggle' | 'split'>('split');

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <ParticleCanvas effectOverride={activeWorld === 'fantasy' ? 'blooming_pollen' : 'fireflies'} />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 sm:p-6 rounded-3xl border border-slate-800 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Dimensional Telemetry</span>
            </div>
            <h1 className="text-2xl font-black">Parallel World Dual Viewport</h1>
            <p className="text-xs text-slate-400">
              Observe real-time ecological transformations triggered by completed level quests.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Switch */}
            <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  viewMode === 'split' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Split Screen
              </button>
              <button
                onClick={() => setViewMode('toggle')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  viewMode === 'toggle' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Single World
              </button>
            </div>

            {/* Portal Switch Button */}
            <button
              onClick={toggleWorld}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs shadow-lg shadow-purple-500/20 hover:scale-105 transition-all"
            >
              <Layers className="w-4 h-4" />
              <span>Shift Portal View</span>
            </button>
          </div>
        </div>

        {/* Viewport Display Area */}
        {viewMode === 'split' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* REALITY WORLD VIEWPORT */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-red-500/30 bg-slate-900 shadow-2xl flex flex-col">
              <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80"
                  alt="Reality World Damaged"
                  className="w-full h-full object-cover filter grayscale contrast-125 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-red-500/40 text-red-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>REALITY WORLD (RESTORED: {playerStats.totalTasksCompleted * 10}%)</span>
                </div>
              </div>

              <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col gap-3">
                <h3 className="font-bold text-slate-200 text-sm">Active Reality Interventions:</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {levelsData.slice(0, 4).map((lvl) => {
                    const isDone = lvl.id <= playerStats.unlockedLevelId - 1;
                    return (
                      <div key={lvl.id} className={`p-2.5 rounded-xl border ${isDone ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300' : 'border-slate-800 bg-slate-900 text-slate-500'}`}>
                        <div className="font-bold text-[11px]">{lvl.subtitle}</div>
                        <div className="text-[10px] opacity-80">{isDone ? 'Completed' : 'Pending Restoration'}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* FANTASY WORLD VIEWPORT */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/40 bg-slate-900 shadow-2xl flex flex-col">
              <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80"
                  alt="Fantasy World Transformed"
                  className="w-full h-full object-cover filter saturate-150 brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-emerald-500/40 text-emerald-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>FANTASY REALM (GROWTH: {playerStats.fantasyGrowthPercentage}%)</span>
                </div>
              </div>

              <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col gap-3">
                <h3 className="font-bold text-slate-200 text-sm">Evolved Fantasy Manifestations:</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {levelsData.slice(0, 4).map((lvl) => {
                    const isDone = lvl.id <= playerStats.unlockedLevelId - 1;
                    return (
                      <div key={lvl.id} className={`p-2.5 rounded-xl border ${isDone ? 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300' : 'border-slate-800 bg-slate-900 text-slate-500'}`}>
                        <div className="font-bold text-[11px]">{lvl.fantasyTransformation.split(' ')[0]} {lvl.fantasyTransformation.split(' ')[1]}</div>
                        <div className="text-[10px] opacity-80">{isDone ? 'Evolved' : 'Dormant Seed'}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Single Viewport Mode */
          <div className="relative rounded-3xl overflow-hidden border-2 border-slate-700 bg-slate-900 shadow-2xl h-[480px] w-full">
            <img
              src={
                activeWorld === 'fantasy'
                  ? "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
                  : "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"
              }
              alt="Active World View"
              className="w-full h-full object-cover filter saturate-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-slate-950/90 border border-slate-800 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {activeWorld.toUpperCase()} REALM VIEW
                </span>
                <h2 className="text-xl font-bold text-slate-100">
                  {activeWorld === 'fantasy' ? "Bioluminescent Crystal Canopy" : "Polluted Urban Wasteland"}
                </h2>
              </div>
              <button
                onClick={() => setActivePage('level-select')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20"
              >
                Go To Level Map
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
