'use client'

import type { AudioRef } from '@/types/lesson'
import { useAudio } from './useAudio'

interface AudioPlayerProps {
  audioRef: AudioRef
  /** Optional visible label shown when audio errors or as a fallback. */
  fallbackLabel?: string
}

/**
 * Minimal audio play/pause button.
 *
 * - Inline SVG icons (no external icon dependency)
 * - Pulses while playing (CSS animation `pulseSoft` from globals.css)
 * - Shows fallback label if audio file cannot be loaded
 * - ARIA labels in te reo Māori: "Whakarongo" (listen) / "Tūturu" (pause)
 * - Never auto-plays
 */
export function AudioPlayer({ audioRef, fallbackLabel }: AudioPlayerProps) {
  const { play, pause, isPlaying, error } = useAudio(audioRef)

  const handleClick = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  // If there's an error loading the audio and we have a fallback label, show it
  if (error && fallbackLabel) {
    return (
      <span className="text-text-muted text-sm" lang="mi">
        {fallbackLabel}
      </span>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isPlaying ? 'Tūturu' : 'Whakarongo'}
      aria-pressed={isPlaying}
      className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-surface border border-border hover:bg-border/40 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
      style={
        isPlaying
          ? { animation: 'pulseSoft 1.4s ease-in-out infinite' }
          : undefined
      }
    >
      {isPlaying ? (
        /* Pause icon */
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="5" y="4" width="3" height="12" rx="1" fill="currentColor" />
          <rect x="12" y="4" width="3" height="12" rx="1" fill="currentColor" />
        </svg>
      ) : (
        /* Play icon */
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 4l12 6-12 6V4z" fill="currentColor" />
        </svg>
      )}
    </button>
  )
}
