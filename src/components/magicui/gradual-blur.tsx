"use client";

import { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradualBlurProps {
  children?: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  opacity?: number;
  target?: "parent" | "page";
  zIndex?: number;
  className?: string;
  style?: CSSProperties;
}

export function GradualBlur({
  children,
  position = "bottom",
  strength = 2,
  height = "6rem",
  width,
  divCount = 5,
  exponential = false,
  opacity = 1,
  target = "parent",
  zIndex = 1000,
  className,
  style,
}: GradualBlurProps) {
  const isVertical = position === "top" || position === "bottom";
  const defaultWidth = isVertical ? "100%" : height;
  const finalWidth = width || defaultWidth;

  const positionStyles: Record<string, CSSProperties> = {
    top: { top: 0, left: 0, right: 0, height, width: "100%" },
    bottom: { bottom: 0, left: 0, right: 0, height, width: "100%" },
    left: { top: 0, left: 0, bottom: 0, width: finalWidth },
    right: { top: 0, right: 0, bottom: 0, width: finalWidth },
  };

  const layers = Array.from({ length: divCount }, (_, i) => {
    const progress = (i + 1) / divCount;
    const blurValue = exponential
      ? Math.pow(progress, 2) * strength
      : progress * strength;

    return {
      backdropFilter: `blur(${blurValue}px)`,
      WebkitBackdropFilter: `blur(${blurValue}px)`,
      opacity: opacity * progress,
    };
  });

  return (
    <>
      {children}
      <div
        className={cn(
          "pointer-events-none",
          target === "page" ? "fixed" : "absolute",
          className
        )}
        style={{
          ...positionStyles[position],
          zIndex: target === "page" ? zIndex + 100 : zIndex,
          ...style,
        }}
      >
        {layers.map((layerStyle, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              ...layerStyle,
            }}
          />
        ))}
      </div>
    </>
  );
}
