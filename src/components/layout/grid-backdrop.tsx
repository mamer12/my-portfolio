/**
 * Fixed page substrate: a dot matrix, two slowly drifting signal blooms, and
 * film grain.
 *
 * This previously drew 12 fixed vertical column rules, which were removed and
 * should not come back in that form:
 *
 *   - Being `fixed`, they did not scroll with the content, so they slid across
 *     body copy and read as a rendering artifact rather than as structure.
 *   - They marked all 12 cell edges, but sections span 7/5 and 4/2/2, so most
 *     rules landed mid-word instead of on a real column boundary.
 *
 * A dot matrix solves the problem the rules were meant to solve — giving the
 * page a measured surface instead of flat black — without that failure mode. A
 * 1px dot at 7% never bisects a glyph the way a continuous line does. The
 * blooms supply the slow movement that keeps the page from feeling inert.
 *
 * Server component — no interactivity, so it costs nothing on the client.
 */
export function GridBackdrop() {
  return (
    <div
      className="grain pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Matrix, faded toward the edges so it never ends on a hard boundary. */}
      <div
        className="dot-matrix absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse 90% 75% at 50% 40%, #000 25%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 75% at 50% 40%, #000 25%, transparent 95%)",
        }}
      />

      {/* Aurora blooms — cyan lead, violet counterweight, a faint magenta
          bridge. These are what the glass surfaces blur and saturate, so they
          carry more chroma than the old single-accent blooms did.
          `motion-reduce:animate-none` rather than a JS check — the whole layer
          is decorative and never needs to reach the client. */}
      <div className="absolute left-[2%] top-[-16%] h-[80vh] w-[72vw] animate-drift-a rounded-full bg-[radial-gradient(circle,rgb(var(--signal)/0.075),transparent_62%)] blur-3xl motion-reduce:animate-none" />
      <div className="absolute bottom-[-22%] right-[-12%] h-[70vh] w-[60vw] animate-drift-b rounded-full bg-[radial-gradient(circle,rgb(var(--violet)/0.07),transparent_65%)] blur-3xl motion-reduce:animate-none" />
      <div className="absolute left-[36%] top-[32%] h-[50vh] w-[44vw] animate-drift-b rounded-full bg-[radial-gradient(circle,rgb(217_120_255/0.03),transparent_68%)] blur-3xl motion-reduce:animate-none" />
      <div className="absolute right-[18%] top-[4%] h-[36vh] w-[30vw] animate-drift-a rounded-full bg-[radial-gradient(circle,rgb(var(--signal-deep)/0.045),transparent_70%)] blur-3xl motion-reduce:animate-none" />
    </div>
  );
}
