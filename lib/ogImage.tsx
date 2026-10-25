import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { JOB_TITLE, PORTRAIT_PATH, SITE_URL } from "@/lib/site";

export const OG_ALT = "Tanmay Mirgal, full-stack and AI engineer";
export const OG_SIZE = { width: 1200, height: 630 } as const;

// The site's poster palette (app/globals.css).
const CREAM = "#f3efe4";
const INK = "#0f0f0f";
const BLUE = "#2c4bff";
const YELLOW = "#ffd84a";

/**
 * The share card for link previews (Open Graph and Twitter): the hero from the page, in the
 * page's own type and colours. Drawn at build time, so it costs nothing per request.
 */
export async function renderOgImage() {
  const [font, portrait] = await Promise.all([
    readFile(
      path.join(process.cwd(), "node_modules/@fontsource/archivo-black/files/archivo-black-latin-400-normal.woff")
    ),
    readFile(path.join(process.cwd(), "public", PORTRAIT_PATH)),
  ]);
  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;
  const host = SITE_URL.replace(/^https?:\/\//, "");

  const name = {
    fontSize: 200,
    lineHeight: 0.92,
    letterSpacing: -9,
    textTransform: "uppercase" as const,
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: CREAM,
          color: INK,
          fontFamily: "Archivo Black",
        }}
      >
        <div style={{ flex: 1, display: "flex", position: "relative", padding: "52px 72px 0" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", ...name }}>Tanmay</div>
            <div style={{ display: "flex", marginTop: 14 }}>
              <div
                style={{
                  display: "flex",
                  ...name,
                  padding: "0 22px 8px",
                  background: BLUE,
                  color: CREAM,
                  border: `8px solid ${INK}`,
                  boxShadow: `10px 10px 0 ${INK}`,
                  transform: "rotate(-1.2deg)",
                }}
              >
                Mirgal
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              top: 40,
              right: 80,
              width: 270,
              height: 270,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: 40,
              borderRadius: 135,
              background: YELLOW,
              border: `8px solid ${INK}`,
              boxShadow: `12px 12px 0 ${INK}`,
              transform: "rotate(12deg)",
              fontSize: 34,
              lineHeight: 1.05,
              textTransform: "uppercase",
              letterSpacing: -1,
            }}
          >
            {JOB_TITLE}
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img, not next/image */}
          <img
            src={portraitSrc}
            width={150}
            height={150}
            alt=""
            style={{
              position: "absolute",
              top: 370,
              right: 150,
              borderRadius: 75,
              border: `8px solid ${INK}`,
              boxShadow: `8px 8px 0 ${INK}`,
              objectFit: "cover",
            }}
          />
        </div>

        <div
          style={{
            height: 88,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 72px",
            background: INK,
            color: CREAM,
            fontSize: 34,
            letterSpacing: -0.5,
          }}
        >
          <div style={{ display: "flex" }}>{host}</div>
          <div
            style={{
              display: "flex",
              padding: "6px 20px",
              background: YELLOW,
              color: INK,
              fontSize: 26,
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: "Archivo Black", data: font, weight: 400, style: "normal" }],
    }
  );
}
