/** Placeholder cards shown while a Convex query is still resolving. */
export function ListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div role="status" aria-live="polite" className="space-y-6">
      <span className="sr-only">Loading</span>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="poster-card animate-pulse space-y-4 p-6">
          <div className="h-4 w-28 rounded-full bg-paper/15" />
          <div className="h-6 w-2/3 bg-paper/15" />
          <div className="h-3 w-full max-w-xl bg-paper/10" />
        </div>
      ))}
    </div>
  );
}
