# Parallel Worlds - REST API Documentation

The backend Express service exposes JSON endpoints under `/api`.

---

## Endpoints Summary

### 1. Health Check
* **Endpoint**: `GET /api/health`
* **Description**: Verifies Express server status and runtime timestamp.
* **Response**:
```json
{
  "status": "ok",
  "server": "Parallel Worlds Express Server",
  "timestamp": "2026-08-02T02:04:53.000Z"
}
```

---

### 2. Get Player State
* **Endpoint**: `GET /api/player`
* **Description**: Retrieves active player profile, XP, coins, streak, and unlocked level.
* **Response**:
```json
{
  "success": true,
  "player": {
    "id": "player-iit-2026",
    "username": "Aarav EcoGuardian",
    "characterId": "char-1",
    "xp": 1450,
    "level": 4,
    "coins": 850,
    "positiveEnergy": 320,
    "fantasyGrowthPercentage": 45,
    "loginStreak": 5,
    "unlockedLevelId": 5
  }
}
```

---

### 3. Update Player State
* **Endpoint**: `POST /api/player/update`
* **Body**: `Record<string, any>` (fields to update)
* **Response**:
```json
{
  "success": true,
  "player": { ... }
}
```

---

### 4. Leaderboard
* **Endpoint**: `GET /api/leaderboard`
* **Description**: Returns top ranking Eco Guardians across Parallel Realms.

---

### 5. Unlockable Companions
* **Endpoint**: `GET /api/companions`
* **Description**: Returns list of magical companions (Fairy, Fox, Owl, Dragon, Phoenix) and their perks.

---

### 6. 5-Stage World Progression Status
* **Endpoint**: `GET /api/world-stage`
* **Description**: Calculates current world stage based on overall growth percentage.
