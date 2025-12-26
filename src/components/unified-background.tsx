"use client";

import { useEffect, useState } from "react";
import LightPillar from "@/components/magicui/light-pillar";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { getAnimationSettings } from "@/lib/performance";
import { cn } from "@/lib/utils";

export default function UnifiedBackground() {
  const [shouldRenderComplex, setShouldRenderComplex] = useState(true);

  useEffect(() => {
    const { shouldUseHeavyEffects } = getAnimationSettings();
    setShouldRenderComplex(shouldUseHeavyEffects);
  }, []);

  if (!shouldRenderComplex) {
    // Dotted pattern background with gradient for mobile
    return (
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2a] to-[#0a0a0a]">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          )}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0a]">
      <LightPillar
        topColor="#5227FF"
        bottomColor="#FF9FFC"
        intensity={1}
        rotationSpeed={0.7}
        glowAmount={0.002}
        pillarWidth={4.7}
        pillarHeight={0.9}
        noiseIntensity={1.1}
        pillarRotation={36}
        interactive={false}
        mixBlendMode="screen"
      />
    </div>
  );
}
