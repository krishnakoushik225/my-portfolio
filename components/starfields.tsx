"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
  vx: number;
  vy: number;
  twinkle: number;
};

type Comet = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  len: number;
};

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId = 0;
    let mouseX = width * 0.5;
    let mouseY = height * 0.5;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    setCanvasSize();

    const starCount = Math.min(220, Math.floor((width * height) / 9000));
    const stars: Star[] = Array.from({ length: starCount }, () => {
      const z = Math.random() * 1 + 0.2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.04 * z,
        vy: (Math.random() - 0.5) * 0.04 * z,
        twinkle: Math.random() * Math.PI * 2,
      };
    });

    const comets: Comet[] = [];
    let lastComet = 0;

    const getTheme = () =>
      document.documentElement.classList.contains("dark") ? "dark" : "light";

    const spawnComet = () => {
      const fromLeft = Math.random() > 0.5;
      const startX = fromLeft ? -120 : width + 120;
      const startY = Math.random() * height * 0.45;
      const speed = 5 + Math.random() * 2.5;

      comets.push({
        x: startX,
        y: startY,
        vx: fromLeft ? speed : -speed,
        vy: 1.8 + Math.random() * 1.4,
        life: 0,
        maxLife: 120 + Math.random() * 40,
        len: 120 + Math.random() * 60,
      });
    };

    const drawNebula = (isDark: boolean) => {
      const grad1 = ctx.createRadialGradient(
        width * 0.18,
        height * 0.2,
        0,
        width * 0.18,
        height * 0.2,
        width * 0.35
      );
      grad1.addColorStop(0, isDark ? "rgba(99,102,241,0.16)" : "rgba(99,102,241,0.10)");
      grad1.addColorStop(1, "rgba(99,102,241,0)");

      const grad2 = ctx.createRadialGradient(
        width * 0.82,
        height * 0.72,
        0,
        width * 0.82,
        height * 0.72,
        width * 0.3
      );
      grad2.addColorStop(0, isDark ? "rgba(34,211,238,0.10)" : "rgba(34,211,238,0.07)");
      grad2.addColorStop(1, "rgba(34,211,238,0)");

      const grad3 = ctx.createRadialGradient(
        width * 0.55,
        height * 0.12,
        0,
        width * 0.55,
        height * 0.12,
        width * 0.22
      );
      grad3.addColorStop(0, isDark ? "rgba(244,114,182,0.08)" : "rgba(244,114,182,0.05)");
      grad3.addColorStop(1, "rgba(244,114,182,0)");

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);
    };

    const drawStars = (isDark: boolean, time: number) => {
      for (const star of stars) {
        const parallaxX = (mouseX - width / 2) * 0.012 * star.z;
        const parallaxY = (mouseY - height / 2) * 0.012 * star.z;

        star.x += star.vx;
        star.y += star.vy;
        star.twinkle += 0.02 * star.z;

        if (star.x < -10) star.x = width + 10;
        if (star.x > width + 10) star.x = -10;
        if (star.y < -10) star.y = height + 10;
        if (star.y > height + 10) star.y = -10;

        const alphaBase = isDark ? 0.35 : 0.18;
        const alpha = alphaBase + ((Math.sin(time * 0.001 + star.twinkle) + 1) / 2) * 0.45;

        ctx.beginPath();
        ctx.arc(star.x + parallaxX, star.y + parallaxY, star.r * star.z, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(255,255,255,${alpha})`
          : `rgba(51,65,85,${alpha * 0.55})`;
        ctx.fill();
      }
    };

    const drawConstellations = (isDark: boolean) => {
      const maxDist = 120;

      for (let i = 0; i < stars.length; i++) {
        const s1 = stars[i];
        const s1x = s1.x + (mouseX - width / 2) * 0.012 * s1.z;
        const s1y = s1.y + (mouseY - height / 2) * 0.012 * s1.z;

        const distToMouse = Math.hypot(s1x - mouseX, s1y - mouseY);
        if (distToMouse > 180) continue;

        for (let j = i + 1; j < Math.min(i + 8, stars.length); j++) {
          const s2 = stars[j];
          const s2x = s2.x + (mouseX - width / 2) * 0.012 * s2.z;
          const s2y = s2.y + (mouseY - height / 2) * 0.012 * s2.z;

          const d = Math.hypot(s1x - s2x, s1y - s2y);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * (1 - distToMouse / 180) * (isDark ? 0.25 : 0.12);
            ctx.beginPath();
            ctx.moveTo(s1x, s1y);
            ctx.lineTo(s2x, s2y);
            ctx.strokeStyle = isDark
              ? `rgba(255,255,255,${alpha})`
              : `rgba(51,65,85,${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const drawComets = (isDark: boolean) => {
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.x += c.vx;
        c.y += c.vy;
        c.life += 1;

        const lifeRatio = 1 - c.life / c.maxLife;
        const tailX = c.x - c.vx * 12;
        const tailY = c.y - c.vy * 12;

        const grad = ctx.createLinearGradient(c.x, c.y, tailX, tailY);
        if (isDark) {
          grad.addColorStop(0, `rgba(255,255,255,${0.95 * lifeRatio})`);
          grad.addColorStop(0.4, `rgba(191,219,254,${0.45 * lifeRatio})`);
          grad.addColorStop(1, "rgba(255,255,255,0)");
        } else {
          grad.addColorStop(0, `rgba(30,41,59,${0.6 * lifeRatio})`);
          grad.addColorStop(1, "rgba(30,41,59,0)");
        }

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - (c.vx / Math.abs(c.vx || 1)) * c.len, c.y - c.vy * 10);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(c.x, c.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(255,255,255,${0.95 * lifeRatio})`
          : `rgba(30,41,59,${0.75 * lifeRatio})`;
        ctx.fill();

        if (
          c.life >= c.maxLife ||
          c.x < -300 ||
          c.x > width + 300 ||
          c.y > height + 200
        ) {
          comets.splice(i, 1);
        }
      }
    };

    const render = (time: number) => {
      const isDark = getTheme() === "dark";

      ctx.clearRect(0, 0, width, height);

      drawNebula(isDark);
      drawStars(isDark, time);
      drawConstellations(isDark);

      if (time - lastComet > 1800) {
        spawnComet();
        lastComet = time;
      } else if (Math.random() < 0.008) {
        spawnComet();
      }

      drawComets(isDark);

      animationId = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onResize = () => {
      setCanvasSize();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" />;
}