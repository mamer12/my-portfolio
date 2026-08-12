/**
 * Route-level loading state.
 *
 * Mirrors the preloader's resting frame so a navigation never flashes a
 * different visual language than the boot sequence.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-end bg-ink px-[var(--gutter)] py-8">
      <div className="w-full">
        <p className="numeric text-mega leading-[0.8] text-fg-faint/30">
          000<span className="text-signal/40">%</span>
        </p>
        <div className="mt-6 h-px w-full bg-line" />
      </div>
    </div>
  );
}
