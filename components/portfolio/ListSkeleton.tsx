/** Placeholder rows shown while a Convex query is still resolving. */
export function ListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div role="status" aria-live="polite" className="border-t border-line">
      <span className="sr-only">Loading</span>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-4 border-b border-line py-10">
          <div className="h-3 w-24 bg-paper/10" />
          <div className="h-7 w-2/3 bg-paper/10" />
          <div className="h-3 w-full max-w-xl bg-paper/5" />
        </div>
      ))}
    </div>
  );
}
