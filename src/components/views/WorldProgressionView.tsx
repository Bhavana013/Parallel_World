import React, { useState } from 'react';
import { Sparkles, Globe, MapPin, ChevronRight, Eye, Layers, Lock, CheckCircle2, ArrowRight, Trees, Droplets, Flame, Sun, Crown, Flower2, Heart, Waypoints } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';
import { FANTASY_WORLD_CREATIONS } from '../../data/fantasyUnlocks';
import { FantasyWorldCreation } from '../../types/game';

interface WorldProgressionViewProps {
  fantasyGrowthPercentage: number;
  unlockedLevelId?: number;
  onNavigateToLevels: () => void;
}

export interface StageInfo {
  id: number;
  title: string;
  subtitle: string;
  minGrowth: number;
  bgGradient: string;
  elements: string[];
  visualDescription: string;
  npcQuote: string;
  stageColor: string;
}

export const fontStages: StageInfo[] = [
  {
    id: 1,
    title: 'Real World',
    subtitle: 'Grey, Polluted & Lifeless',
    minGrowth: 0,
    bgGradient: 'from-slate-900 via-stone-900 to-zinc-950',
    elements: ['🌫️ Smog Clouds', '🏭 Industrial Exhaust', '🥀 Wilted Stems', '⬛ Oil Slick Stream', '🏚️ Ruined Sheds'],
    visualDescription: 'Dull grey smog chokes the atmosphere. Barren ground covered in litter and toxic sludge.',
    npcQuote: 'Elder Leaf: "The dimensional link is withered... We need mortal eco efforts to awaken the soil!"',
    stageColor: '#64748b',
  },
  {
    id: 2,
    title: 'Nature Awakens',
    subtitle: 'Grass, Flowers & Butterflies',
    minGrowth: 20,
    bgGradient: 'from-emerald-900 via-teal-950 to-slate-950',
    elements: ['🌱 Fresh Sprouts', '🌸 Blooming Petals', '🦋 Fluttering Monarchs', '💧 Clear Water Ripples', '☀️ Sunlight Rays'],
    visualDescription: 'Lush green grass carpets the ground as bioluminescent flowers bloom and butterflies dance.',
    npcQuote: 'Lumi Fairy: "Look! The soil is breathing again! Magical saplings are sprouting everywhere!"',
    stageColor: '#10b981',
  },
  {
    id: 3,
    title: 'Fantasy Village',
    subtitle: 'Colorful Cottages, Rivers & Gardens',
    minGrowth: 40,
    bgGradient: 'from-cyan-900 via-blue-950 to-slate-950',
    elements: ['🏡 Mushroom Cottages', '🌊 Cobble Riverwheel', '🌻 Radiant Gardens', '📜 Trading Posts', '🧝 Friendly Villagers'],
    visualDescription: 'Vibrant fairy-tale cottages line winding cobblestone avenues alongside crystal river waterwheels.',
    npcQuote: 'Mayor Elion: "Welcome traveler! Our village flourishes thanks to your real-world recycling!"',
    stageColor: '#06b6d4',
  },
  {
    id: 4,
    title: 'Fantasy Kingdom',
    subtitle: 'Castles, Waterfalls & Floating Islands',
    minGrowth: 70,
    bgGradient: 'from-indigo-900 via-purple-950 to-slate-950',
    elements: ['🏰 Sapphire Citadel', '🌊 Radiant Waterfalls', '💎 Crystal Caves', '🏝️ Floating Sky Isles', '🐉 Mythical Beasts'],
    visualDescription: 'Majestic crystalline castles soar into the sky flanked by cascading light waterfalls and floating islands.',
    npcQuote: 'Queen Celeste: "The realm is restored to imperial glory! Ancient dragons soar through crystal caverns once more!"',
    stageColor: '#8b5cf6',
  },
  {
    id: 5,
    title: 'Future Fantasy World',
    subtitle: 'Floating Cities, Skyscrapers & Holograms',
    minGrowth: 90,
    bgGradient: 'from-violet-900 via-fuchsia-950 to-slate-950',
    elements: ['🏙️ Sky Skyscrapers', '🌌 Holographic Trees', '🛸 Flying Eco-Transports', '🌺 Neon Bio-Flora', '🌀 Dimensional Portals'],
    visualDescription: 'A pinnacle eco-utopia featuring hyper-advanced levitating crystal towers, neon bio-luminance, and infinite energy portals.',
    npcQuote: 'Arch-Mage Zephyr: "Parallel harmony achieved! Human action and fantasy magic now exist in perpetual balance!"',
    stageColor: '#d946ef',
  },
];

export const WorldProgressionView: React.FC<WorldProgressionViewProps> = ({
  fantasyGrowthPercentage,
  unlockedLevelId = 1,
  onNavigateToLevels,
}) => {
  const [selectedStageId, setSelectedStageId] = useState<number>(() => {
    if (fantasyGrowthPercentage >= 90) return 5;
    if (fantasyGrowthPercentage >= 70) return 4;
    if (fantasyGrowthPercentage >= 40) return 3;
    if (fantasyGrowthPercentage >= 20) return 2;
    return 1;
  });

  const [compareSplit, setCompareSplit] = useState<number>(50);

  const activeStage = fontStages.find((s) => s.id === selectedStageId) || fontStages[0];
  const currentUnlockedStage = fontStages.reduce((acc, s) => (fantasyGrowthPercentage >= s.minGrowth ? s.id : acc), 1);

  const handleStageSelect = (stage: StageInfo) => {
    setSelectedStageId(stage.id);
    audioEngine.playClick();
    audioEngine.speak(`${stage.title}: ${stage.subtitle}`);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-4 sm:p-6 text-slate-100">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-black tracking-wide">5-Stage Fantasy Realm Progression</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-world eco actions transform polluted wasteland into a futuristic fantasy civilization!
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase">Overall World Harmony</span>
            <span className="text-xl font-black text-emerald-400">{fantasyGrowthPercentage}% Restored</span>
          </div>
          <button
            onClick={onNavigateToLevels}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
          >
            <span>Complete Eco Tasks</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5 Stage Timeline Nodes */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {fontStages.map((stage) => {
          const isUnlocked = fantasyGrowthPercentage >= stage.minGrowth;
          const isSelected = selectedStageId === stage.id;

          return (
            <button
              key={stage.id}
              onClick={() => handleStageSelect(stage)}
              className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between gap-2 relative overflow-hidden ${
                isSelected
                  ? 'bg-slate-800 border-emerald-400 ring-2 ring-emerald-500/40 scale-105 shadow-xl'
                  : isUnlocked
                  ? 'bg-slate-900/90 border-slate-700 hover:border-slate-600'
                  : 'bg-slate-950/60 border-slate-900 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-950/80 text-slate-300 border border-slate-800">
                  Stage {stage.id}
                </span>
                {isUnlocked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-slate-600" />
                )}
              </div>

              <div>
                <h3 className="font-extrabold text-xs text-slate-100">{stage.title}</h3>
                <p className="text-[10px] text-slate-400 truncate">{stage.subtitle}</p>
              </div>

              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, ((fantasyGrowthPercentage - stage.minGrowth) / 20) * 100))}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Visual Transformation Canvas Box */}
      <div className={`relative p-6 sm:p-8 rounded-3xl border border-slate-800 bg-gradient-to-b ${activeStage.bgGradient} shadow-2xl overflow-hidden transition-all duration-700 min-h-[360px] flex flex-col justify-between`}>
        
        {/* Stage Header Info */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {activeStage.id === 1 ? '🏭' : activeStage.id === 2 ? '🌸' : activeStage.id === 3 ? '🏡' : activeStage.id === 4 ? '🏰' : '🏙️'}
              </span>
              <h2 className="text-2xl font-black text-slate-100">{activeStage.title}</h2>
            </div>
            <p className="text-xs text-slate-300 mt-1 font-semibold">{activeStage.subtitle}</p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-slate-950/80 border border-slate-700/80 backdrop-blur-md text-xs font-bold text-amber-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Requires {activeStage.minGrowth}% Growth</span>
          </div>
        </div>

        {/* Dynamic Visual Elements Showcase Grid */}
        <div className="relative z-10 my-6">
          <p className="text-xs font-semibold text-slate-300 mb-3">{activeStage.visualDescription}</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {activeStage.elements.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs font-bold text-slate-200 flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
              >
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Before & After Transformation Slider */}
        <div className="relative z-10 p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-400">🏭 Real World (Polluted)</span>
            <span className="text-emerald-400">✨ Stage {activeStage.id} Fantasy Realm</span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={compareSplit}
            onChange={(e) => setCompareSplit(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-300 italic font-medium">
            {activeStage.npcQuote}
          </div>
        </div>
      </div>

      {/* Sequential 10 Creative Fantasy World Additions */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              <h2 className="text-lg font-black text-slate-100">10 Creative Fantasy Realm Creations (Unlocked 1-by-1)</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Complete levels in sequence to awaken magical landmarks into the living fantasy world.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {FANTASY_WORLD_CREATIONS.map((creation) => {
            const isUnlocked = (unlockedLevelId || 1) >= creation.levelId;
            return (
              <div
                key={creation.levelId}
                onClick={() => {
                  if (isUnlocked) {
                    audioEngine.playClick();
                    audioEngine.speakContextual(`${creation.title}. ${creation.description}`, 'fantasy');
                  } else {
                    audioEngine.speakContextual(`Locked landmark. Complete level ${creation.levelId} to awaken!`, 'reality');
                  }
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden group ${
                  isUnlocked
                    ? 'bg-slate-950/80 border-emerald-500/40 hover:border-emerald-400 hover:scale-[1.02] shadow-lg'
                    : 'bg-slate-950/40 border-slate-800/80 opacity-50 grayscale'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300">
                    Lvl {creation.levelId}
                  </span>
                  {isUnlocked ? (
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </div>

                <div className="w-full h-24 rounded-xl overflow-hidden border border-slate-800 relative">
                  <img src={creation.previewUrl} alt={creation.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-slate-950/40" />
                </div>

                <div>
                  <h3 className="font-extrabold text-xs text-slate-100 line-clamp-1">{creation.title}</h3>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">{isUnlocked ? creation.description : `Clear level ${creation.levelId} to unlock`}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
