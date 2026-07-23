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
    const particleCount = 35;

    const createParticle = (): Particle => {
      return {
        x: Math.random() * width,
        y: height + Math.random() * 100,
        size: Math.random() * 120 + 80,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.6 + 0.2),
        alpha: 0,
        maxAlpha: Math.random() * 0.15 + 0.05,
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
      {/* Video Loop - High Quality Smoke Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen scale-105 filter blur-[1px]"
        poster="https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=1600&auto=format&fit=crop"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-smoke-rising-in-the-dark-41551-large.mp4" type="video/mp4" />
        <source src="https://cdn.coverr.co/videos/coverr-smoke-rising-slowly-in-the-dark-5526/1080p.mp4" type="video/mp4" />
      </video>

      {/* Canvas Smoke Wisps */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70 mix-blend-screen" />

      {/* Ambient Dark Gold Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-slate-950/80" />
    </div>
  );
};
