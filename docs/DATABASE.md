# Database Schema & Security Rules - Parallel Worlds

## 1. Firestore Data Collections

### Collection: `users/{userId}`
```json
{
  "id": "string",
  "username": "string",
  "characterId": "string",
  "xp": "number",
  "level": "number",
  "coins": "number",
  "positiveEnergy": "number",
  "fantasyGrowthPercentage": "number",
  "loginStreak": "number",
  "unlockedLevelId": "number",
  "createdAt": "timestamp"
}
```

### Collection: `leaderboard/{entryDocId}`
```json
{
  "rank": "number",
  "username": "string",
  "xp": "number",
  "level": "number",
  "fantasyGrowthPercentage": "number",
  "updatedAt": "timestamp"
}
```
