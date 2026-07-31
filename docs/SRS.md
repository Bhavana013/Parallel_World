# Software Requirements Specification (SRS) - Parallel Worlds

## 1. Introduction
### 1.1 Purpose
This Software Requirements Specification (SRS) describes the functional and non-functional requirements for **Parallel Worlds**, an IIT Gamethon browser-based ecological simulation game.

### 1.2 Scope
Parallel Worlds integrates a dual-world mechanics engine where player actions in a polluted Reality World trigger bioluminescent, magical transformations in a parallel Fantasy Realm across 10 progressive levels.

---

## 2. Functional Requirements
- **FR-01 Dual Viewport**: The application must allow players to observe Reality and Fantasy realms side-by-side or toggle viewports using dimensional portal controls.
- **FR-02 Level Progression Engine**: The application must include 10 sequential levels with varied mechanics (planting, watering, memory match, stream routing, waste sorting, bridge building, animal rescue, sonar scanning, garden design, and maze escape).
- **FR-03 Player Meta Progression**: Player stats must track XP, Coins, Positive Energy, Login Streaks, Fantasy Growth %, and unlocked achievements.
- **FR-04 Web Audio Synthesizer**: The application must programmatically synthesize ambient nature soundscapes (rain, wind, birds), UI clicks, level completion chimes, and portal warp SFX.
- **FR-05 Local & Cloud State Persistence**: Player data must automatically save to `localStorage` and support JSON export/import.

---

## 3. Non-Functional Requirements
- **NFR-01 Performance**: Frame rate during active particle rendering and mini-game interactions must exceed 55 FPS.
- **NFR-02 Responsiveness**: UI must seamlessly scale across desktop, tablet, and mobile viewports.
- **NFR-03 Accessibility**: High-contrast typography and clear UI HUD meters.
