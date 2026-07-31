import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, Play, Layers, Compass } from 'lucide-react';

export const StoryIntroPage: React.FC = () => {
  const { setActivePage } = useGame();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Act I: The Smog & The Nightmare",
      subtitle: "The Damaged Reality World",
      description: "You awaken from a restless slumber in a world suffocated by smog, toxic rivers, and deforested hills. The delicate harmony of the planet has collapsed under decades of environmental neglect.",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
      accent: "from-red-600/30 via-slate-900 to-slate-950",
      badge: "REALITY REALM"
    },
    {
      title: "Act II: The Dimensional Rift",
      subtitle: "The Portal Awakenings",
      description: "While navigating a barren valley, an ancient stone archway begins to pulsate with starlight. Touching the threshold reveals a tear in space-time—a parallel fantasy realm tethered to our own.",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      accent: "from-purple-600/30 via-slate-900 to-slate-950",
      badge: "PORTAL GATEWAY"
    },
    {
      title: "Act III: The Ecological Synthesis",
      subtitle: "Action Transforms Fate",
      description: "The cosmic law becomes clear: Every tree planted, river cleared, and animal rescued in Reality blossoms as giant sky trees, crystal rivers, and glowing spirit guardians in the Fantasy Realm!",
      imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
      accent: "from-emerald-600/30 via-slate-900 to-slate-950",
      badge: "ECO SYMBIOSIS"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setActivePage('character-select');
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <ParticleCanvas effectOverride="portal_sparks" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between gap-2 max-w-xs mx-auto w-full mb-2">
          {slides.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full cursor-pointer transition-all ${
                idx === currentSlide
                  ? 'w-12 bg-emerald-400 shadow-md shadow-emerald-500/50'
                  : 'w-6 bg-slate-800 hover:bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Slide Card Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className={`rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-b ${slide.accent} p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center gap-8`}
          >
            {/* Image Preview */}
            <div className="relative w-full md:w-1/2 h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl shrink-0">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover filter brightness-110 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 border border-emerald-500/40 text-emerald-400 font-bold text-[10px] uppercase tracking-widest backdrop-blur-md">
                {slide.badge}
              </div>
            </div>

            {/* Text & Narrative */}
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{slide.subtitle}</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-100 mt-1">{slide.title}</h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {slide.description}
              </p>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-2">
                <button
                  onClick={handlePrev}
                  disabled={currentSlide === 0}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold disabled:opacity-30 transition-all hover:bg-slate-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
                >
                  <span>{currentSlide === slides.length - 1 ? "Choose Guardian" : "Continue"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
