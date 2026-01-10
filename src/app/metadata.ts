import type { Metadata } from "next";

const siteUrl = "https://mustafaa.xyz";
const name = "Mustafa Al-Mosuli";
const title = "Mustafa Al-Mosuli - Senior Backend Engineer | FastAPI & Microservices Specialist";
const description =
  "Senior Backend Engineer with 5+ years of experience architecting microservices, FastAPI platforms, and ERP integrations. Specialized in high-transaction fintech/telecom systems with 3M+ users. Expert in Python, Node.js, PostgreSQL, and Redis.";
const keywords = [
  "Backend Engineer",
  "Software Engineer Iraq",
  "FastAPI Developer",
  "Python Developer",
  "Microservices Architect",
  "PostgreSQL Expert",
  "Node.js Developer",
  "Baghdad Developer",
  "Senior Software Engineer",
  "Mustafa Al-Mosuli",
  "Fintech Engineer",
  "Telecom Systems",
  "ERP Integration",
  "Full Stack Engineer",
  "Redis Expert",
  "Docker",
  "AWS",
  "TypeScript",
  "Next.js",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${name}`,
  },
  description,
  keywords: keywords.join(", "),
  authors: [
    {
      name,
      url: siteUrl,
    },
  ],
  creator: name,
  publisher: name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_IQ", "ar_AE", "ar_SA"], // Arabic support for Iraq, UAE, Saudi Arabia
    url: siteUrl,
    title,
    description,
    siteName: name,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${name} - Backend Engineer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/og-image.jpg`],
    creator: "@mamer12", // Update with your Twitter handle if you have one
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
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
      "ar-IQ": siteUrl, // Arabic - Iraq
      "ar-AE": siteUrl, // Arabic - UAE
      "ar-SA": siteUrl, // Arabic - Saudi Arabia
      "ar": siteUrl,    // Generic Arabic
    },
  },
  verification: {
    google: "t4Ta58_fANjak8Ye7Nn8e_sYeUBkLg38KPl2BY8oQIA",
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};