/**
 * Parallel Worlds - Enhanced Web Audio API Synthesizer & Speech Narration Engine
 *
 * Audio Features:
 * - Removed noise-based bird/wind/rain audio per prompt specification.
 * - Enchanting fantasy background music with synthesized Flute arpeggios, Harp glissandos, Celesta bells, and Piano progression.
 * - Speech Narration engine utilizing Web Speech API with fallback synthesized chime cues.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isInitialized = false;

  // Master Gain Nodes
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  // Music loop state
  private musicInterval: any = null;
  private isMusicPlaying = false;

  // Voice Narration settings
  private voiceEnabled = true;
  private currentVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.initVoices();
  }

  private initVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoiceList = () => {
        const voices = window.speechSynthesis.getVoices();
        // Prefer an English female or friendly tone voice if available
        this.currentVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Zira'))) || voices[0] || null;
      };

      updateVoiceList();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoiceList;
      }
    }
  }

  public init() {
    if (this.isInitialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Setup gain hierarchy
      this.masterGain = this.ctx.createGain();
      this.musicGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();

      this.masterGain.gain.value = 0.8;
      this.musicGain.gain.value = 0.45;
      this.sfxGain.gain.value = 0.75;

      this.musicGain.connect(this.masterGain);
      this.sfxGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio API initialized with notice:', e);
    }
  }

  public setVolumes(master: number, music: number, sfx: number, muted: boolean) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const m = muted ? 0 : master;
    this.masterGain.gain.setTargetAtTime(m, now, 0.05);
    if (this.musicGain) this.musicGain.gain.setTargetAtTime(music, now, 0.05);
    if (this.sfxGain) this.sfxGain.gain.setTargetAtTime(sfx, now, 0.05);
  }

  public toggleVoice(enabled: boolean) {
    this.voiceEnabled = enabled;
  }

  // --- Speech Voice Narration ---

  public speak(text: string, force = false) {
    this.speakContextual(text, 'fantasy', force);
  }

  public speakContextual(text: string, context: 'reality' | 'transformation' | 'fantasy' | 'achievement', force = false) {
    if (!this.voiceEnabled && !force) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      if (this.currentVoice) utterance.voice = this.currentVoice;

      if (context === 'reality') {
        // Calm human narrator with steady pitch & rate
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.volume = 0.85;
        window.speechSynthesis.speak(utterance);
      } else if (context === 'transformation') {
        // Magical voice with echo effect simulation
        utterance.rate = 0.88;
        utterance.pitch = 1.25;
        utterance.volume = 0.95;
        window.speechSynthesis.speak(utterance);

        // Echo delayed utterance
        setTimeout(() => {
          if (!('speechSynthesis' in window)) return;
          const echoUtterance = new SpeechSynthesisUtterance(text);
          if (this.currentVoice) echoUtterance.voice = this.currentVoice;
          echoUtterance.rate = 0.82;
          echoUtterance.pitch = 1.35;
          echoUtterance.volume = 0.45;
          window.speechSynthesis.speak(echoUtterance);
        }, 320);
      } else if (context === 'fantasy') {
        // Enchanting fairy or wizard guide voice
        utterance.rate = 0.92;
        utterance.pitch = 1.35;
        utterance.volume = 0.95;
        window.speechSynthesis.speak(utterance);
      } else if (context === 'achievement') {
        // Energetic voice saying "Excellent!", "Amazing!", "Level Up!"
        const exclamations = ['Excellent!', 'Amazing!', 'Level Up!', 'Unbelievable Eco Power!', 'Master Guardian!'];
        const randomExclamation = exclamations[Math.floor(Math.random() * exclamations.length)];
        const fullText = `${randomExclamation} ${text}`;
        
        const energeticUtterance = new SpeechSynthesisUtterance(fullText);
        if (this.currentVoice) energeticUtterance.voice = this.currentVoice;
        energeticUtterance.rate = 1.15;
        energeticUtterance.pitch = 1.3;
        energeticUtterance.volume = 1.0;
        window.speechSynthesis.speak(energeticUtterance);
      }
    } catch (e) {
      console.warn('SpeechSynthesis notice:', e);
    }
  }

  // --- Voice Narration Shortcuts for Important UI Actions ---

  public narratePlay() {
    this.playClick();
    this.speakContextual('Entering Level Select! Prepare your eco magic.', 'reality');
  }

  public narratePortal() {
    this.playPortalWarp();
    this.speakContextual('Initiating Portal Shift! Reality is transforming into Fantasy World!', 'transformation');
  }

  public narrateRewards() {
    this.playAchievementUnlocking();
    this.speakContextual('Treasure Chest Unlocked! You earned Eco Coins and Magic XP!', 'achievement');
  }

  public narrateSettings() {
    this.playClick();
    this.speakContextual('Opening Game Settings and Configuration.', 'reality');
  }

  public narrateTaskComplete() {
    this.playLevelSuccess();
    this.speakContextual('Eco Task Completed! Fantasy World Growth Boosted!', 'achievement');
  }

  public narrateLevelUp(level: number) {
    this.playAchievementUnlocking();
    this.speakContextual(`Congratulations, you reached Level ${level}!`, 'achievement');
  }

  public narrateCharacterSelect(name: string) {
    this.playPlantSeed();
    this.speak(`Guardian Hero selected: ${name}!`);
  }

  public narrateCompanionUnlock(companionName: string) {
    this.playAchievementUnlocking();
    this.speak(`New Magical Companion Unlocked: ${companionName}!`);
  }

  // --- Sound Effects ---

  public playClick() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.06);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  public playPortalWarp() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(920, now + 0.4);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.85);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.linearRampToValueAtTime(2400, now + 0.4);
    filter.frequency.linearRampToValueAtTime(350, now + 0.85);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.55, now + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.85);
  }

  public playWaterSplash() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.2);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  public playPlantSeed() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5 Celesta sweep
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const time = now + idx * 0.07;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(time);
      osc.stop(time + 0.3);
    });
  }

  public playAchievementUnlocking() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    chords.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const startTime = now + i * 0.09;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.35, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.55);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(startTime);
      osc.stop(startTime + 0.55);
    });
  }

  public playLevelSuccess() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const melody = [392.00, 440.00, 493.88, 523.25, 659.25, 783.99, 1046.50];
    melody.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const startTime = now + idx * 0.1;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.35, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  }

  // --- Enchanting Fantasy Background Music (Flute, Harp, Piano, Celesta, Orchestra) ---

  public startBackgroundMusic() {
    this.init();
    if (this.isMusicPlaying || !this.ctx || !this.musicGain) return;
    this.isMusicPlaying = true;

    // Magical Fantasy Arpeggio Chord Progression (Cmaj7 -> Am9 -> Fmaj9 -> Gadd11)
    const chords = [
      [261.63, 329.63, 392.00, 493.88, 523.25, 659.25], // Cmaj7 Flute/Harp
      [220.00, 261.63, 329.63, 392.00, 493.88, 587.33], // Am9
      [174.61, 220.00, 261.63, 329.63, 392.00, 523.25], // Fmaj9
      [196.00, 246.94, 293.66, 349.23, 440.00, 523.25]  // Gadd11
    ];

    let chordIdx = 0;

    const playFantasyChord = () => {
      if (!this.ctx || !this.isMusicPlaying) return;
      const currentChord = chords[chordIdx];
      const now = this.ctx.currentTime;

      // 1. Piano / Celesta Sustained Base
      currentChord.slice(0, 3).forEach((freq) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.07, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

        osc.connect(gain);
        gain.connect(this.musicGain!);

        osc.start(now);
        osc.stop(now + 4);
      });

      // 2. Enchanting Harp / Flute Arpeggio Notes
      currentChord.forEach((freq, noteIdx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const noteTime = now + noteIdx * 0.35;

        osc.type = noteIdx % 2 === 0 ? 'triangle' : 'sine'; // Flute / Harp timbre mix
        osc.frequency.setValueAtTime(freq * 1.5, noteTime);

        gain.gain.setValueAtTime(0.001, noteTime);
        gain.gain.linearRampToValueAtTime(0.05, noteTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 1.2);

        osc.connect(gain);
        gain.connect(this.musicGain!);

        osc.start(noteTime);
        osc.stop(noteTime + 1.2);
      });

      chordIdx = (chordIdx + 1) % chords.length;
    };

    playFantasyChord();
    this.musicInterval = setInterval(playFantasyChord, 4200);
  }

  public stopBackgroundMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const audioEngine = new AudioEngine();
