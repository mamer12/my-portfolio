"use client";

import LightPillar from "@/components/magicui/light-pillar";

export default function UnifiedBackground() {
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
