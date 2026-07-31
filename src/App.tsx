import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { AudioPlayer } from './components/common/AudioPlayer';

import { LandingPage } from './components/views/LandingPage';
import { AuthModal } from './components/views/AuthModal';
import { DashboardPage } from './components/views/DashboardPage';
import { CharacterSelectPage } from './components/views/CharacterSelectPage';
import { StoryIntroPage } from './components/views/StoryIntroPage';
import { WorldViewPage } from './components/views/WorldViewPage';
import { LevelSelectPage } from './components/views/LevelSelectPage';
import { GamePlayPage } from './components/views/GamePlayPage';
import { InventoryPage } from './components/views/InventoryPage';
import { LeaderboardPage } from './components/views/LeaderboardPage';
import { ProfilePage } from './components/views/ProfilePage';
import { SettingsPage } from './components/views/SettingsPage';
import { AchievementsPage } from './components/views/AchievementsPage';
import { GameCompletionPage } from './components/views/GameCompletionPage';

const GameRouter: React.FC = () => {
  const { activePage } = useGame();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const renderCurrentView = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'character-select':
        return <CharacterSelectPage />;
      case 'story-intro':
        return <StoryIntroPage />;
      case 'world-view':
        return <WorldViewPage />;
      case 'level-select':
        return <LevelSelectPage />;
      case 'gameplay':
        return <GamePlayPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'game-completion':
        return <GameCompletionPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950 font-sans">
      <Navbar />
      
      <main className="flex-1 relative">
        {renderCurrentView()}
      </main>

      <Footer />

      {/* Floating Audio Control Panel */}
      <AudioPlayer />

      {/* Toast Notification Stack */}
      <ToastContainer />

      {/* Auth Modal overlay if open */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <GameRouter />
      </GameProvider>
    </AuthProvider>
  );
}
