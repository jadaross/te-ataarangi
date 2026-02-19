/**
 * Loading skeleton for individual lesson pages.
 * Displayed while the whiti data is being fetched.
 * Māori only (learning route).
 */
export default function WhitiLoading() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <p
        className="text-text-muted text-base animate-pulse"
        lang="mi"
        aria-live="polite"
        aria-busy="true"
      >
        E tīkina ana…
      </p>

      {/* Skeleton placeholders */}
      <div className="mt-8 space-y-4" aria-hidden="true">
        <div className="h-6 w-1/3 rounded bg-surface animate-pulse" />
        <div className="h-40 w-full rounded-xl bg-surface animate-pulse" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-12 rounded-xl bg-surface animate-pulse" />
          <div className="h-12 rounded-xl bg-surface animate-pulse" />
          <div className="h-12 rounded-xl bg-surface animate-pulse" />
          <div className="h-12 rounded-xl bg-surface animate-pulse" />
        </div>
      </div>
    </div>
  )
}
