# Parallel Worlds - Database Schema Specification

## Data Models

### 1. `players` Collection / Table
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String / UUID | Primary Key |
| `username` | String | Guardian hero name |
| `characterId` | String | Foreign Key to active character |
| `xp` | Integer | Total experience points |
| `level` | Integer | Guardian player level |
| `coins` | Integer | Eco coins balance |
| `positiveEnergy` | Integer | Environmental energy meter |
| `fantasyGrowthPercentage` | Float | World transformation ratio (0-100%) |
| `loginStreak` | Integer | Consecutive daily logins |
| `unlockedLevelId` | Integer | Current level progress (1-10) |
| `equippedTitle` | String | Display badge title |

---

### 2. `levels_progress` Collection / Table
| Field | Type | Description |
| :--- | :--- | :--- |
| `playerId` | String | Foreign Key to player |
| `levelId` | Integer | Level number (1-10) |
| `stars` | Integer | Stars earned (0-3) |
| `highScore` | Integer | Highest score recorded |
| `completed` | Boolean | Completion status |

---

### 3. `companions` Collection / Table
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | Primary Key (e.g., `comp-1`) |
| `name` | String | Companion name (e.g., Lumi) |
| `species` | String | Fairy, Fox, Owl, Dragon, Phoenix |
| `rarity` | String | Rare, Epic, Legendary |
| `perk` | String | Gameplay bonus description |
| `unlocked` | Boolean | Unlock status |
| `level` | Integer | Companion power level |
