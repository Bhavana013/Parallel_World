import React, { useState, useEffect } from 'react';
import { Sparkles, TreePine, Droplet, Sun, Bird, Fish, Flower2 } from 'lucide-react';
import { audioEngine } from '../../../utils/audioEngine';

interface LevelProps {
  onWin: (score: number, stars: number) => void;
}

interface Card {
  id: number;
  icon: string;
  flipped: boolean;
  matched: boolean;
}

export const Level3_MemoryMatching: React.FC<LevelProps> = ({ onWin }) => {
  const icons = ['TreePine', 'Droplet', 'Sun', 'Bird', 'Fish', 'Flower2'];
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    const deck: Card[] = [];
    const doubleIcons = [...icons, ...icons];
    doubleIcons.sort(() => Math.random() - 0.5);

    doubleIcons.forEach((icon, idx) => {
      deck.push({ id: idx, icon, flipped: false, matched: false });
    });
    setCards(deck);
  }, []);

  const handleCardClick = (id: number) => {
    if (selectedIds.length === 2) return;
    const clicked = cards.find(c => c.id === id);
    if (!clicked || clicked.flipped || clicked.matched) return;

    audioEngine.playClick();
    const nextCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    setCards(nextCards);

    const nextSelected = [...selectedIds, id];
    setSelectedIds(nextSelected);

    if (nextSelected.length === 2) {
      const card1 = nextCards.find(c => c.id === nextSelected[0])!;
      const card2 = nextCards.find(c => c.id === nextSelected[1])!;

      if (card1.icon === card2.icon) {
        audioEngine.playAchievementUnlocking();
        setTimeout(() => {
          setCards(prev => prev.map(c => (c.id === card1.id || c.id === card2.id) ? { ...c, matched: true } : c));
          setSelectedIds([]);

          const allMatched = nextCards.every(c => c.matched || c.id === card1.id || c.id === card2.id);
          if (allMatched) {
            onWin(600, 3);
          }
        }, 400);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => (c.id === card1.id || c.id === card2.id) ? { ...c, flipped: false } : c));
          setSelectedIds([]);
        }, 900);
      }
    }
  };

  const renderIcon = (name: string) => {
    if (name === 'TreePine') return <TreePine className="w-8 h-8 text-emerald-400" />;
    if (name === 'Droplet') return <Droplet className="w-8 h-8 text-cyan-400" />;
    if (name === 'Sun') return <Sun className="w-8 h-8 text-amber-400" />;
    if (name === 'Bird') return <Bird className="w-8 h-8 text-purple-400" />;
    if (name === 'Fish') return <Fish className="w-8 h-8 text-blue-400" />;
    return <Flower2 className="w-8 h-8 text-pink-400" />;
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-xl mx-auto text-center">
      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
        Flip cards to pair matching ecosystem species and restore biodiversity memory!
      </div>

      <div className="grid grid-cols-4 gap-3 w-full">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`h-24 rounded-2xl border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
              card.matched
                ? 'bg-emerald-950/40 border-emerald-500/50 opacity-60'
                : card.flipped
                ? 'bg-slate-900 border-cyan-400 rotate-y-180'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            {card.flipped || card.matched ? renderIcon(card.icon) : <Sparkles className="w-5 h-5 text-slate-600" />}
          </div>
        ))}
      </div>
    </div>
  );
};
