# Parallel Worlds - Directory & Folder Structure

```
parallel-worlds/
├── docs/                        # Complete System Documentation
│   ├── ARCHITECTURE.md          # Full-stack architectural overview
│   ├── FOLDER_STRUCTURE.md      # Repository directory mapping
│   ├── API_DOCUMENTATION.md     # REST API specification
│   ├── DATABASE_SCHEMA.md       # Firestore & relational schema models
│   ├── INSTALLATION_GUIDE.md    # Local development setup instructions
│   ├── DEPLOYMENT_GUIDE.md      # Production build & deployment guide
│   └── ANTIGRAVITY_AI_SETUP.md  # Antigravity AI Studio container guide
├── server.ts                    # Full-Stack Express Server Entry Point
├── package.json                 # Dependencies & Build Scripts
├── vite.config.ts               # Vite & Tailwind CSS Configuration
├── tsconfig.json                # TypeScript Compiler Settings
└── src/                         # React Frontend Application
    ├── main.tsx                 # React App Initialization
    ├── App.tsx                  # Main Router & Provider Shell
    ├── index.css                # Global Tailwind CSS Entry Point
    ├── services/                # Backend API Client Services
    │   └── apiService.ts        # REST API endpoints wrapper
    ├── context/                 # React Context Global State
    │   ├── GameContext.tsx      # Player stats & game loop state
    │   └── AuthContext.tsx      # Authentication state
    ├── types/                   # TypeScript Interfaces & Types
    │   └── game.ts              # PlayerStats, Level, Companion interfaces
    ├── utils/                   # Audio & Particle Engines
    │   ├── audioEngine.ts       # Speech Narration & Web Audio Synthesizer
    │   ├── particleEngine.ts    # Magical sparkle & particle physics
    │   └── storage.ts           # LocalStorage persistence & JSON export
    ├── data/                    # Game Seed Data
    │   ├── characters.json      # Guardian characters metadata
    │   ├── levels.json          # 10 Eco level configurations
    │   └── achievements.json    # Unlockable badges & rewards
    └── components/              # Modular UI Components
        ├── cartoon/             # Cartoon Avatars, Motion Rig & Companions
        │   ├── CartoonCharacterAvatar.tsx
        │   ├── CharacterAnimationViewer.tsx
        │   ├── UnlockableCompanions.tsx
        │   └── RewardChestModal.tsx
        ├── common/              # Particle Canvas, Audio Player, Toasts
        ├── layout/              # Navbar & Footer Navigation
        ├── game/                # 10 Mini-game Level Mechanics
        └── views/               # 15 Main Application Page Views
            ├── DashboardPage.tsx
            ├── CharacterSelectPage.tsx
            ├── WorldProgressionView.tsx
            ├── LevelSelectPage.tsx
            ├── GamePlayPage.tsx
            ├── InventoryPage.tsx
            └── SettingsPage.tsx
```
