'use client'

import { useEffect, useRef } from 'react'

export default function GameplayPreview({ src, poster, title }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Wait for the visitor's motion preference before requesting autoplay.
    const updatePlayback = () => {
      video.autoplay = !motionPreference.matches
      if (motionPreference.matches) {
        video.pause()
      } else {
        video.play().catch(() => {})
      }
    }

    updatePlayback()
    motionPreference.addEventListener('change', updatePlayback)
    return () => motionPreference.removeEventListener('change', updatePlayback)
  }, [src])

  return (
    <video ref={videoRef} controls controlsList="nodownload" muted loop playsInline preload="none" poster={poster || undefined} aria-label={`${title} gameplay preview`}>
      <source src={src} type="video/mp4" />
      <a href={src}>Watch the {title} preview</a>
    </video>
  )
}
