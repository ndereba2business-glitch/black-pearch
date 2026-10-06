import signage from '@/public/images/space/signage-night.jpg'
import Frame from '@/components/ui/Frame'
import Reveal from '@/components/ui/Reveal'
import RevealHeading from '@/components/ui/RevealHeading'

const VALUES = [
  { name: 'Safety', note: 'Absolute, at every hour.' },
  { name: 'Service', note: 'Quick, and never rushed.' },
  { name: 'Community', note: 'Rooted in Meru.' },
]

export default function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="section-y overflow-clip bg-ink">
      <div className="shell grid gap-y-14 lg:grid-cols-12 lg:items-center lg:gap-x-10">
        <figure className="mx-auto w-full max-w-md lg:col-span-4 lg:col-start-2 lg:max-w-none">
          <Frame
            image={signage}
            alt="The Black Perch sign glowing white against the building at night"
            sizes="(min-width: 64rem) 33vw, (min-width: 30rem) 448px, 100vw"
            className="aspect-[3/4]"
          />
          <figcaption className="eyebrow mt-4 text-bone/60">Milimani, after dark</figcaption>
        </figure>

        <div className="lg:col-span-5 lg:col-start-7">
          <Reveal as="p" className="eyebrow text-brass">
            Our story
          </Reveal>
          <RevealHeading
            id="story-title"
            className="mt-6 text-display-lg"
            lines={[
              'Born in Milimani,',
              <em key="meru" className="text-brass">
                built for Meru.
              </em>,
            ]}
          />

          <div className="mt-8 max-w-[34rem] space-y-5 text-[1.0625rem] text-bone/80">
            <Reveal as="p">
              The Black Perch began with a simple idea: a day shouldn’t have to be split between
              addresses. The table where you open a laptop in the morning can be the place you
              unwind in the afternoon and celebrate long after midnight.
            </Reveal>
            <Reveal as="p" delay={80}>
              So we built one destination in the Mount Kenya region that holds international
              standards and local character in the same room — and keeps its doors open around the
              clock.
            </Reveal>
          </div>

          <dl className="mt-12 grid gap-x-8 border-t border-bone/15 sm:grid-cols-3">
            {VALUES.map((value, index) => (
              <Reveal
                key={value.name}
                delay={index * 80}
                className="border-b border-bone/15 py-5 sm:border-b-0 sm:pb-0"
              >
                <dt className="font-display text-display-sm">{value.name}</dt>
                <dd className="mt-1.5 text-sm text-bone/65">{value.note}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
