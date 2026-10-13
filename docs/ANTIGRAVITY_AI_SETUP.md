# Parallel Worlds - Antigravity AI Setup Guide

## Overview
This project is configured specifically for **Antigravity AI / AI Studio Build** environments.

---

## Container Environment Rules

1. **Port Constraints**:
   - The dev server **MUST** run on port `3000` and bind to host `0.0.0.0`.
   - Reverse proxy forwards external traffic to `3000`.

2. **Command Workflow**:
   - Install dependencies: `npm install`
   - Launch Dev Server: `npm run dev` (`tsx server.ts`)
   - Build Production: `npm run build`
   - Run Production: `npm start` (`node dist/server.cjs`)

3. **Audio & Web Speech**:
   - Uses Web Audio API and Web Speech API (`window.speechSynthesis`) natively supported across modern chromium containers with no missing external binary file dependencies.

4. **Verification**:
   - `lint_applet` (`tsc --noEmit`) passes cleanly.
   - `compile_applet` (`npm run build`) builds cleanly.
