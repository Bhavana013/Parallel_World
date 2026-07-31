/**
 * Parallel Worlds - Web Audio API Procedural Audio & Ambience Engine
 * Handles background music chords, nature ambience (rain, wind, stream, birds), 
 * UI clicks, portal whooshes, item pickup, and level completion chimes.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isInitialized = false;

  // Master Gain Nodes
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private ambienceGain: GainNode | null = null;

  // Ambience loops
  private activeAmbienceNodes: { stop: () => void }[] = [];
  private currentAmbienceType: string = 'none';

  // Music loop state
  private musicInterval: any = null;
  private isMusicPlaying = false;

  constructor() {
    // AudioContext will be lazy-initialized on user interaction
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
      this.ambienceGain = this.ctx.createGain();

      this.masterGain.gain.value = 0.8;
      this.musicGain.gain.value = 0.5;
      this.sfxGain.gain.value = 0.7;
      this.ambienceGain.gain.value = 0.6;

      this.musicGain.connect(this.masterGain);
      this.sfxGain.connect(this.masterGain);
      this.ambienceGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  public setVolumes(master: number, music: number, sfx: number, ambience: number, muted: boolean) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const m = muted ? 0 : master;
    this.masterGain.gain.setTargetAtTime(m, now, 0.05);
    if (this.musicGain) this.musicGain.gain.setTargetAtTime(music, now, 0.05);
    if (this.sfxGain) this.sfxGain.gain.setTargetAtTime(sfx, now, 0.05);
    if (this.ambienceGain) this.ambienceGain.gain.setTargetAtTime(ambience, now, 0.05);
  }

  // --- UI Sound Effects ---

  public playClick() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  public playPortalWarp() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.4);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.8);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.linearRampToValueAtTime(2000, now + 0.4);
    filter.frequency.linearRampToValueAtTime(300, now + 0.8);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.6, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.8);
  }

  public playWaterSplash() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    // White noise burst with lowpass sweep
    const bufferSize = this.ctx.sampleRate * 0.3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, now);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.3);
    filter.Q.value = 3;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    whiteNoise.start(now);
  }

  public playPlantSeed() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const time = now + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(time);
      osc.stop(time + 0.25);
    });
  }

  public playAchievementUnlocking() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const chords = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
    chords.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const startTime = now + i * 0.1;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.4, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(startTime);
      osc.stop(startTime + 0.5);
    });
  }

  public playLevelSuccess() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const melody = [392.00, 440.00, 493.88, 523.25, 659.25, 783.99]; // G4 A4 B4 C5 E5 G5
    melody.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const startTime = now + idx * 0.12;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.35, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  // --- Background Ambient Music Loop ---

  public startBackgroundMusic() {
    this.init();
    if (this.isMusicPlaying || !this.ctx || !this.musicGain) return;
    this.isMusicPlaying = true;

    // Ambient Pentatonic Chords progression
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 349.23], // G7
    ];

    let chordIdx = 0;

    const playChord = () => {
      if (!this.ctx || !this.isMusicPlaying) return;
      const currentChord = chords[chordIdx];
      const now = this.ctx.currentTime;

      currentChord.forEach((freq) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 1.5);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

        osc.connect(gain);
        gain.connect(this.musicGain!);

        osc.start(now);
        osc.stop(now + 4);
      });

      chordIdx = (chordIdx + 1) % chords.length;
    };

    playChord();
    this.musicInterval = setInterval(playChord, 4000);
  }

  public stopBackgroundMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  // --- Procedural Nature Ambience ---

  public setAmbience(type: 'nature' | 'rain' | 'wind' | 'crystal' | 'none') {
    this.init();
    this.stopAmbience();
    this.currentAmbienceType = type;

    if (type === 'none' || !this.ctx || !this.ambienceGain) return;

    if (type === 'nature') {
      // Wind + Bird chirps
      const windNode = this.createWindNoise(0.2);
      this.activeAmbienceNodes.push(windNode);

      const birdTimer = setInterval(() => {
        if (Math.random() < 0.6) this.playBirdChirp();
      }, 3500);

      this.activeAmbienceNodes.push({ stop: () => clearInterval(birdTimer) });
    } else if (type === 'rain') {
      const rainNode = this.createRainNoise(0.3);
      this.activeAmbienceNodes.push(rainNode);
    } else if (type === 'wind') {
      const windNode = this.createWindNoise(0.4);
      this.activeAmbienceNodes.push(windNode);
    } else if (type === 'crystal') {
      // Mystical fantasy crystal resonance
      const crystalTimer = setInterval(() => {
        this.playCrystalResonance();
      }, 2500);
      this.activeAmbienceNodes.push({ stop: () => clearInterval(crystalTimer) });
    }
  }

  public stopAmbience() {
    this.activeAmbienceNodes.forEach((node) => node.stop());
    this.activeAmbienceNodes = [];
    this.currentAmbienceType = 'none';
  }

  private createWindNoise(volume: number) {
    if (!this.ctx || !this.ambienceGain) return { stop: () => {} };
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ambienceGain);

    noise.start();
    return { stop: () => { try { noise.stop(); } catch(e){} } };
  }

  private createRainNoise(volume: number) {
    if (!this.ctx || !this.ambienceGain) return { stop: () => {} };
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    filter.Q.value = 1;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ambienceGain);

    noise.start();
    return { stop: () => { try { noise.stop(); } catch(e){} } };
  }

  private playBirdChirp() {
    if (!this.ctx || !this.ambienceGain) return;
    const now = this.ctx.currentTime;
    const baseFreq = 2200 + Math.random() * 800;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.linearRampToValueAtTime(baseFreq + 400, now + 0.05);
    osc.frequency.linearRampToValueAtTime(baseFreq - 200, now + 0.12);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ambienceGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  private playCrystalResonance() {
    if (!this.ctx || !this.ambienceGain) return;
    const now = this.ctx.currentTime;
    const freqs = [1046.50, 1318.51, 1567.98, 2093.00];
    const freq = freqs[Math.floor(Math.random() * freqs.length)];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    osc.connect(gain);
    gain.connect(this.ambienceGain);

    osc.start(now);
    osc.stop(now + 1.8);
  }
}

export const audioEngine = new AudioEngine();
