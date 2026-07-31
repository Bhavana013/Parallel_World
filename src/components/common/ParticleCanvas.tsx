import React, { useEffect, useRef } from 'react';
import { ParticleSystem } from '../../utils/particleEngine';
import { useGame } from '../../context/GameContext';

interface ParticleCanvasProps {
  effectOverride?: 'fireflies' | 'rain' | 'leaves' | 'portal_sparks' | 'blooming_pollen';
  className?: string;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ effectOverride, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleSysRef = useRef<ParticleSystem | null>(null);
  const { activeWorld } = useGame();

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const handleResize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        if (particleSysRef.current) {
          particleSysRef.current.resize(canvas.width, canvas.height);
        }
      }
    };

    handleResize();
    const system = new ParticleSystem(canvas);
    particleSysRef.current = system;

    const currentEffect = effectOverride || (activeWorld === 'fantasy' ? 'blooming_pollen' : 'fireflies');
    system.setEffect(currentEffect);
    system.start();

    window.addEventListener('resize', handleResize);

    return () => {
      system.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, [activeWorld, effectOverride]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
};
