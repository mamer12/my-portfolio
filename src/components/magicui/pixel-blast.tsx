"use client";

import { useEffect, useRef } from "react";

interface PixelBlastProps {
  className?: string;
  pixelSize?: number;
  colors?: string[];
  density?: number;
  speed?: number;
}

export function PixelBlast({
  className = "",
  pixelSize = 4,
  colors = ["#765cff", "#ff5a6e", "#3ac47d", "#19b5fe"],
  density = 40,
  speed = 0.5,
}: PixelBlastProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * speed + speed;
      
      return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: pixelSize + Math.random() * pixelSize,
      };
    };

    // Initialize particles
    for (let i = 0; i < density; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Reset particle if it goes off screen
        if (
          particle.x < 0 ||
          particle.x > canvas.width ||
          particle.y < 0 ||
          particle.y > canvas.height
        ) {
          const newParticle = createParticle();
          particles[index] = newParticle;
          return;
        }

        ctx.fillStyle = particle.color;
        ctx.fillRect(
          Math.floor(particle.x),
          Math.floor(particle.y),
          particle.size,
          particle.size
        );
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [colors, density, pixelSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ display: "block" }}
    />
  );
}
