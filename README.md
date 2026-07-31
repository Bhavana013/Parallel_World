# Parallel Worlds - Production-Ready Browser Game (IIT National-Level Gamethon Entry)

**Parallel Worlds** is an interactive browser game built for the **IIT National Gamethon**. The game simulates a cause-and-effect ecological duality: Every positive environmental action performed in a damaged **Reality World** echoes as a bioluminescent transformation in a parallel **Fantasy Realm**.

---

## 🌟 Key Features

1. **Dual-World Viewport & Portal Shift**:
   - Split-screen and toggle views allowing players to observe real-time environmental cause-and-effect.
2. **10 Progressive Level Mechanics**:
   - *Level 1*: Tree Planting & Soil Digging Physics
   - *Level 2*: Hydration & Flower Moisture Spray
   - *Level 3*: Ecosystem Biodiversity Memory Match
   - *Level 4*: Stream Pipe Sludge Flushing Puzzle
   - *Level 5*: Rapid Recycle Waste Drag & Drop Sorting
   - *Level 6*: Ravine Bridge Structural Beam Placement
   - *Level 7*: Poacher Net Untangle & Animal Healing
   - *Level 8*: Subterranean Sonar Radar Treasure Excavation
   - *Level 9*: Community Haven Garden Decoration Grid
   - *Level 10*: Dual-World Phase-Shift Maze Escape
3. **Procedural Web Audio API Synthesizer**:
   - Zero external 404 network dependency. Generates bird chirps, wind, rain, portal whooshes, chimes, and ambient pentatonic chords directly in the browser.
4. **RPG Progression & Meta Systems**:
   - XP, Player Levels, Eco Coins, Positive Energy, Login Streaks, Vault Inventory, Badges, and IIT Gamethon Leaderboard.
5. **Interactive Particle Engine**:
   - HTML5 Canvas particle systems for fireflies, blooming pollen, portal sparks, and rain showers.

---

## 🏗️ Folder Structure

```
├── docs/
│   ├── SRS.md               # Software Requirements Specification
│   ├── ARCHITECTURE.md      # System Architecture
│   ├── DATABASE.md          # Database Design & Security Rules
│   ├── GAMEPLAY.md          # Complete 10-Level Breakdown
│   ├── DEPLOYMENT.md        # Cloud Run & Local Deployment Guide
│   └── PRESENTATION.md      # IIT Gamethon Pitch Slides
├── src/
│   ├── components/
│   │   ├── common/          # Particle Canvas, Audio Player, Toast Notifications
│   │   ├── game/            # Level Arena & 10 Mini-Game Components
│   │   ├── layout/          # Navbar with HUD, Footer
│   │   └── views/           # Landing, Dashboard, Story, Map, Profile, Vault, Ranks
│   ├── context/             # Game & Auth React Context Providers
│   ├── data/                # Characters, Levels, Items, Achievements JSON Data
│   ├── engine/              # Game & World Logic Engines
│   ├── types/               # TypeScript Definitions
│   └── utils/               # Audio Synthesizer, Storage & Particle System
├── public/                  # Assets & Favicon
└── README.md
```

---

## 🚀 Running the Project

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```

3. **Production Build**:
   ```bash
   npm run build
   ```

---

## 👥 Team & Event Credits

- **Event**: IIT National-Level Gamethon
- **Project**: Parallel Worlds
- **Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS, Motion/React, Web Audio API, Canvas.
