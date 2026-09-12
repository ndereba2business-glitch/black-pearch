// app/layout.tsx
import type { Metadata } from 'next'
import { DM_Sans, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/layout/SmoothScroll'
import CustomCursor from '@/components/ui/CustomCursor'
import Navbar from '@/components/layout/Navbar'
import SectionNav from '@/components/ui/SectionNav'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  // TODO (verify before launch): confirm final wording with the client once
  // real hours, menu and photography are locked in.
  title: 'Space Next Door — Sports Bar, Grill & Nightclub in Nakuru',
  description:
    'Space Next Door Nakuru — food, drinks, live music and nightlife under one roof in the former Tuskys building, Nakuru, Kenya.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorant.variable}`}
    >
      <body className="bg-noir-bg text-noir-text antialiased">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <SectionNav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}