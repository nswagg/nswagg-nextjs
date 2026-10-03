import Image from 'next/image'
import GameplayPreview from './GameplayPreview'
import styles from '@/app/notebook.module.css'

function ProjectCover({ project, featured }) {
  return (
    <div className={styles.cover} data-cover={project.coverStyle}>
      {project.previewVideo ? (
        <GameplayPreview src={project.previewVideo} poster={project.image} title={project.title} />
      ) : project.image ? (
        <Image src={project.image} alt={project.imageAlt || `${project.title} cover`} fill sizes="(max-width: 760px) calc(100vw - 64px), (max-width: 1120px) 45vw, 480px" preload={featured} />
      ) : (
        <div className={styles.illustration} aria-hidden="true">
          {project.coverStyle === 'planes' ? <><span className={styles.trail} /><span className={styles.plane} /></> : project.coverStyle === 'drifter' ? <><span className={styles.track} /><span className={styles.racer} /></> : <span className={styles.coverTitle}>{project.title}</span>}
        </div>
      )}
    </div>
  )
}

export default function ProjectCard({ project, featured = false }) {
  const Heading = featured ? 'h2' : 'h3'

  return (
    <article className={featured ? styles.feature : styles.project} aria-labelledby={`project-${project.id}`}>
      {featured && <span className={styles.tape} aria-hidden="true" />}
      <ProjectCover project={project} featured={featured} />
      <div className={styles.cardCopy}>
        <p className={styles.eyebrow}>{project.category} / {project.status}</p>
        <Heading id={`project-${project.id}`}>{project.title}</Heading>
        <p>{project.description}</p>
        {project.credit && <p className={styles.credit}>{project.credit}</p>}
        <div className={styles.actions}>
          {project.links.map((link, index) => (
            <a key={link.href} className={featured && index === 0 ? styles.button : styles.textLink} href={link.href}>
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}
