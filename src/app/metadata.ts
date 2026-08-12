import type { Metadata } from "next";
import { site } from "@/lib/content";

const title = `${site.name} — Senior Backend & AI Engineer | Microservices, Event-Driven Systems, AI-Native Development`;

const description =
  "Senior Backend & AI Engineer with six years building production systems across telecom and fintech. Currently serving a 10M+ subscriber base at Zain Iraq. Python/FastAPI and Node.js/TypeScript microservices, event pipelines at 10,000+ messages per second, PostgreSQL at scale, and AI-native engineering with Claude Code, Gemini, and Codex.";

const keywords = [
  "Senior Backend Engineer",
  "AI Engineer",
  "AI-Native Developer",
  "Claude Code",
  "LLM Pipelines",
  "Backend Engineer Iraq",
  "FastAPI Developer",
  "Python Backend Engineer",
  "Node.js Engineer",
  "Microservices Architect",
  "Event-Driven Architecture",
  "PostgreSQL Expert",
  "Kafka Engineer",
  "Data Migration Engineer",
  "Baghdad Software Engineer",
  "Fintech Backend Engineer",
  "Telecom Systems Engineer",
  "ERP Integration",
  "BPMN Workflow Automation",
  "Loan Management Systems",
  site.name,
  site.altName,
];

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description,
  keywords: keywords.join(", "),
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    alternateLocale: ["ar_IQ", "ar_AE", "ar_SA"],
    url: site.url,
    title,
    description,
    siteName: site.name,
    images: [
      {
        url: `${site.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${site.name} — Senior Backend & AI Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${site.url}/og-image.jpg`],
    creator: "@mamer12",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: site.url,
    languages: {
      "en-US": site.url,
      "ar-IQ": site.url,
      "ar-AE": site.url,
      "ar-SA": site.url,
      ar: site.url,
    },
  },
  verification: {
    google: "t4Ta58_fANjak8Ye7Nn8e_sYeUBkLg38KPl2BY8oQIA",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#08090a" }],
};
