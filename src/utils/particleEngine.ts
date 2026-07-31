/**
 * Particle Engine for Parallel Worlds
 * Renders fireflies, leaves, rain, floating sparks, and atmospheric fog
 */

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  angle: number;
  life: number;
  maxLife: number;
}

export class ParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animFrameId: number | null = null;
  private effectType: 'fireflies' | 'rain' | 'leaves' | 'portal_sparks' | 'blooming_pollen' = 'fireflies';

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas 2D context not available');
    this.ctx = context;
  }

  public setEffect(type: 'fireflies' | 'rain' | 'leaves' | 'portal_sparks' | 'blooming_pollen') {
    this.effectType = type;
    this.initParticles();
  }

  public resize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.initParticles();
  }

  private initParticles() {
    this.particles = [];
    const count = this.effectType === 'rain' ? 120 : 45;
    const w = this.canvas.width || 800;
    const h = this.canvas.height || 600;

    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle(w, h, true));
    }
  }

  private createParticle(w: number, h: number, randomY = false): Particle {
    const y = randomY ? Math.random() * h : -10;
    const x = Math.random() * w;

    if (this.effectType === 'fireflies') {
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1.5,
        color: Math.random() > 0.3 ? '#86efac' : '#fef08a', // emerald/yellow glow
        alpha: Math.random(),
        maxAlpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        angle: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: Math.random() * 500 + 200,
      };
    } else if (this.effectType === 'rain') {
      return {
        x,
        y,
        vx: -1.5,
        vy: Math.random() * 8 + 10,
        size: Math.random() * 1.5 + 1,
        color: '#38bdf8',
        alpha: Math.random() * 0.5 + 0.2,
        maxAlpha: 0.7,
        pulseSpeed: 0,
        angle: 0,
        life: 0,
        maxLife: 200,
      };
    } else if (this.effectType === 'portal_sparks') {
      return {
        x: w / 2 + (Math.random() - 0.5) * 200,
        y: h / 2 + (Math.random() - 0.5) * 200,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        size: Math.random() * 4 + 2,
        color: Math.random() > 0.5 ? '#c084fc' : '#38bdf8', // violet / cyan
        alpha: 1,
        maxAlpha: 1,
        pulseSpeed: 0.02,
        angle: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: Math.random() * 80 + 40,
      };
    } else if (this.effectType === 'blooming_pollen') {
      return {
        x,
        y: h + 10,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(Math.random() * 1.5 + 0.5),
        size: Math.random() * 3 + 2,
        color: Math.random() > 0.5 ? '#f472b6' : '#fef08a', // pink / golden
        alpha: Math.random() * 0.8 + 0.2,
        maxAlpha: 0.9,
        pulseSpeed: 0.01,
        angle: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: Math.random() * 300 + 150,
      };
    } else {
      // leaves
      return {
        x,
        y,
        vx: Math.random() * 1 + 0.5,
        vy: Math.random() * 1 + 0.8,
        size: Math.random() * 5 + 3,
        color: '#4ade80',
        alpha: 0.8,
        maxAlpha: 0.9,
        pulseSpeed: 0.02,
        angle: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: 300,
      };
    }
  }

  public start() {
    if (this.animFrameId) return;

    const render = () => {
      this.updateAndDraw();
      this.animFrameId = requestAnimationFrame(render);
    };

    this.animFrameId = requestAnimationFrame(render);
  }

  public stop() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private updateAndDraw() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    if (!w || !h) return;

    this.ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.life++;

      if (this.effectType === 'fireflies') {
        p.x += p.vx + Math.sin(p.life * 0.02) * 0.3;
        p.y += p.vy + Math.cos(p.life * 0.02) * 0.3;
        p.alpha += Math.sin(p.life * p.pulseSpeed) * 0.02;
        p.alpha = Math.max(0.05, Math.min(p.maxAlpha, p.alpha));

        // Draw glowing firefly
        this.ctx.save();
        this.ctx.globalAlpha = p.alpha;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = p.color;
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();

        // Screen boundary wrap
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      } else if (this.effectType === 'rain') {
        p.x += p.vx;
        p.y += p.vy;

        this.ctx.strokeStyle = p.color;
        this.ctx.globalAlpha = p.alpha;
        this.ctx.lineWidth = p.size;
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(p.x + p.vx * 2, p.y + p.vy * 2);
        this.ctx.stroke();

        if (p.y > h || p.x < 0) {
          this.particles[i] = this.createParticle(w, h, false);
        }
      } else if (this.effectType === 'portal_sparks') {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = 1 - p.life / p.maxLife;

        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.alpha);
        this.ctx.shadowBlur = 12;
        this.ctx.shadowColor = p.color;
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();

        if (p.life >= p.maxLife) {
          this.particles[i] = this.createParticle(w, h, false);
        }
      } else if (this.effectType === 'blooming_pollen') {
        p.x += p.vx + Math.sin(p.life * 0.03) * 0.5;
        p.y += p.vy;
        p.alpha = Math.sin((p.life / p.maxLife) * Math.PI) * p.maxAlpha;

        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.alpha);
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = p.color;
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();

        if (p.life >= p.maxLife || p.y < -10) {
          this.particles[i] = this.createParticle(w, h, false);
        }
      }
    }
  }
}
