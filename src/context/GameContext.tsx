import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageView, WorldType, PlayerStats, AudioSettings, LevelConfig, Character } from '../types/game';
import { loadGameData, saveGameData, resetGameData } from '../utils/storage';
import { audioEngine } from '../utils/audioEngine';
import initialLevels from '../data/levels.json';
import initialCharacters from '../data/characters.json';
import confetti from 'canvas-confetti';

interface GameContextType {
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  activeWorld: WorldType;
  setActiveWorld: (world: WorldType) => void;
  toggleWorld: () => void;
  playerStats: PlayerStats;
  selectedLevel: LevelConfig | null;
  setSelectedLevel: (level: LevelConfig | null) => void;
  activeCharacter: Character;
  selectCharacter: (charId: string) => void;
  updatePlayerAvatar: (url: string) => void;
  updateUsername: (name: string) => void;
  audioSettings: AudioSettings;
  updateAudioSettings: (newSettings: Partial<AudioSettings>) => void;
  completeLevel: (levelId: number, score: number, stars: number) => void;
  claimAchievement: (achId: string) => void;
  useInventoryItem: (itemId: string) => void;
  resetProgress: () => void;
  triggerConfetti: () => void;
  addNotification: (message: string, type?: 'success' | 'info' | 'reward') => void;
  notifications: { id: string; message: string; type: 'success' | 'info' | 'reward' }[];
  removeNotification: (id: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<PageView>('landing');
  const [activeWorld, setActiveWorld] = useState<WorldType>('reality');
  const [playerStats, setPlayerStats] = useState<PlayerStats>(loadGameData());
  const [selectedLevel, setSelectedLevel] = useState<LevelConfig | null>(initialLevels[0] as any);
  const [notifications, setNotifications] = useState<{ id: string; message: string; type: 'success' | 'info' | 'reward' }[]>([]);

  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    masterVolume: 0.8,
    musicVolume: 0.5,
    sfxVolume: 0.7,
    ambienceVolume: 0.6,
    muted: false,
    activeAmbience: 'nature',
  });

  const baseCharacter = initialCharacters.find(c => c.id === playerStats.characterId) || initialCharacters[0];
  const activeCharacter: Character = {
    ...baseCharacter,
    avatarUrl: playerStats.customAvatarUrl || baseCharacter.avatarUrl,
  };

  useEffect(() => {
    // Auto-save whenever playerStats updates
    saveGameData(playerStats);
  }, [playerStats]);

  const updatePlayerAvatar = (url: string) => {
    setPlayerStats(prev => ({
      ...prev,
      customAvatarUrl: url,
    }));
    audioEngine.playClick();
    addNotification('Profile picture updated from gallery!', 'success');
  };

  const updateUsername = (name: string) => {
    setPlayerStats(prev => ({
      ...prev,
      username: name,
    }));
    addNotification(`Username updated to ${name}!`, 'info');
  };

  useEffect(() => {
    // Sync audio engine volume settings
    audioEngine.setVolumes(
      audioSettings.masterVolume,
      audioSettings.musicVolume,
      audioSettings.sfxVolume,
      audioSettings.muted
    );
  }, [audioSettings]);

  const toggleWorld = () => {
    audioEngine.playPortalWarp();
    const nextWorld = activeWorld === 'reality' ? 'fantasy' : 'reality';
    setActiveWorld(nextWorld);
    addNotification(`Portal Shifted! Entered the ${nextWorld.toUpperCase()} World.`, 'info');
  };

  const selectCharacter = (charId: string) => {
    const found = initialCharacters.find(c => c.id === charId);
    if (!found) return;
    setPlayerStats(prev => ({
      ...prev,
      characterId: charId,
    }));
    audioEngine.playClick();
    addNotification(`Selected ${found.name} (${found.title})!`, 'success');
  };

  const updateAudioSettings = (newSettings: Partial<AudioSettings>) => {
    setAudioSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addNotification = (message: string, type: 'success' | 'info' | 'reward' = 'info') => {
    const id = 'notif_' + Math.random().toString(36).substr(2, 7);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeNotification(id);
    }, 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#06b6d4', '#f59e0b', '#ec4899', '#a855f7'],
    });
  };

  const completeLevel = (levelId: number, score: number, stars: number) => {
    audioEngine.playLevelSuccess();
    triggerConfetti();

    const targetLevel = (initialLevels as LevelConfig[]).find(l => l.id === levelId);
    if (!targetLevel) return;

    setPlayerStats(prev => {
      const currentLevelProg = prev.levelsProgress[levelId] || { stars: 0, highScore: 0, completed: false };
      const newHighScore = Math.max(currentLevelProg.highScore, score);
      const newStars = Math.max(currentLevelProg.stars, stars);

      const nextLevelId = Math.min(10, Math.max(prev.unlockedLevelId, levelId + 1));
      
      const newXp = prev.xp + targetLevel.rewardXP;
      const newLevel = Math.floor(newXp / 500) + 1;
      const newCoins = prev.coins + targetLevel.rewardCoins;
      const newEnergy = prev.positiveEnergy + targetLevel.rewardEnergy;
      const newGrowth = Math.min(100, prev.fantasyGrowthPercentage + targetLevel.growthContribution);

      const updatedProgress = {
        ...prev.levelsProgress,
        [levelId]: {
          stars: newStars,
          highScore: newHighScore,
          completed: true,
        },
      };

      // Check achievement conditions
      const updatedAchievements = prev.achievements.map(ach => {
        if (ach.id === 'ach-1') return { ...ach, unlocked: true, progress: 1 };
        if (ach.id === 'ach-2') {
          const count = Object.values(updatedProgress).filter((p: any) => p.completed).length * 3;
          return { ...ach, progress: Math.min(ach.maxProgress, count), unlocked: count >= ach.maxProgress };
        }
        if (ach.id === 'ach-4') {
          const threeStarCount = Object.values(updatedProgress).filter((p: any) => p.stars === 3).length;
          return { ...ach, progress: Math.min(ach.maxProgress, threeStarCount), unlocked: threeStarCount >= ach.maxProgress };
        }
        if (ach.id === 'ach-6') {
          return { ...ach, progress: newGrowth, unlocked: newGrowth >= 100 };
        }
        return ach;
      });

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        coins: newCoins,
        positiveEnergy: newEnergy,
        fantasyGrowthPercentage: newGrowth,
        unlockedLevelId: nextLevelId,
        levelsProgress: updatedProgress,
        achievements: updatedAchievements,
        totalTasksCompleted: prev.totalTasksCompleted + 1,
      };
    });

    addNotification(`Level ${levelId} Cleared! +${targetLevel.rewardCoins} Coins & +${targetLevel.rewardXP} XP!`, 'reward');

    // If 100% Fantasy Growth reached, unlock completion screen
    if (playerStats.fantasyGrowthPercentage + targetLevel.growthContribution >= 100) {
      setTimeout(() => {
        setActivePage('game-completion');
      }, 1500);
    }
  };

  const claimAchievement = (achId: string) => {
    const ach = playerStats.achievements.find(a => a.id === achId);
    if (!ach || !ach.unlocked) return;

    audioEngine.playAchievementUnlocking();
    triggerConfetti();

    setPlayerStats(prev => ({
      ...prev,
      coins: prev.coins + ach.rewardCoins,
      xp: prev.xp + ach.rewardXP,
      achievements: prev.achievements.map(a => a.id === achId ? { ...a, unlockedAt: new Date().toISOString() } : a)
    }));

    addNotification(`Claimed "${ach.title}"! Rewards: +${ach.rewardCoins} Coins, +${ach.rewardXP} XP`, 'reward');
  };

  const useInventoryItem = (itemId: string) => {
    const item = playerStats.inventory.find(i => i.id === itemId);
    if (!item || item.quantity <= 0) return;

    audioEngine.playPlantSeed();

    setPlayerStats(prev => ({
      ...prev,
      positiveEnergy: prev.positiveEnergy + 25,
      inventory: prev.inventory.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i)
    }));

    addNotification(`Used ${item.name}! ${item.realityEffect}`, 'success');
  };

  const resetProgress = () => {
    const fresh = resetGameData();
    setPlayerStats(fresh);
    addNotification('Game progress has been reset.', 'info');
  };

  return (
    <GameContext.Provider
      value={{
        activePage,
        setActivePage,
        activeWorld,
        setActiveWorld,
        toggleWorld,
        playerStats,
        selectedLevel,
        setSelectedLevel,
        activeCharacter,
        selectCharacter,
        updatePlayerAvatar,
        updateUsername,
        audioSettings,
        updateAudioSettings,
        completeLevel,
        claimAchievement,
        useInventoryItem,
        resetProgress,
        triggerConfetti,
        addNotification,
        notifications,
        removeNotification,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
