import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

const baseUrl = "https://tanmaymirgal.dev";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Tanmay Mirgal | AI & Full-Stack Architect",
    template: "%s | Tanmay Mirgal",
  },
  description: "Tanmay Mirgal - Architecting Intelligence. High-performance systems, AI/ML pipelines, and next-generation full-stack architectures.",
  keywords: ["Tanmay Mirgal", "AI Architect", "Full-Stack Developer", "Next.js Portfolio", "Software Engineer", "Machine Learning Engineer", "Deep Learning", "React Developer", "Node.js Architect"],
  authors: [{ name: "Tanmay Mirgal" }],
  creator: "Tanmay Mirgal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "Tanmay Mirgal | AI & Full-Stack Architect",
    description: "Architecting Intelligence. High-performance systems and AI solutions.",
    siteName: "Tanmay Mirgal Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Tanmay Mirgal | AI & Full-Stack Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanmay Mirgal | AI & Full-Stack Architect",
    description: "Architecting Intelligence. High-performance systems and AI solutions.",
    creator: "@tanmay_mirgal", // Replace with your actual handle if different
    images: ["/opengraph-image.png"],
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
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    google: "2KKUiYlMYJ4GsZxD02PtzCILc32zl9ApToVWlYXfJqQ",
  },
};

import { ConvexClientProvider } from "@/components/ConvexClientProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
