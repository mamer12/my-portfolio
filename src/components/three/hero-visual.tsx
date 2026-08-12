"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const Topology = dynamic(() => import("./topology"), {
  ssr: false,
  loading: () => null,
});

/**
 * Cheap capability probe.
 *
 * WebGL context creation is the only reliable test; `deviceMemory` and core
 * count then filter out phones that *can* run the shader but would crawl doing
 * it. The probe context is disposed immediately.
 */
function canRunWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return false;

    (gl as WebGLRenderingContext)
      .getExtension("WEBGL_lose_context")
      ?.loseContext();

    const nav = navigator as Navigator & { deviceMemory?: number };
    if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) return false;
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

interface HeroVisualProps {
  scrollRef: React.RefObject<number>;
  className?: string;
  /**
   * "panel"    — bordered instrument card (the original framing).
   * "backdrop" — full-bleed layer behind the hero copy. The mesh is masked
   *   so it burns brightest away from the text column and dissolves into
   *   the canvas at the bottom seam; the copy always sits on calm ground.
   */
  variant?: "panel" | "backdrop";
}

export function HeroVisual({
  scrollRef,
  className,
  variant = "panel",
}: HeroVisualProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [state, setState] = useState<"probing" | "webgl" | "fallback">(
    "probing",
  );
  const [cols, setCols] = useState(46);

  useEffect(() => {
    if (reducedMotion) {
      setState("fallback");
      return;
    }
    const width = window.innerWidth;
    setCols(width < 768 ? 30 : width < 1280 ? 38 : 48);
    setState(canRunWebGL() ? "webgl" : "fallback");
  }, [reducedMotion]);

  const scene =
    state === "webgl" ? (
      <Topology scrollRef={scrollRef} cols={cols} />
    ) : (
      <StaticTopology animated={!reducedMotion} />
    );

  if (variant === "backdrop") {
    // No `pointer-events-none` here: R3F reads the pointer from canvas events,
    // and killing them would freeze the mesh's mouse parallax. The hero's
    // content is positioned and paints above, so links stay clickable.
    return (
      <div
        className={cn("absolute inset-0", className)}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            // Brightest in the upper-right field, fading before the text
            // column and dissolving well above the section's bottom seam.
            maskImage:
              "radial-gradient(ellipse 85% 80% at 68% 30%, #000 20%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 80% at 68% 30%, #000 20%, transparent 78%)",
          }}
        >
          {scene}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "panel ticked relative overflow-hidden bg-ink/70",
        className,
      )}
      aria-hidden="true"
    >
      {/* Readout chrome — cheap, and it frames the mesh as an instrument. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-line px-4 py-2.5">
        <p className="label flex items-center gap-2">
          <span className="h-1 w-1 animate-pulse-dot rounded-full bg-signal" />
          Topology
        </p>
        <p className="label numeric">
          {state === "webgl" ? "GL / LIVE" : "STATIC"}
        </p>
      </div>

      <div className="absolute inset-0">{scene}</div>

      {/* Inner vignette so the mesh fades into the panel edges rather than
          being sliced off by them. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(var(--ink-raised))_92%)]" />
    </div>
  );
}

/**
 * Non-WebGL stand-in: a CSS perspective grid. Deliberately the same visual
 * language as the mesh, so the fallback still reads as the intended design.
 */
function StaticTopology({ animated }: { animated: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-[58%] h-[220%] w-[260%] -translate-x-1/2 -translate-y-1/2 [transform:translate(-50%,-50%)_perspective(620px)_rotateX(64deg)]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--signal) / 0.28) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgb(var(--signal) / 0.16) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 52% 46% at 50% 46%, #000 8%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 52% 46% at 50% 46%, #000 8%, transparent 72%)",
          animation: animated ? "scan 16s linear infinite" : undefined,
        }}
      />
    </div>
  );
}
