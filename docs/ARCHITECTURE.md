# System Architecture - Parallel Worlds

## 1. Architectural Overview
Parallel Worlds follows a component-driven Single Page Application (SPA) architecture utilizing React 19, TypeScript, and Vite. State is managed via React Context Providers (`GameContext`, `AuthContext`) with modular utilities for audio synthesis, particle rendering, and storage persistence.

```
+-----------------------------------------------------------------------+
|                             React 19 SPA                              |
|                                                                       |
|  +--------------------+   +---------------------+  +---------------+  |
|  |    Navbar / HUD    |   | GameRouter (Views)  |  | Audio Synth   |  |
|  +--------------------+   +---------------------+  +---------------+  |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | GameContext (PlayerStats, LevelProgression, AudioSettings)     |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
|  +----------------------+   +------------------+   +---------------+  |
|  | Web Audio API Synth  |   | Particle Canvas  |   | LocalStorage  |  |
|  +----------------------+   +------------------+   +---------------+  |
+-----------------------------------------------------------------------+
```

## 2. Audio Architecture
- **Engine**: Web Audio API (`AudioEngine` singleton)
- **Node Graph**: OscillatorNode -> BiquadFilterNode -> GainNode -> MasterDestination
- **Features**: Procedural birdsong, white noise rain filter, C-pentatonic music chords.

## 3. Graphics & Animation Architecture
- **Canvas Overlay**: HTML5 2D Canvas rendering glowing fireflies, rain drops, blooming pollen.
- **UI Transitions**: `motion` (Motion/React) layout spring animations and modal transitions.
