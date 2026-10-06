// Guest reviews, quoted verbatim. Keep to three — the layout is a triptych.

export interface Testimonial {
  id: string
  quote: string
  name: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'sharon-makena',
    quote: 'I had a great time. Fun was had. Your to go place in Meru.',
    name: 'Sharon Makena',
  },
  {
    id: 'emmanuel-daris-njua',
    quote: 'Awesome place for making good memories.',
    name: 'Emmanuel Daris Njua',
  },
  {
    id: 'isaac-mbugua',
    quote: 'Perfect place for lunch meetings. Loved the ambience, top notch kwa kweli.',
    name: 'Isaac Mbugua',
  },
]
