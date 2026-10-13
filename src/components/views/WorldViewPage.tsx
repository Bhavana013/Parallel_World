import React from 'react';
import { useGame } from '../../context/GameContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { WorldProgressionView } from './WorldProgressionView';

export const WorldViewPage: React.FC = () => {
  const { playerStats, setActivePage, activeWorld } = useGame();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <ParticleCanvas effectOverride={activeWorld === 'fantasy' ? 'blooming_pollen' : 'fireflies'} />

      <div className="relative z-10">
        <WorldProgressionView
          fantasyGrowthPercentage={playerStats.fantasyGrowthPercentage}
          unlockedLevelId={playerStats.unlockedLevelId}
          onNavigateToLevels={() => setActivePage('level-select')}
        />
      </div>
    </div>
  );
};
