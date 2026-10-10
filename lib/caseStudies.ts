/**
 * Case-study content, layered on top of the Convex `projects` documents.
 *
 * Convex stays the source of truth for title, image, tags, repo and demo links.
 * This file adds the story the schema has no fields for. Each entry is keyed by
 * the Convex project title; a project without an entry still renders from its
 * Convex fields alone.
 *
 * Provenance: every statement below comes from the project's own repository
 * README (read 2026-10-10) or from the project's existing Convex text. No metrics,
 * user counts or outcomes are asserted beyond what those sources say.
 */

export type PlateKind = "pinned" | "diagram" | "pipeline";

export interface Beat {
  title: string;
  body: string;
  /** Where in the repo this lives, when the README names it */
  evidence?: string;
}

export interface Step {
  label: string;
  detail: string;
}

export interface CaseStudy {
  /** Must match the Convex project title (case-insensitive) */
  title: string;
  kind: PlateKind;
  kicker: string;
  summary: string;
  problem: string;
  beats?: Beat[];
  steps?: Step[];
  facts?: { label: string; value: string }[];
  /** Honest "where it stands", taken from the README */
  status?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    title: "Swasthya",
    kind: "pinned",
    kicker: "Computer vision / Telehealth / Full-stack",
    summary:
      "A camera-assisted rehabilitation coach. Patients do prescribed exercises at home while pose tracking runs in the browser and gives form feedback and repetition counts. Therapists prescribe plans, review sessions, chat and hold video consultations.",
    problem:
      "Patients recovering at home often exercise without supervision, which leads to incorrect movement and slower recovery.",
    beats: [
      {
        title: "Pose runs on the device",
        body: "MediaPipe's WebAssembly models turn every camera frame into 33 3D body landmarks inside the browser. No video is sent to the server.",
        evidence: "@mediapipe/tasks-vision",
      },
      {
        title: "Templates define correct; an engine judges",
        body: "Each exercise is a template: the joints that must be visible, the shape of a repetition, the form rules and the wording of every correction. A repetition counts only when its angle thresholds are met. If a joint can't be seen clearly, nothing is judged and the person is told how to reposition.",
        evidence: "lib/movement, hooks/useExerciseEngine.ts",
      },
      {
        title: "The language model never judges",
        body: "A Groq model is optional and can only reword confirmed facts or rewrite a session summary. The app works identically without it, and summaries are labelled automatic, never diagnostic.",
      },
      {
        title: "A realtime care loop",
        body: "Chat and WebRTC signalling run over native WebSockets inside the Next.js app, on a MongoDB-backed signal bus so users on different serverless instances still reach each other. Video is peer-to-peer; the server only relays signalling.",
        evidence: "app/api/ws, lib/realtime",
      },
      {
        title: "Idempotent by design",
        body: "Prescriptions are versioned and immutable. A set is saved in chunks, and the chunking logic ignores a chunk id it has already counted, so retries and double submits never double count.",
        evidence: "models/Prescription.ts, lib/rehab/chunking.ts",
      },
    ],
    facts: [
      { label: "Landmarks", value: "33, in 3D" },
      { label: "Exercises tracked", value: "7" },
      { label: "Video leaves the device", value: "No" },
      { label: "Test suites", value: "movement, rehab, realtime" },
    ],
    status:
      "Per the repository README: seven exercises are tracked today, and thresholds are defaults tuned on synthetic geometry that still need on-camera tuning and a physiotherapist's review.",
  },
  {
    title: "Orb",
    kind: "diagram",
    kicker: "Platform engineering / Full-stack",
    summary:
      "A self-hosted deployment platform, in the spirit of Vercel. Connect a GitHub repository and push: Orb builds it in a sandboxed Docker container, stores the artifact in MinIO and serves it on its own subdomain with automatic TLS.",
    problem:
      "A managed deploy platform does five jobs: pull code, build it safely, store the output, route traffic and stream logs. Orb implements each of them on infrastructure you own.",
    steps: [
      {
        label: "Push",
        detail:
          "A GitHub App integration triggers a deployment. The dashboard enqueues a build job on a BullMQ queue backed by Redis.",
      },
      {
        label: "Build",
        detail:
          "A worker clones the repository and builds it inside a sandboxed Docker container with configurable memory and CPU limits.",
      },
      {
        label: "Store",
        detail:
          "The artifact is uploaded to MinIO, S3-compatible object storage, and the deployment status is updated in PostgreSQL.",
      },
      {
        label: "Serve",
        detail:
          "An edge proxy resolves the domain to a project, downloads the artifact on first request, then serves static files or spawns an SSR Node process. Caddy provides wildcard subdomains with on-demand TLS.",
      },
    ],
    facts: [
      { label: "Services", value: "Dashboard, build worker, edge proxy" },
      { label: "Data", value: "PostgreSQL, Drizzle ORM" },
      { label: "Logs", value: "Socket.io over Redis pub/sub" },
      { label: "Repo layout", value: "npm workspaces monorepo" },
    ],
    status:
      "The README includes a step-by-step AWS EC2 deployment guide. Project environment variables are encrypted at rest.",
  },
  {
    title: "Finch AI",
    kind: "pipeline",
    kicker: "Machine learning / Full-stack",
    summary:
      "A banking intelligence platform. Upload a bank statement and get machine-learning product recommendations, then reach the customer by email, SMS or WhatsApp.",
    problem:
      "Bank statements arrive as PDFs. Finch extracts them, scores the financial behaviour inside, and recommends products: savings accounts, loans or credit cards.",
    steps: [
      {
        label: "Upload",
        detail:
          "PDF statements are parsed with PyMuPDF and pdfplumber, or an analyst can work through a guided step-by-step flow.",
      },
      {
        label: "Analyse",
        detail:
          "Scikit-learn and XGBoost models work on behavioural features. The repository documents feature importance and a correlation matrix.",
      },
      {
        label: "Recommend",
        detail:
          "Product suggestions across savings accounts, loans and credit cards, with Groq LLM-powered conversational insight.",
      },
      {
        label: "Reach out",
        detail: "Email through SendGrid; SMS and WhatsApp through Twilio.",
      },
      {
        label: "Sync",
        detail: "Convex keeps frontend and backend state in sync in real time.",
      },
    ],
    facts: [
      { label: "Frontend", value: "Next.js 16, TypeScript, Tailwind v4" },
      { label: "Backend", value: "Flask, Python" },
      { label: "Models", value: "scikit-learn, XGBoost" },
      { label: "Realtime", value: "Convex" },
    ],
  },
];

/**
 * Live demos that did not respond when checked on 2026-10-10. The UI shows
 * "Demo offline" instead of a link that goes nowhere. Delete an entry once the
 * demo is back (or fix the `liveLink` in Convex).
 */
export const offlineDemos: Record<string, string> = {
  orb: "No response on port 443 when checked 2026-10-10",
  "raga music player": "Returned 404 when checked 2026-10-10",
};

export const findCaseStudy = (title: string) =>
  caseStudies.find((c) => c.title.toLowerCase() === title.trim().toLowerCase());

export const demoOfflineNote = (title: string) => offlineDemos[title.trim().toLowerCase()];
