// data/experience.ts
//
// Content for the "Experience The Black Perch" section (sits between
// Featured Menu and the Brand Heritage / Reservation flow). These are
// cinematic Unsplash placeholder images representing atmosphere —
// exterior, interior, guests, cocktails, live music — deliberately NOT
// food photography, since Featured Menu already covers the cuisine.
//
// NOTE: These are placeholder stock photo IDs, same spirit as the
// [IMG-...] placeholder codes in the content spec doc. Swap `src` for
// real venue photography once it's shot — nothing else needs to change.

import type { ExperienceImage, Testimonial } from '@/types/experience'

export const EXPERIENCE_IMAGES: ExperienceImage[] = [
  {
    id: 'exterior-night',
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1400&auto=format&fit=crop',
    alt: 'The Black Perch exterior glowing warmly at night',
  },
  {
    id: 'interior',
    src: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1400&auto=format&fit=crop',
    alt: 'Elegant, dimly lit interior seating',
  },
  {
    id: 'candlelit-table',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop',
    alt: 'A candlelit dining table set for an evening',
  },
  {
    id: 'guests-dinner',
    src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1400&auto=format&fit=crop',
    alt: 'Guests laughing together over dinner',
  },
  {
    id: 'friends-cocktails',
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1400&auto=format&fit=crop',
    alt: 'Friends sharing cocktails at the bar',
  },
  {
    id: 'live-music',
    src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1400&auto=format&fit=crop',
    alt: 'Live DJ setting the mood for the evening',
  },
  {
    id: 'bartender-craft',
    src: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1400&auto=format&fit=crop',
    alt: 'A bartender crafting a premium cocktail',
  },
]

export const EXPERIENCE_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: 'The atmosphere alone is worth the visit. Every detail felt intentional.',
    name: 'Sarah M.',
  },
  {
    id: 't2',
    quote: 'Perfect place for our anniversary. Incredible ambience and amazing service.',
    name: 'Brian K.',
  },
  {
    id: 't3',
    quote: 'Beautiful interior, fantastic cocktails and one of the best dining experiences in town.',
    name: 'Faith N.',
  },
]