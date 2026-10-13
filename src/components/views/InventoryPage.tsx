import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { UnlockableCompanions } from '../cartoon/UnlockableCompanions';
import { audioEngine } from '../../utils/audioEngine';
import { Package, Sprout, Droplets, Dog, Sparkles, FlaskConical, Heart } from 'lucide-react';

export const InventoryPage: React.FC = () => {
  const { playerStats, useInventoryItem, updatePlayerStats } = useGame();
  const [equippedCompanionId, setEquippedCompanionId] = useState<string>('comp-1');

  const renderItemIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout': return <Sprout className="w-8 h-8 text-emerald-400" />;
      case 'Droplets': return <Droplets className="w-8 h-8 text-cyan-400" />;
      case 'Dog': return <Dog className="w-8 h-8 text-amber-400" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8 text-purple-400" />;
      case 'FlaskConical': return <FlaskConical className="w-8 h-8 text-pink-400" />;
      default: return <Package className="w-8 h-8 text-emerald-400" />;
    }
  };

  const handleCompanionEquip = (id: string) => {
    setEquippedCompanionId(id);
    audioEngine.playClick();
    audioEngine.speak('Magical companion equipped!');
  };

  const handleCompanionUnlock = (id: string, cost: number) => {
    if (playerStats.coins >= cost) {
      updatePlayerStats({ coins: playerStats.coins - cost });
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <ParticleCanvas effectOverride="fireflies" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
              <Package className="w-4 h-4" />
              <span>Guardian Vault, Artifacts & Companions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">Eco Storage & Magical Pets</h1>
            <p className="text-xs text-slate-400">
              Manage seeds, tools, magical essence potions, and unlockable companions.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold text-amber-400">
            <span>🪙 Eco Coins: {playerStats.coins}</span>
          </div>
        </div>

        {/* Unlockable Magical Companions Section */}
        <UnlockableCompanions
          equippedId={equippedCompanionId}
          coins={playerStats.coins}
          onEquip={handleCompanionEquip}
          onUnlock={handleCompanionUnlock}
        />

        {/* Item Cards Grid */}
        <div>
          <h2 className="text-xl font-black text-slate-100 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-400" />
            <span>Vault Inventory Items</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {playerStats.inventory.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-col justify-between gap-4 hover:border-emerald-500/50 transition-all shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner">
                    {renderItemIcon(item.iconName)}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400">
                    x{item.quantity} Remaining
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">{item.rarity} {item.category}</span>
                  <h3 className="font-extrabold text-base text-slate-100 mt-0.5">{item.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-emerald-300">
                  <span className="font-bold block text-emerald-400 mb-0.5">Reality Effect:</span>
                  <span>{item.realityEffect}</span>
                </div>

                <button
                  onClick={() => {
                    audioEngine.playPlantSeed();
                    useInventoryItem(item.id);
                  }}
                  disabled={item.quantity <= 0}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-500/20 disabled:opacity-30 transition-all"
                >
                  {item.quantity > 0 ? 'Use Item' : 'Out of Stock'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
