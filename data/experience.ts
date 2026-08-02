// data/experience.ts
//
// Content for the "Experience The Black Perch" section (sits between
// Featured Menu and the Brand Heritage / Reservation flow).
//
// IMAGES:
// Drop your files into public/images/experience/ using the exact
// filenames below (jpg, jpeg, png, or webp — just update the extension
// in `src` to match what you add). Each `src` is already wired up, so
// once a file lands at that path it just appears — nothing else to
// change. Every image should be atmosphere/lifestyle, not food (the
// Featured Menu section already covers the cuisine):
//
//   public/images/experience/exterior-night.jpg     — exterior at night
//   public/images/experience/interior.jpg            — elegant interior
//   public/images/experience/candlelit-table.jpg     — candlelit dining table
//   public/images/experience/guests-dinner.jpg        — guests enjoying dinner together
//   public/images/experience/friends-cocktails.jpg    — friends sharing cocktails
//   public/images/experience/live-music.jpg           — live music / DJ ambience
//   public/images/experience/bartender-craft.jpg      — bartender crafting a cocktail
//
// TESTIMONIALS:
// Paste real Google review text + reviewer first name + last initial
// into the `quote` / `name` fields below. Keep to 3 — the layout is
// built around exactly 3 floating testimonial cards.

import type { ExperienceImage, Testimonial } from '@/types/experience'

export const EXPERIENCE_IMAGES: ExperienceImage[] = [
  {
    id: 'exterior-night',
    src: '/images/experience/exterior-night.jpg',
    alt: 'The Black Perch exterior glowing warmly at night',
  },
  {
    id: 'interior',
    src: '/images/experience/interior.jpg',
    alt: 'Elegant, dimly lit interior seating',
  },
  {
    id: 'candlelit-table',
    src: '/images/experience/candlelit-table.jpg',
    alt: 'A candlelit dining table set for an evening',
  },
  {
    id: 'guests-dinner',
    src: '/images/experience/guests-dinner.jpg',
    alt: 'Guests laughing together over dinner',
  },
  {
    id: 'friends-cocktails',
    src: '/images/experience/friends-cocktails.jpg',
    alt: 'Friends sharing cocktails at the bar',
  },
  {
    id: 'live-music',
    src: '/images/experience/live-music.jpg',
    alt: 'Live DJ setting the mood for the evening',
  },
  {
    id: 'bartender-craft',
    src: '/images/experience/bartender-craft.jpg',
    alt: 'A bartender crafting a premium cocktail',
  },
]

export const EXPERIENCE_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: 'I had a great time. Fun was had. Your to go place in Meru.',
    name: 'Sharon Makena',
  },
  {
    id: 't2',
    quote: 'Awesome place for making good memories.',
    name: 'Emmanuel Daris Njua',
  },
  {
    id: 't3',
    quote: 'Perfect place for lunch meetings. Loved the ambience, top notch kwa kweli.',
    name: 'Isaac Mbugua',
  },
]

