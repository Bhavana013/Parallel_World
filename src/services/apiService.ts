/**
 * Parallel Worlds - API Service
 * Connects frontend views to backend Express REST API with client fallback.
 */

export interface PlayerApiResponse {
  success: boolean;
  player: any;
}

export interface WorldStageResponse {
  success: boolean;
  growthPercentage: number;
  stage: number;
  title: string;
  description: string;
}

export const apiService = {
  async getHealth() {
    try {
      const res = await fetch('/api/health');
      return await res.json();
    } catch (e) {
      return { status: 'offline' };
    }
  },

  async getPlayer() {
    try {
      const res = await fetch('/api/player');
      return await res.json();
    } catch (e) {
      return { success: false, error: 'Offline mode' };
    }
  },

  async updatePlayer(data: Record<string, any>) {
    try {
      const res = await fetch('/api/player/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: 'Offline mode' };
    }
  },

  async getLeaderboard() {
    try {
      const res = await fetch('/api/leaderboard');
      return await res.json();
    } catch (e) {
      return { success: false, leaderboard: [] };
    }
  },

  async getWorldStage(): Promise<WorldStageResponse | null> {
    try {
      const res = await fetch('/api/world-stage');
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  async getCompanions() {
    try {
      const res = await fetch('/api/companions');
      return await res.json();
    } catch (e) {
      return { success: false, companions: [] };
    }
  }
};
