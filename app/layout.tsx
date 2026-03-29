import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans, Unbounded } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tanmay.dev"),
  title: {
    default: "Portfolio — Full Stack & ML Engineer",
    template: "%s | Portfolio — Full Stack & ML Engineer",
  },
  description:
    "Modern portfolio website for a Full-Stack & ML Engineer focused on scalable apps, DevOps, and production-grade software systems.",
  keywords: [
    "Full Stack Developer",
    "ML Engineer",
    "Portfolio",
    "React",
    "Node.js",
    "TensorFlow",
    "DevOps",
    "India Developer",
  ],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    title: "Portfolio — Full Stack & ML Engineer",
    description:
      "Scalable full-stack applications, ML systems, and production-grade DevOps workflows.",
    url: "https://tanmay.dev",
    siteName: "Portfolio",
    images: [{ url: "/DeepMind.png", width: 1200, height: 630, alt: "Portfolio cover" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio — Full Stack & ML Engineer",
    description:
      "Scalable full-stack applications, ML systems, and production-grade DevOps workflows.",
    images: ["/DeepMind.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: [{ url: "/DeepMind.png", type: "image/png", sizes: "32x32" }],
  alternates: {
    canonical: "https://tanmay.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${unbounded.variable} ${plusJakarta.variable} ${dmSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
