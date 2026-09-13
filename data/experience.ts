// data/experience.ts
//
// Content for the "Experience Space Next Door" section (sits between
// Featured Menu and the Reservation flow).
//
// IMAGES:
// Drop your files into public/images/experience/ using the exact
// filenames below (jpg, jpeg, png, or webp — just update the extension
// in `src` to match what you add). Each `src` is already wired up, so
// once a file lands at that path it just appears — nothing else to
// change. Every image should be atmosphere/lifestyle, not food (the
// Featured Menu section already covers the food/drinks):
//
//   public/images/experience/exterior-night.jpg     — exterior at night
//   public/images/experience/interior.jpg            — interior / seating area
//   public/images/experience/sports-screens.jpg      — sports bar TV/screen setup
//   public/images/experience/guests-crowd.jpg         — guests / crowd enjoying a night out
//   public/images/experience/friends-drinks.jpg       — friends sharing drinks
//   public/images/experience/dj-live-music.jpg        — live DJ / nightclub ambience
//   public/images/experience/grill-action.jpg         — grill / food being prepared
//
// TESTIMONIALS:
// PLACEHOLDER — do not invent reviews. Paste real Google/Facebook review
// text + reviewer first name + last initial into the `quote` / `name`
// fields below once available. Keep to 3 — the layout is built around
// exactly 3 floating testimonial cards.

import type { ExperienceImage, Testimonial } from '@/types/experience'

export const EXPERIENCE_IMAGES: ExperienceImage[] = [
  {
    id: 'exterior-night',
    src: '/images/experience/exterior-night.png',
    alt: 'Space Next Door exterior glowing at night',
  },
  {
    id: 'interior',
    src: '/images/experience/interior.png',
    alt: 'Space Next Door interior seating area',
  },
  {
    id: 'sports-screens',
    src: '/images/experience/sports-screens.png',
    alt: 'Sports bar screens showing a live match',
  },
  {
    id: 'guests-crowd',
    src: '/images/experience/guests-crowd.png',
    alt: 'Guests enjoying a night out together',
  },
  {
    id: 'friends-drinks',
    src: '/images/experience/friends-drinks.png',
    alt: 'Friends sharing drinks at the bar',
  },
  {
    id: 'dj-live-music',
    src: '/images/experience/dj-live-music.png',
    alt: 'Live DJ setting the mood for the night',
  },
  {
    id: 'grill-action',
    src: '/images/experience/grill-action.jpg',
    alt: 'Food being prepared on the grill',
  },
]

export const EXPERIENCE_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: '[PLACEHOLDER — paste a real, verified review here before launch]',
    name: '[Reviewer name — TBC]',
  },
  {
    id: 't2',
    quote: '[PLACEHOLDER — paste a real, verified review here before launch]',
    name: '[Reviewer name — TBC]',
  },
  {
    id: 't3',
    quote: '[PLACEHOLDER — paste a real, verified review here before launch]',
    name: '[Reviewer name — TBC]',
  },
]

