# Deployment Guide - Parallel Worlds

## 1. Local Development
To run the dev server on port 3000:
```bash
npm install
npm run dev
```

## 2. Production Cloud Run Build
To build static assets for production deployment:
```bash
npm run build
```
The output static bundle will be generated in `/dist`.

## 3. Environment Variables (`.env.example`)
Declare environment credentials:
```env
GEMINI_API_KEY="YOUR_KEY"
APP_URL="YOUR_APP_URL"
```
