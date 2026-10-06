// Single source of truth for business details. Everything the site says about
// where The Black Perch is and how to reach it is read from here.

const WHATSAPP_NUMBER = '254118688226'

export const whatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const SITE = {
  name: 'The Black Perch',
  tagline: 'Dine. Chill. Indulge.',
  description:
    'Restaurant, lounge, café and spa under one roof on Milimani Road, Meru. Open 24 hours, every day.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://the-black-pearch-one.vercel.app',
  locale: 'en_KE',
  address: {
    street: 'Milimani Road',
    locality: 'Meru',
    country: 'Kenya',
    countryCode: 'KE',
  },
  hours: 'Open daily, 24 hours',
  phone: {
    display: '+254 118 688 226',
    href: 'tel:+254118688226',
    e164: '+254118688226',
  },
  reserveUrl: whatsappUrl("Hi Black Perch, I'd like to reserve a table."),
  menuUrl: whatsappUrl('Hi Black Perch, could you send me the full menu?'),
  directionsUrl:
    'https://www.google.com/maps/search/?api=1&query=The+Black+Perch%2C+Milimani+Road%2C+Meru',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/the_blackperch/' },
    { label: 'Facebook', href: 'https://www.facebook.com/p/The-Black-Perch-100054397995777/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@theblackperch' },
  ],
} as const

export const NAV_LINKS = [
  { label: 'The Space', href: '#space' },
  { label: 'Menu', href: '#menu' },
  { label: 'Story', href: '#story' },
  { label: 'Visit', href: '#visit' },
] as const
