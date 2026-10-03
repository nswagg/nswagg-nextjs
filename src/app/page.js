import Image from 'next/image'
import { Caveat } from 'next/font/google'
import ProjectCard from '@/components/portfolio/ProjectCard'
import VideoCarousel from '@/components/portfolio/VideoCarousel'
import { profile, projects, videos, writing } from '@/data/portfolio'
import styles from './notebook.module.css'

const notebookFont = Caveat({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-notebook', display: 'swap' })

export default function Landing() {
  const featured = projects.find(project => project.featured)
  const otherProjects = projects.filter(project => project !== featured)

  return (
    <div className={`${styles.notebook} ${notebookFont.variable}`}>
      <div className={styles.page}>
        <a className={styles.skipLink} href="#home">Skip to content</a>
        <header className={styles.header}>
          <a className={styles.brand} href="#home">
            <Image src="/icons/paper-plane.svg" alt="" width={38} height={38} unoptimized />
            {profile.name}
          </a>
          <nav className={styles.nav} aria-label="Main navigation">
            <a href="#projects">Projects</a>
            <a href="#videos">Videos</a>
            <a href="#writing">Writing</a>
            <a href="#about">About</a>
          </nav>
        </header>
      </div>

      <div className={styles.ruledPaper}>
        <div className={styles.page}>
          <main id="home">
            <section className={styles.hero} aria-labelledby="intro-heading">
              <div>
                <p className={styles.eyebrow}>nswagg / software, games &amp; videos</p>
                <h1 id="intro-heading">Games, projects,<br />and a few <span className={styles.underline}>ideas.</span></h1>
                <p className={styles.introduction}>{profile.introduction}</p>
                <div className={styles.actions}>
                  <a className={styles.button} href="#projects">Explore the projects <span aria-hidden="true">↗</span></a>
                  <a className={styles.textLink} href={profile.links.linkedin}>Professional background <span aria-hidden="true">↗</span></a>
                </div>
              </div>
              {featured && <ProjectCard project={featured} featured />}
            </section>

            <section id="projects" className={styles.section} aria-labelledby="projects-heading">
              <div className={styles.sectionHeading}>
                <h2 id="projects-heading">Games &amp; demos</h2>
                <a className={styles.textLink} href={profile.links.itch}>My itch.io page <span aria-hidden="true">↗</span></a>
              </div>
              <div className={styles.projectGrid}>
                {otherProjects.map(project => <ProjectCard key={project.id} project={project} />)}
              </div>
            </section>

            <VideoCarousel videos={videos.slice(0, 3)} channelHref={profile.links.youtube} />

            <div className={styles.lower}>
              <section id="writing" className={styles.section} aria-labelledby="writing-heading">
                <h2 id="writing-heading">Writing</h2>
                <ul className={styles.writingList}>
                  {writing.map(entry => (
                    <li key={entry.href}>
                      <h3><a href={entry.href}>{entry.title} <span aria-hidden="true">↗</span></a></h3>
                      <p>{entry.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
              <section id="about" className={`${styles.section} ${styles.about}`} aria-labelledby="about-heading">
                <h2 id="about-heading">About Nick</h2>
                <p>{profile.background}</p>
                <a className={styles.textLink} href={profile.links.linkedin}>More on LinkedIn <span aria-hidden="true">↗</span></a>
              </section>
            </div>
          </main>

          <footer className={styles.footer}>
            <span>{profile.name} / nswagg</span>
            <nav aria-label="Social profiles">
              <a href={profile.links.linkedin}>LinkedIn <span aria-hidden="true">↗</span></a>
              <a href={profile.links.github}>GitHub <span aria-hidden="true">↗</span></a>
              <a href={profile.links.youtube}>YouTube <span aria-hidden="true">↗</span></a>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  )
}
