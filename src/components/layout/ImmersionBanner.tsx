'use client'

/**
 * ImmersionBanner — persistent reminder that learning pages are Māori-only.
 *
 * Displayed at the top of the (learning) layout.
 * All text is in te reo Māori per immersion rules.
 */
export function ImmersionBanner() {
  return (
    <div
      role="banner"
      aria-label="Kōrero Māori anake"
      className="bg-accent text-white text-center text-sm py-1.5 px-4"
      lang="mi"
    >
      <span className="font-semibold">Kōrero Māori</span>
      <span className="mx-2 opacity-60">·</span>
      <span className="opacity-90">Ko te reo Māori anake i konei</span>
    </div>
  )
}
