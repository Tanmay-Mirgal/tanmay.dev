import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

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
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${jetbrainsMono.variable} antialiased`} style={{ background: "#030305", color: "#f8f8f8" }}>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
