# Parallel Worlds - Production Deployment Guide

## Build & Production Process

The application compiles into a bundled single-file backend (`dist/server.cjs`) and a static SPA client frontend (`dist/index.html` + assets).

---

## Build Pipeline Command

```bash
npm run build
```

This command runs:
1. `vite build`: Compiles all React TypeScript assets into `dist/`.
2. `esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs`: Bundles Express backend TypeScript into standard CommonJS runnable by Node.js natively.

---

## Production Start Command

```bash
npm start
```
Executes `node dist/server.cjs` on port `3000` listening on host `0.0.0.0`.

---

## Dockerfile Example for Cloud Run / Container Deployment

```dockerfile
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

CMD ["npm", "start"]
```
