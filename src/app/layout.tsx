import "./globals.css";
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'
import type { Metadata } from "next";
import { metadata as siteMetadata, viewport } from "./metadata";
import StructuredData from "@/components/structured-data";
import ClientLayout from "@/components/client-layout";

export const metadata: Metadata = siteMetadata;
export { viewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <StructuredData />
      </head>
      <body className="dark relative bg-[#0a0a0a] text-white font-sans overflow-x-hidden m-0 p-0 w-full">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}