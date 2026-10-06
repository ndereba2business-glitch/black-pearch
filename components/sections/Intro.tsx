import Reveal from '@/components/ui/Reveal'

// What sits under the one roof. Descriptors are kept to what is known.
const OFFERINGS = [
  { name: 'Lounge & Nightclub', note: 'DJs and sherehe nights' },
  { name: 'Coffee Shop', note: 'Breakfast and café menu' },
  { name: 'Spa & Wellness', note: 'Luxury spa' },
  { name: 'Cream Parlour', note: 'Ice cream' },
  { name: 'Car Wash', note: 'Auto care and detailing' },
]

export default function Intro() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y bg-ink">
      <div className="shell grid gap-y-16 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7">
          <Reveal as="p" className="eyebrow text-brass">
            The Black Perch
          </Reveal>
          <Reveal as="p" delay={80} className="mt-7 font-display text-display-md text-bone">
            A morning workspace, an afternoon escape and a late-night{' '}
            <em className="text-brass">sherehe</em> — one address in Milimani that keeps pace with
            your whole day.
          </Reveal>
        </div>

        <div className="lg:col-span-4 lg:col-start-9 lg:pt-2">
          <Reveal as="h2" id="about-title" className="eyebrow text-bone/60">
            Under one roof
          </Reveal>
          <ul className="mt-6 border-t border-bone/15">
            {OFFERINGS.map((offering, index) => (
              <Reveal
                as="li"
                key={offering.name}
                delay={index * 70}
                className="flex items-baseline justify-between gap-6 border-b border-bone/15 py-4"
              >
                <span className="font-display text-display-sm">{offering.name}</span>
                <span className="text-right text-sm text-bone/60">{offering.note}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
