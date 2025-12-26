// Utility to detect if device is mobile
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
};

// Utility to check if device supports reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get optimal animation settings based on device
export const getAnimationSettings = () => {
  const isMobile = isMobileDevice();
  const reducedMotion = prefersReducedMotion();

  return {
    shouldAnimate: !reducedMotion,
    shouldUseHeavyEffects: !isMobile && !reducedMotion,
    lerpValue: isMobile ? 0.15 : 0.08, // Faster lerp on mobile
    useSimpleBackground: isMobile,
  };
};
