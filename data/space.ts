// Photography of the venue. Captions and alt text describe only what each
// photograph shows.

import type { StaticImageData } from 'next/image'
import mainRoom from '@/public/images/space/main-room.jpg'
import terrace from '@/public/images/space/terrace.jpg'
import bar from '@/public/images/space/bar.jpg'
import fullHouse from '@/public/images/space/full-house.jpg'
import djBooth from '@/public/images/space/dj-booth.jpg'
import sharingPlatter from '@/public/images/space/sharing-platter.jpg'
import gardenEntrance from '@/public/images/space/garden-entrance.jpg'

export interface SpaceImage {
  id: string
  image: StaticImageData
  alt: string
  caption: string
  /** CSS object-position, for crops that need steering. */
  position?: string
}

export const SPACE_FEATURE: SpaceImage = {
  id: 'main-room',
  image: mainRoom,
  alt: 'The main room by day: timber tables on a grass floor, a bar at the far end, and a ceiling of woven basket lamps and trailing greenery',
  caption: 'The main room',
  position: '50% 38%',
}

export const SPACE_IMAGES: SpaceImage[] = [
  {
    id: 'terrace',
    image: terrace,
    alt: 'Outdoor seating on the lawn in front of the illuminated Black Perch sign',
    caption: 'Out on the lawn',
    position: '50% 62%',
  },
  {
    id: 'bar',
    image: bar,
    alt: 'Shelves of spirits against a brick wall behind the bar',
    caption: 'The bar',
    position: '50% 22%',
  },
  {
    id: 'full-house',
    image: fullHouse,
    alt: 'A full house at night, tables of guests under glowing basket lamps',
    caption: 'A full house',
  },
  {
    id: 'dj-booth',
    image: djBooth,
    alt: 'Two DJs at the decks, framed by plants',
    caption: 'Behind the decks',
  },
  {
    id: 'sharing-platter',
    image: sharingPlatter,
    alt: 'A sharing platter of grilled meats, fries, rice and vegetables on a table set on the lawn',
    caption: 'To share, on the lawn',
  },
  {
    id: 'garden-entrance',
    image: gardenEntrance,
    alt: 'A stepping-stone path through tall greenery leading to the entrance',
    caption: 'The way in',
  },
]
