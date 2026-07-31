export type PageView = 
  | 'landing'
  | 'auth'
  | 'dashboard'
  | 'character-select'
  | 'story-intro'
  | 'world-view'
  | 'level-select'
  | 'gameplay'
  | 'inventory'
  | 'leaderboard'
  | 'profile'
  | 'settings'
  | 'achievements'
  | 'game-completion';

export type WorldType = 'reality' | 'fantasy';

export interface Character {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  bgGradient: string;
  accentColor: string;
  stats: {
    natureMagic: number;
    ecoPower: number;
    stamina: number;
    wisdom: number;
  };
  specialPerk: string;
  bio: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'seed' | 'tool' | 'creature' | 'artifact' | 'potion';
  description: string;
  iconName: string;
  quantity: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  realityEffect: string;
  fantasyTransformation: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  badgeIcon: string;
  category: 'eco' | 'puzzle' | 'mastery' | 'streak';
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  rewardCoins: number;
  rewardXP: number;
}

export interface LevelConfig {
  id: number;
  title: string;
  subtitle: string;
  mechanic: 'tree_planting' | 'watering' | 'memory' | 'puzzle' | 'recycle' | 'bridge' | 'animal_rescue' | 'treasure_hunt' | 'garden_decor' | 'maze';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  realityProblem: string;
  fantasyTransformation: string;
  targetScore: number;
  timeLimit: number; // in seconds
  rewardCoins: number;
  rewardXP: number;
  rewardEnergy: number;
  growthContribution: number; // percentage added to fantasy world growth
  unlocked: boolean;
  starsEarned: number; // 0 to 3
  highScore: number;
  instructions: string[];
}

export interface PlayerStats {
  id: string;
  username: string;
  characterId: string;
  xp: number;
  level: number;
  coins: number;
  positiveEnergy: number;
  fantasyGrowthPercentage: number;
  loginStreak: number;
  lastLoginDate: string;
  totalTasksCompleted: number;
  unlockedLevelId: number;
  levelsProgress: Record<number, { stars: number; highScore: number; completed: boolean }>;
  inventory: InventoryItem[];
  achievements: Achievement[];
  equippedTitle: string;
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  characterName: string;
  level: number;
  xp: number;
  fantasyGrowthPercentage: number;
  positiveEnergy: number;
  badgesCount: number;
  isCurrentUser?: boolean;
}

export interface AudioSettings {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  ambienceVolume: number;
  muted: boolean;
  activeAmbience: 'nature' | 'rain' | 'wind' | 'crystal' | 'none';
}

export interface TransformationEffect {
  id: string;
  levelId: number;
  name: string;
  realityState: string;
  fantasyState: string;
  x: number; // map coordinates percentage 0-100
  y: number;
  active: boolean;
  icon: string;
}
