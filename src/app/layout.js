import './globals.css'
import { Space_Grotesk } from 'next/font/google'

/** This is where the root stylesheet is imported for the whole app */

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://www.nswagg.com'),
  title: 'Nick Waggoner | Software, Games & Videos',
  description: 'Software, games, experiments, and videos by Nick Waggoner. Play Rock Paper Planes, explore projects, and find work from the archive.',
  icons: {
    icon: [
      { url: '/icons/paper-plane-favicon.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/icons/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icons/favicon-16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Nick Waggoner | Software, Games & Videos',
    description: 'Games, projects, and a few ideas from Nick Waggoner.',
    type: 'website',
    url: 'https://www.nswagg.com',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  )
}
