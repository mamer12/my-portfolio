"use client";

import { motion } from "motion/react";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Per-project architecture schematics.
 *
 * These stand in for screenshots. None of the three projects has shippable
 * imagery, and a generic mockup frame would say nothing - a diagram of the
 * actual system says what the project *is*, and suits a backend portfolio far
 * better than a phone render would.
 *
 * Design language: hairline 1px strokes, mono micro-labels on every node and
 * on any edge that carries meaning. SIGNAL (lime) is reserved for the
 * critical path, LINE (dim) for supporting structure, faint text for
 * annotation. Each diagram is composed to occupy the full 400x260 frame
 * deliberately: secondary nodes, queues, and axes fill what used to be empty
 * panel, leaving roughly 15% breathing margin at the edges.
 *
 * Motion: every path draws itself once on entry via `pathLength` (`draw`),
 * nodes pop in with a scale `pop`, and all text uses an opacity-only `fade`
 * so glyphs stay crisp (scaling text blurs it). After the draw-in, one or two
 * hero edges per diagram carry a pulse dot travelling the path via
 * <animateMotion> + <mpath>, which is declarative and cheap. When the user
 * prefers reduced motion the dot renders statically at the path start.
 */

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (index: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.1, delay: index * 0.08, ease: ease.outExpo },
      opacity: { duration: 0.2, delay: index * 0.08 },
    },
  }),
};

const pop = {
  hidden: { scale: 0, opacity: 0 },
  show: (index: number) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.3 + index * 0.07, ease: ease.outExpo },
  }),
};

/* Opacity-only entrance for text: a scale pop would leave glyphs blurred. */
const fade = {
  hidden: { opacity: 0 },
  show: (index: number) => ({
    opacity: 1,
    transition: { duration: 0.45, delay: 0.4 + index * 0.06, ease: ease.outExpo },
  }),
};

const SIGNAL = "rgb(var(--signal))";
const LINE = "rgb(var(--line-strong))";
const FAINT = "rgb(var(--fg-faint))";
const MONO = "monospace";

interface SchematicProps {
  id: string;
  className?: string;
}

/**
 * A pulse dot riding a signal edge forever. SMIL <animateMotion> keeps this
 * declarative: no JS loop, no extra paint work beyond the compositor. With
 * reduced motion the dot is pinned to the start of the path instead.
 */
function FlowPulse({
  pathId,
  dur,
  begin = "0s",
  start,
  reducedMotion,
}: {
  pathId: string;
  dur: string;
  begin?: string;
  start: { x: number; y: number };
  reducedMotion: boolean;
}) {
  if (reducedMotion) {
    return <circle cx={start.x} cy={start.y} r={2} fill={SIGNAL} />;
  }
  return (
    <circle r={2} fill={SIGNAL}>
      <animateMotion dur={dur} begin={begin} repeatCount="indefinite">
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </circle>
  );
}

export function ProjectSchematic({ id, className }: SchematicProps) {
  const reducedMotion = usePrefersReducedMotion();

  const shared = {
    className,
    viewBox: "0 0 400 260",
    fill: "none",
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: { once: true, amount: 0.4 },
    role: "img" as const,
  };

  if (id === "madhmoon") {
    const feeders = [
      { x: 58, label: "AUCTIONS" },
      { x: 140, label: "SHOPS" },
      { x: 222, label: "THRIFT" },
      { x: 304, label: "C2C" },
    ];

    return (
      <motion.svg {...shared} aria-label="Four marketplace verticals converging into one escrow node, queued orders flowing to settlement, ZainCash handling payment on the side">
        {/* feeder verticals: top tick, box, label, converge edge */}
        {feeders.map((feeder, index) => (
          <g key={feeder.label}>
            <motion.path
              d={`M ${feeder.x} 14 L ${feeder.x} 20`}
              stroke={LINE}
              strokeWidth={1}
              variants={draw}
              custom={index}
            />
            <motion.rect
              x={feeder.x - 28}
              y={20}
              width={56}
              height={30}
              stroke={LINE}
              strokeWidth={1}
              variants={pop}
              custom={index}
            />
            <motion.text
              x={feeder.x}
              y={38}
              textAnchor="middle"
              fill={FAINT}
              fontSize={7}
              fontFamily={MONO}
              letterSpacing={1.2}
              variants={fade}
              custom={index}
            >
              {feeder.label}
            </motion.text>
            <motion.path
              id={index === 1 ? "md-feed" : undefined}
              d={`M ${feeder.x} 50 L ${feeder.x} 88 L 190 116`}
              stroke={index === 1 ? SIGNAL : LINE}
              strokeWidth={1}
              variants={draw}
              custom={index}
            />
          </g>
        ))}

        {/* escrow: the critical node every vertical funnels through */}
        <motion.rect x={140} y={116} width={100} height={38} stroke={SIGNAL} strokeWidth={1} variants={pop} custom={5} />
        <motion.circle cx={190} cy={127} r={2} fill={SIGNAL} variants={pop} custom={6} />
        <motion.text x={190} y={143} textAnchor="middle" fill={SIGNAL} fontSize={8} fontFamily={MONO} letterSpacing={1.4} variants={fade} custom={7}>
          ESCROW
        </motion.text>

        {/* payment provider hanging off the escrow node */}
        <motion.path d="M 240 135 L 292 135" stroke={LINE} strokeWidth={1} variants={draw} custom={8} />
        <motion.text x={266} y={129} textAnchor="middle" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.1} variants={fade} custom={9}>
          CHARGE
        </motion.text>
        <motion.rect x={292} y={122} width={52} height={26} stroke={LINE} strokeWidth={1} variants={pop} custom={9} />
        <motion.text x={318} y={138} textAnchor="middle" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.1} variants={fade} custom={10}>
          ZAINCASH
        </motion.text>

        {/* funds release downward once both sides settle */}
        <motion.path id="md-settle" d="M 190 154 L 190 198" stroke={SIGNAL} strokeWidth={1} strokeDasharray="3 4" variants={draw} custom={6} />
        <motion.text x={200} y={180} textAnchor="start" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.1} variants={fade} custom={8}>
          FUNDS HELD
        </motion.text>
        <motion.rect x={130} y={198} width={120} height={32} stroke={LINE} strokeWidth={1} variants={pop} custom={7} />
        <motion.text x={190} y={217} textAnchor="middle" fill={FAINT} fontSize={8} fontFamily={MONO} letterSpacing={1.4} variants={fade} custom={8}>
          SETTLEMENT
        </motion.text>

        {/* order queue feeding settlement from the side */}
        {[0, 1, 2].map((square) => (
          <motion.rect
            key={square}
            x={52 + square * 16}
            y={208}
            width={10}
            height={10}
            stroke={LINE}
            strokeWidth={1}
            variants={pop}
            custom={8 + square}
          />
        ))}
        <motion.path d="M 94 213 L 130 213" stroke={LINE} strokeWidth={1} variants={draw} custom={9} />
        <motion.text x={73} y={232} textAnchor="middle" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.1} variants={fade} custom={10}>
          ORDERS
        </motion.text>

        {/* living flow: one pulse into escrow, one down to settlement */}
        <motion.g variants={fade} custom={11}>
          <FlowPulse pathId="md-feed" dur="3s" start={{ x: 140, y: 50 }} reducedMotion={reducedMotion} />
        </motion.g>
        <motion.g variants={fade} custom={12}>
          <FlowPulse pathId="md-settle" dur="2.6s" begin="1.1s" start={{ x: 190, y: 154 }} reducedMotion={reducedMotion} />
        </motion.g>
      </motion.svg>
    );
  }

  if (id === "zuwada") {
    return (
      <motion.svg {...shared} aria-label="Flutter app calling a Go core over a generated OpenAPI client, fanning out to storefront, plan, and booking domains on PostgreSQL">
        {/* client app */}
        <motion.rect x={20} y={88} width={72} height={44} stroke={LINE} strokeWidth={1} variants={pop} custom={0} />
        <motion.text x={56} y={107} textAnchor="middle" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.2} variants={fade} custom={1}>
          FLUTTER
        </motion.text>
        <motion.text x={56} y={119} textAnchor="middle" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.2} variants={fade} custom={1}>
          APP
        </motion.text>

        {/* contract edge: OpenAPI above, generated client below */}
        <motion.path id="zw-req" d="M 92 110 L 140 110" stroke={SIGNAL} strokeWidth={1} variants={draw} custom={2} />
        <motion.path d="M 134 105 L 140 110 L 134 115" stroke={SIGNAL} strokeWidth={1} variants={draw} custom={2} />
        <motion.text x={116} y={100} textAnchor="middle" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.1} variants={fade} custom={3}>
          OPENAPI
        </motion.text>
        <motion.text x={116} y={126} textAnchor="middle" fill={FAINT} fontSize={6.5} fontFamily={MONO} letterSpacing={0.9} variants={fade} custom={3}>
          GEN CLIENT
        </motion.text>

        {/* Go core */}
        <motion.rect x={140} y={76} width={88} height={68} stroke={SIGNAL} strokeWidth={1} variants={pop} custom={3} />
        <motion.text x={184} y={104} textAnchor="middle" fill={SIGNAL} fontSize={8} fontFamily={MONO} letterSpacing={1.4} variants={fade} custom={4}>
          GO CORE
        </motion.text>
        <motion.text x={184} y={120} textAnchor="middle" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.2} variants={fade} custom={4}>
          HUB
        </motion.text>

        {/* fan-out to the three domains */}
        {[
          { y: 49, label: "STOREFRONTS", custom: 5 },
          { y: 111, label: "PLANS", custom: 6 },
          { y: 173, label: "BOOKINGS", custom: 7 },
        ].map((domain) => (
          <motion.g key={domain.label}>
            <motion.path
              d={`M 228 110 L 258 110 L 258 ${domain.y} L 288 ${domain.y}`}
              stroke={LINE}
              strokeWidth={1}
              variants={draw}
              custom={domain.custom}
            />
            <motion.rect
              x={288}
              y={domain.y - 15}
              width={92}
              height={30}
              stroke={LINE}
              strokeWidth={1}
              variants={pop}
              custom={domain.custom}
            />
            <motion.text
              x={334}
              y={domain.y + 3}
              textAnchor="middle"
              fill={FAINT}
              fontSize={7}
              fontFamily={MONO}
              letterSpacing={1.2}
              variants={fade}
              custom={domain.custom + 1}
            >
              {domain.label}
            </motion.text>
          </motion.g>
        ))}

        {/* persistence */}
        <motion.path d="M 184 144 L 184 196" stroke={LINE} strokeWidth={1} strokeDasharray="3 4" variants={draw} custom={8} />
        <motion.rect x={140} y={196} width={88} height={32} stroke={LINE} strokeWidth={1} variants={pop} custom={9} />
        <motion.text x={184} y={216} textAnchor="middle" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.2} variants={fade} custom={10}>
          POSTGRESQL
        </motion.text>

        {/* living flow: request pulse from app into the core */}
        <motion.g variants={fade} custom={11}>
          <FlowPulse pathId="zw-req" dur="2.6s" start={{ x: 92, y: 110 }} reducedMotion={reducedMotion} />
        </motion.g>
      </motion.svg>
    );
  }

  if (id === "smart-search") {
    return (
      <motion.svg {...shared} aria-label="Free-text Arabic listings consumed by an LLM extraction layer, split into pgvector and SQL filter branches that converge in hybrid retrieval">
        {/* raw input: ragged free-text lines */}
        <motion.text x={20} y={70} textAnchor="start" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.1} variants={fade} custom={0}>
          FREE-TEXT AR LISTINGS
        </motion.text>
        {[0, 1, 2, 3, 4].map((row) => (
          <motion.path
            key={row}
            d={`M 20 ${80 + row * 12} L ${50 + (row % 3) * 16} ${80 + row * 12}`}
            stroke={LINE}
            strokeWidth={1}
            variants={draw}
            custom={row}
          />
        ))}

        {/* into the model layer */}
        <motion.path id="ss-in" d="M 92 104 L 132 104" stroke={SIGNAL} strokeWidth={1} variants={draw} custom={5} />
        <motion.path d="M 126 99 L 132 104 L 126 109" stroke={SIGNAL} strokeWidth={1} variants={draw} custom={5} />
        <motion.text x={112} y={96} textAnchor="middle" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.1} variants={fade} custom={5}>
          CONSUME
        </motion.text>

        {/* provider-agnostic extraction: cloud default, local fallback */}
        <motion.rect x={132} y={64} width={100} height={76} stroke={SIGNAL} strokeWidth={1} variants={pop} custom={5} />
        <motion.text x={182} y={56} textAnchor="middle" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.4} variants={fade} custom={6}>
          EXTRACTION
        </motion.text>
        <motion.path d="M 132 102 L 232 102" stroke={LINE} strokeWidth={1} strokeDasharray="2 3" variants={draw} custom={6} />
        <motion.text x={176} y={88} textAnchor="middle" fill={SIGNAL} fontSize={7} fontFamily={MONO} letterSpacing={1.2} variants={fade} custom={7}>
          GEMINI
        </motion.text>
        <motion.text x={226} y={88} textAnchor="end" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.1} variants={fade} custom={7}>
          CLOUD
        </motion.text>
        <motion.text x={176} y={126} textAnchor="middle" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.2} variants={fade} custom={8}>
          OLLAMA
        </motion.text>
        <motion.text x={226} y={126} textAnchor="end" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.1} variants={fade} custom={8}>
          LOCAL
        </motion.text>

        {/* split: embeddings go up, structured fields go down */}
        <motion.path id="ss-vec" d="M 232 102 L 258 102 L 258 46 L 284 46" stroke={SIGNAL} strokeWidth={1} variants={draw} custom={7} />
        <motion.text x={252} y={62} textAnchor="end" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.1} variants={fade} custom={8}>
          EMBED
        </motion.text>
        <motion.path d="M 258 102 L 258 174 L 288 174" stroke={LINE} strokeWidth={1} variants={draw} custom={8} />
        <motion.text x={252} y={152} textAnchor="end" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.1} variants={fade} custom={9}>
          FIELDS
        </motion.text>

        {/* pgvector node: dashed boundary around a cluster of embeddings */}
        <motion.rect x={284} y={26} width={60} height={36} stroke={LINE} strokeWidth={1} strokeDasharray="2 3" variants={pop} custom={8} />
        {[0, 1, 2, 3, 4, 5].map((dot) => (
          <motion.circle
            key={dot}
            cx={298 + (dot % 3) * 16}
            cy={38 + Math.floor(dot / 3) * 13}
            r={2.5}
            fill={SIGNAL}
            opacity={0.8}
            variants={pop}
            custom={9 + dot}
          />
        ))}
        <motion.text x={314} y={74} textAnchor="middle" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.2} variants={fade} custom={9}>
          PGVECTOR
        </motion.text>

        {/* structured filters node */}
        {[0, 1, 2].map((row) => (
          <motion.rect
            key={row}
            x={288}
            y={160 + row * 11}
            width={52}
            height={7}
            stroke={LINE}
            strokeWidth={1}
            variants={pop}
            custom={10 + row}
          />
        ))}
        <motion.text x={314} y={202} textAnchor="middle" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.2} variants={fade} custom={12}>
          SQL FILTERS
        </motion.text>

        {/* both branches converge on the retrieval node */}
        <motion.path d="M 344 46 L 365 102" stroke={SIGNAL} strokeWidth={1} variants={draw} custom={10} />
        <motion.path d="M 340 174 L 365 116" stroke={LINE} strokeWidth={1} variants={draw} custom={11} />
        <motion.circle cx={368} cy={109} r={8} stroke={SIGNAL} strokeWidth={1} variants={pop} custom={12} />
        <motion.circle cx={368} cy={109} r={2} fill={SIGNAL} variants={pop} custom={13} />
        <motion.text x={356} y={103} textAnchor="end" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.1} variants={fade} custom={13}>
          HYBRID
        </motion.text>
        <motion.text x={356} y={113} textAnchor="end" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.1} variants={fade} custom={14}>
          RETRIEVAL
        </motion.text>

        {/* pipeline axis: the four stages as a ruler along the bottom */}
        <motion.path d="M 24 224 L 376 224" stroke={LINE} strokeWidth={1} variants={draw} custom={13} />
        <motion.path d="M 50 220 L 50 228 M 182 220 L 182 228 M 296 220 L 296 228 M 368 220 L 368 228" stroke={LINE} strokeWidth={1} variants={draw} custom={13} />
        {[
          { x: 50, label: "PARSE" },
          { x: 182, label: "EXTRACT" },
          { x: 296, label: "RETRIEVE" },
          { x: 368, label: "RANK" },
        ].map((tick, index) => (
          <motion.text
            key={tick.label}
            x={tick.x}
            y={242}
            textAnchor="middle"
            fill={FAINT}
            fontSize={7}
            fontFamily={MONO}
            letterSpacing={1.1}
            variants={fade}
            custom={14 + index}
          >
            {tick.label}
          </motion.text>
        ))}

        {/* living flow: into the model layer, then out along the vector branch */}
        <motion.g variants={fade} custom={18}>
          <FlowPulse pathId="ss-in" dur="2.8s" start={{ x: 92, y: 104 }} reducedMotion={reducedMotion} />
        </motion.g>
        <motion.g variants={fade} custom={19}>
          <FlowPulse pathId="ss-vec" dur="3.2s" begin="0.8s" start={{ x: 232, y: 102 }} reducedMotion={reducedMotion} />
        </motion.g>
      </motion.svg>
    );
  }

  // bunyan - five stakeholders around one hub, real-time data model below.
  // Edges are trimmed to run from each node circle to the hub border.
  const nodes = [
    { x: 200, y: 40, label: "INVESTOR", edge: "M 200 48 L 200 108", hero: true },
    { x: 340, y: 108, label: "DEVELOPER", edge: "M 332 109 L 240 122", hero: false },
    { x: 286, y: 214, label: "CONTRACTOR", edge: "M 280 208 L 220 148", hero: false },
    { x: 114, y: 214, label: "BUYER", edge: "M 120 208 L 180 148", hero: false },
    { x: 60, y: 108, label: "GOVERNMENT", edge: "M 68 109 L 160 122", hero: false },
  ];

  return (
    <motion.svg {...shared} aria-label="Five stakeholder groups connected through a central Bunyan hub, synced with a Convex real-time data model">
      {nodes.map((node, index) => (
        <motion.path
          key={node.label}
          id={node.hero ? "bn-investor" : undefined}
          d={node.edge}
          stroke={node.hero ? SIGNAL : LINE}
          strokeWidth={1}
          variants={draw}
          custom={index}
        />
      ))}

      {nodes.map((node, index) => (
        <g key={`${node.label}-node`}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={5}
            stroke={SIGNAL}
            strokeWidth={1}
            variants={pop}
            custom={index}
          />
          <motion.text
            x={node.x}
            y={node.y - 12}
            textAnchor="middle"
            fill={FAINT}
            fontSize={7}
            fontFamily={MONO}
            letterSpacing={1.1}
            variants={fade}
            custom={index + 1}
          >
            {node.label}
          </motion.text>
        </g>
      ))}

      {/* the shared hub every party talks to */}
      <motion.rect x={160} y={108} width={80} height={40} stroke={SIGNAL} strokeWidth={1} variants={pop} custom={6} />
      <motion.circle cx={200} cy={118} r={2} fill={SIGNAL} variants={pop} custom={7} />
      <motion.text x={200} y={135} textAnchor="middle" fill={SIGNAL} fontSize={8} fontFamily={MONO} letterSpacing={1.4} variants={fade} custom={7}>
        BUNYAN
      </motion.text>

      {/* convex real-time data model underneath, kept in sync */}
      <motion.path d="M 200 148 L 200 196" stroke={LINE} strokeWidth={1} strokeDasharray="3 4" variants={draw} custom={7} />
      <motion.text x={210} y={176} textAnchor="start" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.1} variants={fade} custom={8}>
        SYNC
      </motion.text>
      <motion.rect x={168} y={196} width={64} height={28} stroke={LINE} strokeWidth={1} variants={pop} custom={8} />
      <motion.text x={200} y={213} textAnchor="middle" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.2} variants={fade} custom={9}>
        CONVEX
      </motion.text>
      <motion.text x={200} y={238} textAnchor="middle" fill={FAINT} fontSize={7} fontFamily={MONO} letterSpacing={1.1} variants={fade} custom={10}>
        REAL-TIME DATA
      </motion.text>

      {/* living flow: one pulse down the investor edge into the hub */}
      <motion.g variants={fade} custom={11}>
        <FlowPulse pathId="bn-investor" dur="3s" start={{ x: 200, y: 48 }} reducedMotion={reducedMotion} />
      </motion.g>
    </motion.svg>
  );
}
