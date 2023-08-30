import './globals.css'
import { Inter } from 'next/font/google'

/** This is where the root stylesheet is imported for the whole app */

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nick Waggoner',
  description: 'Nick Waggoner portfolio and resume',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
