# Parallel Worlds - Full-Stack Architecture Documentation

## Overview
**Parallel Worlds** is a dual-realm eco-restoration web application built with a full-stack architecture combining a high-performance **Express backend** and a modular **React + Vite frontend**. Real-world environmental actions directly drive ecological transformation across 5 distinct fantasy world stages.

---

## High-Level System Diagram

```
+-----------------------------------------------------------------------+
|                           CLIENT (Browser)                            |
|                                                                       |
|  +---------------------+  +--------------------+  +----------------+  |
|  |  React 19 Frontend  |  | Speech Narration   |  | Web Audio      |  |
|  |  (14 Page Views)    |  | Synthesizer API    |  | Synthesizer    |  |
|  +----------+----------+  +---------+----------+  +-------+--------+  |
|             |                       |                     |           |
+-------------|-----------------------|---------------------|-----------+
              | (REST API Calls)      |                     |
              v                       v                     v
+-----------------------------------------------------------------------+
|                         SERVER (Node.js Container)                    |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  |                 Express 4 REST API Service                      |  |
|  |  - GET /api/health          - GET  /api/player                  |  |
|  |  - POST /api/player/update   - GET  /api/leaderboard             |  |
|  |  - GET /api/companions      - GET  /api/world-stage             |  |
|  +--------------------------------+--------------------------------+  |
|                                   |                                   |
|                                   v                                   |
|  +-----------------------------------------------------------------+  |
|  |                   In-Memory / Storage Engine                    |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

---

## Component Architecture

1. **Frontend Layer**:
   - **Framework**: React 18 / 19 with Vite, TypeScript & Tailwind CSS.
   - **Audio Engine**: Synthesized Flute, Harp, Celesta, and SpeechSynthesis Voice Narration.
   - **Cartoon Motion Rig**: Animated character state choices (`idle`, `walk`, `run`, `jump`, `celebrate`, `sleep`, `think`).
   - **Particle Engine**: High-frequency HTML5 Canvas rendering magical sparkles, fireflies, and blooming pollen.

2. **Backend Service Layer**:
   - **Server**: Express.js server bundled via `esbuild` to `dist/server.cjs`.
   - **Vite Integration**: In development mode, Vite runs as Express middleware (`middlewareMode: true`) listening on port `3000`. In production, Express serves compiled static dist files.
