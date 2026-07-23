import React, { useEffect, useRef } from 'react';

interface SmokeBackgroundProps {
  className?: string;
}

export const SmokeBackground: React.FC<SmokeBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle System for realistic ambient smoke wisps
    interface Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      maxAlpha: number;
      life: number;
      maxLife: number;
      color: string;
    }

    const particles: Particle[] = [];
    const particleCount = 55;

    const createParticle = (): Particle => {
      return {
        x: Math.random() * width,
        y: height + Math.random() * 100,
        size: Math.random() * 160 + 100,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(Math.random() * 0.7 + 0.3),
        alpha: 0,
        maxAlpha: Math.random() * 0.35 + 0.15,
        life: 0,
        maxLife: Math.random() * 400 + 300,
        color: Math.random() > 0.3 ? '180, 30, 40' : '255, 255, 255' // Red & White wisps
      };
    };

    for (let i = 0; i < particleCount; i++) {
      const p = createParticle();
      p.y = Math.random() * height; // Distribute initially
      particles.push(p);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, index) => {
        p.life++;
        p.x += p.vx + Math.sin(p.life * 0.01) * 0.3;
        p.y += p.vy;

        // Fade in and out smooth curve
        const halfLife = p.maxLife / 2;
        if (p.life < halfLife) {
          p.alpha = (p.life / halfLife) * p.maxAlpha;
        } else {
          p.alpha = (1 - (p.life - halfLife) / halfLife) * p.maxAlpha;
        }

        if (p.life >= p.maxLife || p.y < -p.size) {
          particles[index] = createParticle();
        }

        // Draw soft radial gradient smoke blob
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(${p.color}, ${p.alpha})`);
        gradient.addColorStop(0.5, `rgba(${p.color}, ${p.alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(${p.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Canvas Smoke Wisps */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90 mix-blend-screen" />

      {/* Ambient Dark Red Vignette Overlays (semi-transparent, lets logo watermark show through) */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-slate-950/60" />
    </div>
  );
};
