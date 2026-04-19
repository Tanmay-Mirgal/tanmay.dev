import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tanmay Mirgal | AI & Full-Stack Architect",
    short_name: "Tanmay Portfolio",
    description: "Architecting Intelligence - High-performance systems and AI solutions by Tanmay Mirgal.",
    start_url: "/",
    display: "standalone",
    background_color: "#030305",
    theme_color: "#D4AF37",
    icons: [
      {
        src: "/favicon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
