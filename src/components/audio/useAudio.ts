'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { AudioRef } from '@/types/lesson'

interface UseAudioReturn {
  play: () => void
  pause: () => void
  isPlaying: boolean
  duration: number | null
  error: string | null
}

/**
 * Hook for playing a single audio file referenced by an AudioRef.
 *
 * Rules:
 * - Never auto-plays — always user-initiated.
 * - Sets error state if the audio file cannot be loaded.
 * - Cleans up the audio element on unmount.
 */
export function useAudio(audioRef: AudioRef): UseAudioReturn {
  const audioEl = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState<number | null>(audioRef.duration ?? null)
  const [error, setError] = useState<string | null>(null)

  // Build the public audio path from the AudioRef file path
  const src = audioRef.file.startsWith('/')
    ? audioRef.file
    : `/audio/${audioRef.file}`

  useEffect(() => {
    const audio = new Audio(src)
    audioEl.current = audio

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setError(null)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    const handleError = () => {
      setError(`Kāore e taea te tāhura i te kōrero: ${audioRef.file}`)
      setIsPlaying(false)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.pause()
      audioEl.current = null
    }
  }, [src, audioRef.file])

  const play = useCallback(() => {
    const audio = audioEl.current
    if (!audio) return
    setError(null)
    audio.play().then(() => {
      setIsPlaying(true)
    }).catch(() => {
      setError(`Kāore e taea te tāhura i te kōrero: ${audioRef.file}`)
      setIsPlaying(false)
    })
  }, [audioRef.file])

  const pause = useCallback(() => {
    const audio = audioEl.current
    if (!audio) return
    audio.pause()
    setIsPlaying(false)
  }, [])

  return { play, pause, isPlaying, duration, error }
}
