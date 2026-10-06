import type { Metadata, Viewport } from 'next'
import { Bodoni_Moda, Instrument_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollEffects from '@/components/motion/ScrollEffects'
import { SITE } from '@/lib/site'

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-bodoni',
  display: 'swap',
})

const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
})

const title = `${SITE.name} — Restaurant, Lounge & Café in Meru, Kenya`

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE.name,
    locale: SITE.locale,
    title,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: SITE.description,
  },
}

export const viewport: Viewport = {
  themeColor: '#0b0d0b',
  colorScheme: 'dark',
}

// Structured data for search engines. Only facts stated on the page itself.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  image: `${SITE.url}/opengraph-image.jpg`,
  telephone: SITE.phone.e164,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressCountry: SITE.address.countryCode,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  acceptsReservations: true,
  hasMenu: `${SITE.url}/#menu`,
  sameAs: SITE.socials.map((social) => social.href),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The inline script below adds a class to <html> before hydration.
    <html lang="en" className={`${bodoni.variable} ${instrument.variable}`} suppressHydrationWarning>
      <body>
        {/* Scroll reveals only hide content once we know scripts are running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />

        <a
          href="#main"
          className="fixed left-4 top-4 z-[60] -translate-y-24 bg-bone px-5 py-3 text-sm font-medium text-ink transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>

        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ScrollEffects />
      </body>
    </html>
  )
}
