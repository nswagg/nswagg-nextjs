import './globals.css'
import { Space_Grotesk } from 'next/font/google'

/** This is where the root stylesheet is imported for the whole app */

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata = {
  title: 'Nick Waggoner',
  description: 'Nick Waggoner portfolio and resume',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  )
}
