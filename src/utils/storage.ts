import { PlayerStats } from '../types/game';
import initialCharacters from '../data/characters.json';
import initialLevels from '../data/levels.json';
import initialItems from '../data/inventoryItems.json';
import initialAchievements from '../data/achievements.json';

const SAVE_KEY = 'parallel_worlds_save_v1';

export function getDefaultPlayerStats(): PlayerStats {
  const levelsProgressMap: Record<number, { stars: number; highScore: number; completed: boolean }> = {};
  initialLevels.forEach((lvl) => {
    levelsProgressMap[lvl.id] = {
      stars: lvl.starsEarned,
      highScore: lvl.highScore,
      completed: lvl.id === 1 ? false : false,
    };
  });

  return {
    id: 'user_' + Math.random().toString(36).substring(2, 9),
    username: 'Eco Champion',
    characterId: initialCharacters[0].id,
    xp: 200,
    level: 1,
    coins: 250,
    positiveEnergy: 100,
    fantasyGrowthPercentage: 10,
    loginStreak: 1,
    lastLoginDate: new Date().toISOString().split('T')[0],
    totalTasksCompleted: 1,
    unlockedLevelId: 1,
    levelsProgress: levelsProgressMap,
    inventory: initialItems as any,
    achievements: initialAchievements as any,
    equippedTitle: 'Novice Guardian',
    createdAt: new Date().toISOString(),
  };
}

export function loadGameData(): PlayerStats {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return getDefaultPlayerStats();
    const parsed = JSON.parse(raw);
    
    // Check login streak
    const today = new Date().toISOString().split('T')[0];
    if (parsed.lastLoginDate !== today) {
      const lastDate = new Date(parsed.lastLoginDate);
      const currDate = new Date(today);
      const diffTime = Math.abs(currDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        parsed.loginStreak += 1;
      } else if (diffDays > 1) {
        parsed.loginStreak = 1;
      }
      parsed.lastLoginDate = today;
      saveGameData(parsed);
    }
    
    return parsed;
  } catch (e) {
    console.error('Failed to load save data from localStorage:', e);
    return getDefaultPlayerStats();
  }
}

export function saveGameData(data: PlayerStats): boolean {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Failed to write save data:', e);
    return false;
  }
}

export function exportSaveFile(data: PlayerStats) {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `parallel_worlds_save_${data.username.replace(/\s+/g, '_')}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importSaveFile(file: File): Promise<PlayerStats> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (parsed && parsed.id && parsed.xp !== undefined) {
          saveGameData(parsed);
          resolve(parsed);
        } else {
          reject(new Error('Invalid save file format'));
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export function resetGameData(): PlayerStats {
  const fresh = getDefaultPlayerStats();
  saveGameData(fresh);
  return fresh;
}
