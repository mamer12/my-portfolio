import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { metadata as siteMetadata, viewport } from "./metadata";
import { StructuredData } from "@/components/structured-data";
import { ClientLayout } from "@/components/layout/client-layout";
import { GridBackdrop } from "@/components/layout/grid-backdrop";

/**
 * Three families, each with one job — self-hosted by next/font, so there is no
 * render-blocking request to Google and no layout shift.
 *
 *   Bricolage Grotesque — display headlines (name, section titles). Wide
 *     apertures and ink traps give the glass page a voice that neither a
 *     serif nor a neutral grotesk has.
 *   Instrument Sans     — all UI and body copy. Quietly characterful,
 *     highly legible at text sizes.
 *   JetBrains Mono      — every label, figure, and readout; the only face
 *     here with true tabular numerals.
 */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = siteMetadata;
export { viewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${display.variable}`}
    >
      <body className="dark bg-ink text-fg antialiased">
        <StructuredData />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <GridBackdrop />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
