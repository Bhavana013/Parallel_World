import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// --- Mock Database / In-Memory Store for API Endpoints ---
let playerStore = {
  id: 'player-iit-2026',
  username: 'Aarav EcoGuardian',
  characterId: 'char-1',
  xp: 1450,
  level: 4,
  coins: 850,
  positiveEnergy: 320,
  fantasyGrowthPercentage: 45,
  loginStreak: 5,
  lastLoginDate: new Date().toISOString().split('T')[0],
  totalTasksCompleted: 12,
  unlockedLevelId: 5,
  equippedTitle: 'Novice Planeteer',
  companionId: 'comp-1'
};

const leaderboardStore = [
  { rank: 1, username: 'Ananya (IIT Bombay)', characterName: 'Aria Tidecaller', level: 10, xp: 9800, fantasyGrowthPercentage: 100, positiveEnergy: 2400, badgesCount: 6 },
  { rank: 2, username: 'Rohan (IIT Delhi)', characterName: 'Zephyr Sunflare', level: 9, xp: 8400, fantasyGrowthPercentage: 92, positiveEnergy: 1950, badgesCount: 5 },
  { rank: 3, username: 'Aarav EcoGuardian (You)', characterName: 'Kaelen Emberleaf', level: 4, xp: 1450, fantasyGrowthPercentage: 45, positiveEnergy: 320, badgesCount: 3, isCurrentUser: true },
  { rank: 4, username: 'Priya (IIT Madras)', characterName: 'Silvan Shadowmoss', level: 3, xp: 1100, fantasyGrowthPercentage: 35, positiveEnergy: 280, badgesCount: 2 },
  { rank: 5, username: 'Vikram (IIT Kharagpur)', characterName: 'Kaelen Emberleaf', level: 2, xp: 750, fantasyGrowthPercentage: 20, positiveEnergy: 150, badgesCount: 1 }
];

const companionsStore = [
  { id: 'comp-1', name: 'Lumi', species: 'Fairy', rarity: 'Rare', perk: 'Sparkle Burst: +15% XP Gain', unlocked: true, level: 2, avatarSvg: 'fairy' },
  { id: 'comp-2', name: 'Aurelius', species: 'Fox', rarity: 'Epic', perk: 'Flame Dash: Unearths extra seeds', unlocked: true, level: 1, avatarSvg: 'fox' },
  { id: 'comp-3', name: 'Strix', species: 'Owl', rarity: 'Rare', perk: 'Wisdom Gaze: Highlights puzzle hints', unlocked: false, level: 1, avatarSvg: 'owl' },
  { id: 'comp-4', name: 'Ignis', species: 'Dragon', rarity: 'Legendary', perk: 'Ember Flare: Clears smog barriers', unlocked: false, level: 1, avatarSvg: 'dragon' },
  { id: 'comp-5', name: 'Solaria', species: 'Phoenix', rarity: 'Legendary', perk: 'Rebirth Pulse: Daily quest instant clear', unlocked: false, level: 1, avatarSvg: 'phoenix' }
];

// --- API Routes ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'Parallel Worlds Express Server', timestamp: new Date().toISOString() });
});

app.get('/api/player', (req, res) => {
  res.json({ success: true, player: playerStore });
});

app.post('/api/player/update', (req, res) => {
  const updates = req.body;
  playerStore = { ...playerStore, ...updates };
  res.json({ success: true, player: playerStore });
});

app.get('/api/leaderboard', (req, res) => {
  res.json({ success: true, leaderboard: leaderboardStore });
});

app.get('/api/companions', (req, res) => {
  res.json({ success: true, companions: companionsStore });
});

app.get('/api/world-stage', (req, res) => {
  const growth = playerStore.fantasyGrowthPercentage;
  let stage = 1;
  let title = 'Stage 1: Real World (Polluted & Grey)';
  let description = 'The earth is scorched, covered in dark smog and oil-slick streams.';

  if (growth >= 81) {
    stage = 5;
    title = 'Stage 5: Future Fantasy World';
    description = 'Floating sky cities, crystal skyscrapers, glowing holographic trees, and futuristic fantasy civilization!';
  } else if (growth >= 51) {
    stage = 4;
    title = 'Stage 4: Fantasy Kingdom';
    description = 'Majestic grand castles, roaring light waterfalls, crystal caverns, and soaring floating islands.';
  } else if (growth >= 21) {
    stage = 3;
    title = 'Stage 3: Fantasy Village';
    description = 'Vibrant fairy cottages, winding cobble paths, river waterwheels, and friendly local NPCs.';
  } else if (growth >= 1) {
    stage = 2;
    title = 'Stage 2: Nature Awakens';
    description = 'Lush green grass sprouts, blooming bioluminescent flowers, and fluttering butterflies.';
  }

  res.json({ success: true, growthPercentage: growth, stage, title, description });
});

// --- Server & Vite Setup ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Parallel Worlds Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
