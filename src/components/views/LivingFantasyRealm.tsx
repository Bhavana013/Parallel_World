import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { FANTASY_WORLD_CREATIONS } from '../../data/fantasyUnlocks';
import { FantasyWorldCreation } from '../../types/game';
import { audioEngine } from '../../utils/audioEngine';
import { 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  Play, 
  Info, 
  Trees, 
  Droplets, 
  Globe, 
  Flame, 
  Waypoints, 
  Heart, 
  Sun, 
  Flower2, 
  Crown, 
  Music, 
  Moon, 
  SunMedium, 
  Compass,
  Volume2,
  VolumeX,
  X,
  ArrowRight
} from 'lucide-react';

export const LivingFantasyRealm: React.FC = () => {
  const { playerStats, setSelectedLevel, setActivePage, levels } = useGame();
  const unlockedLevel = playerStats.unlockedLevelId || 1;
  const [selectedCreation, setSelectedCreation] = useState<FantasyWorldCreation | null>(null);
  const [skyTheme, setSkyTheme] = useState<'aurora' | 'twilight' | 'sunlight'>('aurora');
  const [isMusicActive, setIsMusicActive] = useState(false);

  const totalUnlocked = FANTASY_WORLD_CREATIONS.filter(c => unlockedLevel >= c.levelId).length;
  const progressPercent = Math.round((totalUnlocked / FANTASY_WORLD_CREATIONS.length) * 100);

  const getCreationIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trees': return <Trees className="w-5 h-5 text-emerald-400" />;
      case 'Droplets': return <Droplets className="w-5 h-5 text-cyan-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-indigo-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Waypoints': return <Waypoints className="w-5 h-5 text-teal-400" />;
      case 'Heart': return <Heart className="w-5 h-5 text-pink-400" />;
      case 'Sun': return <Sun className="w-5 h-5 text-yellow-400" />;
      case 'Flower2': return <Flower2 className="w-5 h-5 text-rose-400" />;
      case 'Crown': return <Crown className="w-5 h-5 text-amber-300 animate-bounce" />;
      default: return <Sparkles className="w-5 h-5 text-emerald-400" />;
    }
  };

  const handleNodeClick = (creation: FantasyWorldCreation) => {
    const isUnlocked = unlockedLevel >= creation.levelId;
    setSelectedCreation(creation);

    if (isUnlocked) {
      audioEngine.playClick();
      audioEngine.speakContextual(
        `Inspecting ${creation.title}. ${creation.description}`,
        'fantasy'
      );
    } else {
      audioEngine.speakContextual(
        `This creation is locked. Complete Level ${creation.levelId} in Reality to add it to your Fantasy World!`,
        'reality'
      );
    }
  };

  const handlePlayLevel = (levelId: number) => {
    const targetLevel = levels.find(l => l.id === levelId);
    if (targetLevel) {
      setSelectedLevel(targetLevel);
      audioEngine.playClick();
      audioEngine.speakContextual(`Launching Level ${levelId}: ${targetLevel.title}`, 'reality');
      setActivePage('gameplay');
    }
  };

  const toggleInstrumentalMusic = () => {
    if (isMusicActive) {
      audioEngine.stopBackgroundMusic();
      setIsMusicActive(false);
    } else {
      audioEngine.startBackgroundMusic();
      setIsMusicActive(true);
      audioEngine.speakContextual('Playing instrumental fantasy background music.', 'fantasy');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      <ParticleCanvas effectOverride={skyTheme === 'aurora' ? 'blooming_pollen' : 'fireflies'} />

      {/* Top Header Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-emerald-500 to-cyan-400 p-0.5 shadow-xl shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Living Fantasy World (Single Landscape Setup)
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                Interactive Realm
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Watch your Fantasy Realm build step-by-step as you complete levels! Click any unlocked landmark to interact.
            </p>
          </div>
        </div>

        {/* Progress & Music Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Progress Indicator */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
            <span className="font-bold text-slate-300">Creations Unlocked:</span>
            <span className="font-black text-emerald-400">{totalUnlocked} / 10</span>
            <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-extrabold text-cyan-400">{progressPercent}%</span>
          </div>

          {/* Sky Atmosphere Switcher */}
          <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setSkyTheme('aurora')}
              className={`p-1.5 rounded-lg transition-colors ${skyTheme === 'aurora' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Aurora Sky Mode"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSkyTheme('twilight')}
              className={`p-1.5 rounded-lg transition-colors ${skyTheme === 'twilight' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Twilight Night Mode"
            >
              <Moon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSkyTheme('sunlight')}
              className={`p-1.5 rounded-lg transition-colors ${skyTheme === 'sunlight' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              title="Sunlight Daylight Mode"
            >
              <SunMedium className="w-4 h-4" />
            </button>
          </div>

          {/* Background Instrumental Music Toggle */}
          <button
            onClick={toggleInstrumentalMusic}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border text-xs font-bold transition-all ${
              isMusicActive
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Music className="w-4 h-4 text-emerald-400 animate-bounce" />
            <span>{isMusicActive ? 'Flute & Harp Active' : 'Play Music'}</span>
          </button>
        </div>
      </div>

      {/* Main Single Landscape Visual Canvas */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Living Fantasy Landscape Container */}
        <div className={`relative w-full min-h-[580px] rounded-3xl border-2 overflow-hidden shadow-2xl transition-all duration-1000 ${
          skyTheme === 'aurora'
            ? 'bg-gradient-to-b from-indigo-950 via-slate-950 to-emerald-950 border-purple-500/40 shadow-purple-900/20'
            : skyTheme === 'twilight'
            ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 border-indigo-500/40'
            : 'bg-gradient-to-b from-sky-900 via-teal-950 to-emerald-950 border-amber-500/40'
        }`}>
          
          {/* Animated Sky Background Layers */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/30 via-emerald-500/10 to-transparent pointer-events-none animate-pulse" />
          
          {/* Mountains & Floating Islands Graphic Silhouette Overlay */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 opacity-25">
            <div className="flex justify-between items-start">
              <div className="w-36 h-20 rounded-full border border-purple-400/40 bg-purple-500/10 blur-sm animate-pulse" />
              <div className="w-48 h-28 rounded-full border border-emerald-400/40 bg-emerald-500/10 blur-md animate-pulse" />
            </div>
            <div className="w-full h-32 bg-gradient-to-t from-emerald-950 to-transparent" />
          </div>

          {/* 10 Interactive Sequential Creations Placed on Map */}
          {FANTASY_WORLD_CREATIONS.map((creation) => {
            const isUnlocked = unlockedLevel >= creation.levelId;
            const isSelected = selectedCreation?.levelId === creation.levelId;

            return (
              <div
                key={creation.levelId}
                style={{
                  left: `${creation.xPercentage}%`,
                  top: `${creation.yPercentage}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
              >
                {/* Node Trigger Button */}
                <button
                  onClick={() => handleNodeClick(creation)}
                  className={`relative flex items-center justify-center rounded-2xl transition-all duration-300 focus:outline-none ${
                    isUnlocked
                      ? isSelected
                        ? 'w-14 h-14 bg-emerald-500 text-slate-950 ring-4 ring-emerald-400/60 scale-125 shadow-2xl shadow-emerald-400'
                        : 'w-12 h-12 bg-slate-900/90 border-2 border-emerald-400 text-emerald-300 hover:scale-110 hover:border-emerald-300 shadow-xl shadow-emerald-500/20'
                      : 'w-10 h-10 bg-slate-950/80 border border-slate-800 text-slate-600 opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  {isUnlocked ? (
                    <>
                      {getCreationIcon(creation.iconName)}
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
                    </>
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </button>

                {/* Level Badge Tag */}
                <div className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold tracking-wider uppercase border shadow-lg transition-all ${
                  isUnlocked
                    ? 'bg-slate-950/90 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-950/80 border-slate-800 text-slate-500'
                }`}>
                  Lvl {creation.levelId}: {creation.title}
                </div>
              </div>
            );
          })}

          {/* Quick Info Drawer / Selected Landmark Details Modal */}
          {selectedCreation && (
            <div className="absolute bottom-6 left-6 right-6 z-30 max-w-2xl mx-auto bg-slate-900/95 border-2 border-emerald-500/60 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-emerald-400 shrink-0 bg-slate-950">
                    <img src={selectedCreation.previewUrl} alt={selectedCreation.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase">
                        Level {selectedCreation.levelId} • {selectedCreation.category}
                      </span>
                      {unlockedLevel >= selectedCreation.levelId ? (
                        <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-bold text-[10px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Unlocked in Realm
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold text-[10px] flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Locked
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-black text-slate-100 mt-1">{selectedCreation.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">{selectedCreation.description}</p>
                    <p className="text-[11px] text-emerald-300/80 italic mt-2 border-l-2 border-emerald-400/40 pl-2">
                      "{selectedCreation.lore}"
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCreation(null)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => {
                    audioEngine.speakContextual(selectedCreation.description, 'fantasy');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Listen to Lore Narration</span>
                </button>

                {unlockedLevel < selectedCreation.levelId && (
                  <button
                    onClick={() => handlePlayLevel(selectedCreation.levelId)}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
                  >
                    <span>Play Level {selectedCreation.levelId} Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 10 Creations Sequential Unlocks Grid List */}
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Complete Catalog of Fantasy World Creations</span>
            </h2>
            <span className="text-xs text-slate-400">Click any card to locate on landscape</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {FANTASY_WORLD_CREATIONS.map((creation) => {
              const isUnlocked = unlockedLevel >= creation.levelId;
              return (
                <div
                  key={creation.levelId}
                  onClick={() => handleNodeClick(creation)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden group ${
                    isUnlocked
                      ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-400 hover:scale-[1.02] shadow-xl'
                      : 'bg-slate-950/60 border-slate-800/80 opacity-60 grayscale'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300">
                      Level {creation.levelId}
                    </span>
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </div>

                  <div className="w-full h-24 rounded-xl overflow-hidden border border-slate-800 relative">
                    <img src={creation.previewUrl} alt={creation.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-slate-950/30" />
                  </div>

                  <div>
                    <h3 className="font-extrabold text-xs text-slate-100 line-clamp-1">{creation.title}</h3>
                    <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">{creation.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
