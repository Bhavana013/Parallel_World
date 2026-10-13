import React from 'react';

export type CharacterAnimationState = 'idle' | 'walk' | 'run' | 'jump' | 'celebrate' | 'sleep' | 'think';

interface CartoonCharacterAvatarProps {
  characterId: string;
  animationState?: CharacterAnimationState;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showGlow?: boolean;
  className?: string;
}

export const CartoonCharacterAvatar: React.FC<CartoonCharacterAvatarProps> = ({
  characterId,
  animationState = 'idle',
  size = 'md',
  showGlow = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
    '2xl': 'w-64 h-64',
  }[size];

  // Animation CSS class logic based on state
  const getAnimClass = () => {
    switch (animationState) {
      case 'walk':
        return 'animate-bounce duration-700';
      case 'run':
        return 'animate-pulse scale-105 duration-300';
      case 'jump':
        return '-translate-y-4 scale-110 duration-500 transition-all';
      case 'celebrate':
        return 'rotate-6 scale-110 duration-500 transition-all';
      case 'sleep':
        return 'opacity-80 scale-95 duration-1000';
      case 'think':
        return '-rotate-6 duration-700';
      case 'idle':
      default:
        return 'hover:scale-105 transition-transform duration-300';
    }
  };

  // Color schemes for cartoon character avatars
  const characterConfig = {
    'char-1': {
      skin: '#fcd34d',
      hair: '#10b981',
      outfit: '#047857',
      eyes: '#064e3b',
      accent: '#34d399',
      symbol: '🌿',
      name: 'Kaelen Emberleaf'
    },
    'char-2': {
      skin: '#fde047',
      hair: '#06b6d4',
      outfit: '#0284c7',
      eyes: '#082f49',
      accent: '#38bdf8',
      symbol: '🌊',
      name: 'Aria Tidecaller'
    },
    'char-3': {
      skin: '#fef08a',
      hair: '#84cc16',
      outfit: '#4d7c0f',
      eyes: '#1a2e05',
      accent: '#a3e635',
      symbol: '🦊',
      name: 'Silvan Shadowmoss'
    },
    'char-4': {
      skin: '#fed7aa',
      hair: '#c084fc',
      outfit: '#7e22ce',
      eyes: '#3b0764',
      accent: '#e879f9',
      symbol: '✨',
      name: 'Zephyr Sunflare'
    }
  }[characterId] || {
    skin: '#fcd34d',
    hair: '#10b981',
    outfit: '#047857',
    eyes: '#064e3b',
    accent: '#34d399',
    symbol: '⭐',
    name: 'Eco Guardian'
  };

  return (
    <div className={`relative inline-flex items-center justify-center rounded-3xl ${sizeClasses} ${getAnimClass()} ${className}`}>
      {/* Background Magical Bloom Aura */}
      {showGlow && (
        <div
          className="absolute inset-0 rounded-3xl blur-md opacity-60 animate-pulse"
          style={{ background: characterConfig.accent }}
        />
      )}

      {/* Main Cartoon Character SVG Frame */}
      <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border-2 border-slate-700/80 bg-slate-900 flex items-center justify-center p-2 shadow-xl">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <defs>
            <radialGradient id={`grad-${characterId}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={characterConfig.accent} stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
            </radialGradient>
          </defs>

          {/* Background Aura circle */}
          <circle cx="50" cy="50" r="45" fill={`url(#grad-${characterId})`} />

          {/* Body / Tunic */}
          <path
            d="M 28 85 C 28 65, 72 65, 72 85 Z"
            fill={characterConfig.outfit}
            stroke="#020617"
            strokeWidth="2.5"
          />

          {/* Collar / Emblem */}
          <circle cx="50" cy="68" r="6" fill={characterConfig.accent} />

          {/* Head */}
          <circle
            cx="50"
            cy="42"
            r="22"
            fill={characterConfig.skin}
            stroke="#020617"
            strokeWidth="2.5"
          />

          {/* Cartoon Hair Style */}
          <path
            d="M 28 40 C 28 18, 72 18, 72 40 C 65 25, 35 25, 28 40 Z"
            fill={characterConfig.hair}
            stroke="#020617"
            strokeWidth="2"
          />

          {/* Cartoon Eyes */}
          {animationState === 'sleep' ? (
            <>
              {/* Sleeping Eyes Zzz */}
              <path d="M 40 42 Q 44 45 48 42" fill="none" stroke="#020617" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 52 42 Q 56 45 60 42" fill="none" stroke="#020617" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Big Expressive Cartoon Eyes */}
              <circle cx="42" cy="42" r="4.5" fill="#ffffff" stroke="#020617" strokeWidth="1.5" />
              <circle cx="58" cy="42" r="4.5" fill="#ffffff" stroke="#020617" strokeWidth="1.5" />
              <circle cx="43" cy="42" r="2.5" fill={characterConfig.eyes} />
              <circle cx="59" cy="42" r="2.5" fill={characterConfig.eyes} />
              <circle cx="44" cy="40.5" r="1" fill="#ffffff" />
              <circle cx="60" cy="40.5" r="1" fill="#ffffff" />
            </>
          )}

          {/* Cartoon Cheeks */}
          <ellipse cx="36" cy="48" rx="3" ry="1.8" fill="#f43f5e" opacity="0.5" />
          <ellipse cx="64" cy="48" rx="3" ry="1.8" fill="#f43f5e" opacity="0.5" />

          {/* Mouth / Expression */}
          {animationState === 'celebrate' || animationState === 'jump' ? (
            /* Open Happy Mouth */
            <path d="M 42 50 Q 50 60 58 50 Z" fill="#020617" />
          ) : animationState === 'think' ? (
            /* Smirk / Thinking */
            <path d="M 43 51 Q 50 49 57 53" fill="none" stroke="#020617" strokeWidth="2" strokeLinecap="round" />
          ) : (
            /* Friendly Smile */
            <path d="M 42 49 Q 50 56 58 49" fill="none" stroke="#020617" strokeWidth="2.5" strokeLinecap="round" />
          )}

          {/* Head Crown / Accessory Symbol */}
          <text x="50" y="22" textAnchor="middle" fontSize="12">
            {characterConfig.symbol}
          </text>
        </svg>

        {/* State Badge Badge Indicator */}
        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-slate-950/90 border border-slate-700 text-[8px] font-extrabold text-emerald-400 uppercase tracking-widest">
          {animationState}
        </div>
      </div>
    </div>
  );
};
