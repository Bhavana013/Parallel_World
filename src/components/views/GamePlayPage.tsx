import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { Level1_TreePlanting } from '../game/levels/Level1_TreePlanting';
import { Level2_WateringPlants } from '../game/levels/Level2_WateringPlants';
import { Level3_MemoryMatching } from '../game/levels/Level3_MemoryMatching';
import { Level4_NaturePuzzle } from '../game/levels/Level4_NaturePuzzle';
import { Level5_RecycleSorting } from '../game/levels/Level5_RecycleSorting';
import { Level6_BridgeBuilding } from '../game/levels/Level6_BridgeBuilding';
import { Level7_AnimalRescue } from '../game/levels/Level7_AnimalRescue';
import { Level8_TreasureHunt } from '../game/levels/Level8_TreasureHunt';
import { Level9_GardenDecoration } from '../game/levels/Level9_GardenDecoration';
import { Level10_MazeEscape } from '../game/levels/Level10_MazeEscape';
import { 
  ArrowLeft, 
  Clock, 
  Sparkles, 
  Pause, 
  Play, 
  RotateCcw, 
  Trophy, 
  Star, 
  Coins, 
  Zap, 
  Layers 
} from 'lucide-react';

export const GamePlayPage: React.FC = () => {
  const { selectedLevel, setActivePage, completeLevel, toggleWorld, activeWorld } = useGame();

  const [timeLeft, setTimeLeft] = useState(selectedLevel?.timeLimit || 60);
  const [isPaused, setIsPaused] = useState(false);
  const [winData, setWinData] = useState<{ score: number; stars: number } | null>(null);

  useEffect(() => {
    if (!selectedLevel || isPaused || winData) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedLevel, isPaused, winData]);

  if (!selectedLevel) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-slate-400">No active level selected.</p>
        <button
          onClick={() => setActivePage('level-select')}
          className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
        >
          Select Level from Map
        </button>
      </div>
    );
  }

  const handleLevelWin = (score: number, stars: number) => {
    setWinData({ score, stars });
    completeLevel(selectedLevel.id, score, stars);
  };

  const renderActiveLevelComponent = () => {
    switch (selectedLevel.mechanic) {
      case 'tree_planting':
        return <Level1_TreePlanting onWin={handleLevelWin} />;
      case 'watering':
        return <Level2_WateringPlants onWin={handleLevelWin} />;
      case 'memory':
        return <Level3_MemoryMatching onWin={handleLevelWin} />;
      case 'puzzle':
        return <Level4_NaturePuzzle onWin={handleLevelWin} />;
      case 'recycle':
        return <Level5_RecycleSorting onWin={handleLevelWin} />;
      case 'bridge':
        return <Level6_BridgeBuilding onWin={handleLevelWin} />;
      case 'animal_rescue':
        return <Level7_AnimalRescue onWin={handleLevelWin} />;
      case 'treasure_hunt':
        return <Level8_TreasureHunt onWin={handleLevelWin} />;
      case 'garden_decor':
        return <Level9_GardenDecoration onWin={handleLevelWin} />;
      case 'maze':
        return <Level10_MazeEscape onWin={handleLevelWin} />;
      default:
        return <Level1_TreePlanting onWin={handleLevelWin} />;
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <ParticleCanvas effectOverride={activeWorld === 'fantasy' ? 'blooming_pollen' : 'fireflies'} />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Active Gameplay HUD Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('level-select')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Return to Map"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                LEVEL {selectedLevel.id}: {selectedLevel.difficulty}
              </span>
              <h1 className="text-lg font-extrabold text-slate-100">{selectedLevel.subtitle}</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Countdown Timer */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-bold ${
              timeLeft < 15 ? 'bg-red-950/80 border-red-500 text-red-300 animate-pulse' : 'bg-slate-950 border-slate-800 text-cyan-300'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{timeLeft}s Remaining</span>
            </div>

            {/* Portal Shift */}
            <button
              onClick={toggleWorld}
              className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-500/50 text-purple-300 hover:scale-105 transition-all"
              title="Shift Dimensional View"
            >
              <Layers className="w-5 h-5" />
            </button>

            {/* Pause Toggle */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              {isPaused ? <Play className="w-5 h-5 text-emerald-400" /> : <Pause className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Level Arena Box */}
        <div className="relative rounded-3xl border-2 border-slate-800 bg-slate-900/90 p-6 sm:p-10 backdrop-blur-xl shadow-2xl min-h-[420px] flex items-center justify-center">
          {renderActiveLevelComponent()}
        </div>

        {/* Victory Modal */}
        {winData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in zoom-in">
            <div className="relative w-full max-w-md bg-slate-900 border-2 border-emerald-500 rounded-3xl p-8 shadow-2xl text-slate-100 flex flex-col items-center text-center gap-6">
              
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-xl">
                <Trophy className="w-8 h-8 animate-bounce" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">VICTORY CLEAR!</span>
                <h2 className="text-2xl font-black text-slate-100 mt-1">Level {selectedLevel.id} Restored</h2>
                <p className="text-xs text-slate-400 mt-1">{selectedLevel.fantasyTransformation}</p>
              </div>

              {/* Earned Stars */}
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((s) => (
                  <Star key={s} className="w-8 h-8 text-amber-400 fill-amber-400 animate-pulse" />
                ))}
              </div>

              {/* Rewards */}
              <div className="flex items-center justify-center gap-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 w-full text-xs font-bold">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Coins className="w-4 h-4" />
                  <span>+{selectedLevel.rewardCoins} Coins</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Zap className="w-4 h-4" />
                  <span>+{selectedLevel.rewardXP} XP</span>
                </div>
              </div>

              {/* Next Controls */}
              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={() => {
                    setWinData(null);
                    setActivePage('level-select');
                  }}
                  className="w-1/2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider"
                >
                  Map Overview
                </button>

                <button
                  onClick={() => {
                    setWinData(null);
                    setActivePage('dashboard');
                  }}
                  className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20"
                >
                  Dashboard Hub
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
