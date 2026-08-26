import React, { useEffect, useRef } from 'react';

export default function InteractivePinkBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates
    const mouse = {
      x: width / 2,
      y: height / 2,
      radius: 140,
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Create glowing particles / sparkles
    const particleCount = 45;
    const particles = [];

    const colors = [
      'rgba(244, 114, 182, ', // Pink 400
      'rgba(251, 207, 232, ', // Pink 200
      'rgba(236, 72, 153, ',  // Pink 500
      'rgba(253, 232, 238, ', // Soft Blush
      'rgba(249, 168, 201, ', // Rose
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 7 + 3,
        baseRadius: Math.random() * 6 + 2,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.45 + 0.15,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseVal: Math.random() * Math.PI,
        isSparkle: Math.random() > 0.65,
      });
    }

    // Floating larger dreamy orbs
    const orbs = [
      { x: width * 0.2, y: height * 0.25, r: 240, color: 'rgba(253, 226, 236, 0.45)', vx: 0.3, vy: 0.2 },
      { x: width * 0.8, y: height * 0.7, r: 300, color: 'rgba(252, 206, 224, 0.35)', vx: -0.2, vy: -0.25 },
      { x: width * 0.5, y: height * 0.9, r: 280, color: 'rgba(255, 230, 240, 0.4)', vx: 0.15, vy: -0.3 },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render large ambient gradient orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1;
        if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, 'rgba(255, 245, 248, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render particles & mouse interactions
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulseVal += p.pulseSpeed;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Mouse hover push
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 4;
          p.y += Math.sin(angle) * force * 4;
        }

        const currentAlpha = p.alpha + Math.sin(p.pulseVal) * 0.12;
        const safeAlpha = Math.max(0.05, Math.min(0.8, currentAlpha));

        ctx.fillStyle = `${p.colorPrefix}${safeAlpha})`;
        ctx.beginPath();

        if (p.isSparkle) {
          // Draw 4-point sparkle star
          const size = p.radius * 1.5;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.quadraticCurveTo(0, 0, size, 0);
          ctx.quadraticCurveTo(0, 0, 0, size);
          ctx.quadraticCurveTo(0, 0, -size, 0);
          ctx.quadraticCurveTo(0, 0, 0, -size);
          ctx.fill();
          ctx.restore();
        } else {
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-[#FFF0F5] to-[#FDE8EF]" />
      
      {/* Interactive dynamic canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-85"
      />

      {/* Aesthetic glass vignette overlays */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200/25 rounded-full blur-3xl" />
    </div>
  );
}
