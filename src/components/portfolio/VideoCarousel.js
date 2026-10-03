'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from '@/app/notebook.module.css'

export default function VideoCarousel({ videos, channelHref }) {
  const [index, setIndex] = useState(0)
  const video = videos[index]

  if (!video) return null

  return (
    <section id="videos" className={`${styles.section} ${styles.videoSection}`} aria-labelledby="videos-heading" aria-roledescription="carousel">
      <div className={styles.sectionHeading}>
        <div>
          <h2 id="videos-heading">From YouTube</h2>
          <p className={styles.eyebrow}>Last {videos.length === 3 ? 'three' : videos.length} uploads</p>
        </div>
        <div className={styles.carouselControls}>
          <button type="button" className={styles.arrow} onClick={() => setIndex(index - 1)} disabled={index === 0} aria-label="Previous video" aria-controls="current-video">←</button>
          <span className={styles.counter} aria-live="polite" aria-atomic="true">{index + 1} / {videos.length}</span>
          <button type="button" className={styles.arrow} onClick={() => setIndex(index + 1)} disabled={index === videos.length - 1} aria-label="Next video" aria-controls="current-video">→</button>
        </div>
      </div>
      <article id="current-video" className={styles.videoCard} aria-roledescription="slide" aria-label={`Video ${index + 1} of ${videos.length}`}>
        <a className={styles.videoCover} href={video.href} aria-label={`Watch ${video.title}`}>
          <Image key={video.id} src={video.image} alt="" fill sizes="(max-width: 760px) calc(100vw - 88px), 400px" />
          <span className={styles.playBadge} aria-hidden="true">▶</span>
        </a>
        <div className={styles.videoCopy} aria-live="polite" aria-atomic="true">
          <p className={styles.eyebrow}>{video.category}{video.duration && ` / ${video.duration}`}</p>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
          <a className={styles.textLink} href={video.href}>Watch on YouTube <span aria-hidden="true">↗</span></a>
        </div>
      </article>
      <a className={`${styles.textLink} ${styles.channelLink}`} href={channelHref}>Browse the channel <span aria-hidden="true">↗</span></a>
    </section>
  )
}
