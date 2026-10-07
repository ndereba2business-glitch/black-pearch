import { SPACE_FEATURE, SPACE_IMAGES } from '@/data/space'
import Frame from '@/components/ui/Frame'
import Reveal from '@/components/ui/Reveal'
import RevealHeading from '@/components/ui/RevealHeading'
import { cn } from '@/lib/cn'

// Presentation for each gallery picture, in the same order as SPACE_IMAGES.
// Small screens: a swipeable strip of fixed-height frames.
// Wide screens: an offset twelve-column grid, sized so no photograph is
// ever shown larger than its source can carry.
const LAYOUT = [
  { shape: 'aspect-[3/4]', grid: 'lg:col-span-4 lg:col-start-1', drift: 0, sizes: '33vw' },
  { shape: 'aspect-[6/5]', grid: 'lg:col-span-4 lg:col-start-6 lg:mt-44', drift: 40, sizes: '33vw' },
  { shape: 'aspect-[2/3]', grid: 'lg:col-span-2 lg:col-start-11 lg:mt-12', drift: -24, sizes: '17vw' },
  { shape: 'aspect-[3/2]', grid: 'lg:col-span-5 lg:col-start-2 lg:mt-20', drift: 0, sizes: '42vw' },
  { shape: 'aspect-[3/4]', grid: 'lg:col-span-3 lg:col-start-8 lg:mt-36', drift: 44, sizes: '25vw' },
  { shape: 'aspect-[3/4]', grid: 'lg:col-span-2 lg:col-start-11 lg:mt-14', drift: -20, sizes: '17vw' },
]

export default function Space() {
  return (
    <section id="space" aria-labelledby="space-title" className="section-y overflow-clip bg-ink pt-0!">
      <div className="shell">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-8">
            <Reveal as="p" className="eyebrow text-brass">
              The Space
            </Reveal>
            <RevealHeading
              id="space-title"
              className="mt-6 text-display-lg"
              lines={[
                'Woven light, living walls,',
                <em key="grass" className="text-brass">
                  grass underfoot.
                </em>,
              ]}
            />
          </div>
          <Reveal as="p" delay={120} className="max-w-md text-bone/75 lg:col-span-4 lg:pb-3">
            Part garden, part dining room. Basket lamps hang through the greenery overhead, the
            bar sits at the far end, and there is seating indoors and out.
          </Reveal>
        </div>

        <figure className="mt-12 md:mt-16">
          <Frame
            image={SPACE_FEATURE.image}
            alt={SPACE_FEATURE.alt}
            position={SPACE_FEATURE.position}
            sizes="(min-width: 100rem) 1472px, 100vw"
            className="aspect-[4/3] md:aspect-[16/9]"
          />
          <figcaption className="eyebrow mt-4 flex justify-between gap-6 text-bone/60">
            <span>{SPACE_FEATURE.caption}</span>
            <span className="hidden sm:inline">Milimani Road, Meru</span>
          </figcaption>
        </figure>
      </div>

      <div
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-(--gutter) px-(--gutter) pb-2 lg:shell lg:mt-24 lg:grid lg:snap-none lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-0 lg:overflow-visible lg:pb-0"      >
        {SPACE_IMAGES.map((item, index) => {
          const layout = LAYOUT[index]
          return (
            <figure
              key={item.id}
              data-drift={layout.drift || undefined}
              className={cn('shrink-0 snap-start lg:shrink', layout.grid)}
            >
              <Frame
                image={item.image}
                alt={item.alt}
                position={item.position}
                sizes={`(min-width: 64rem) ${layout.sizes}, 70vw`}
                className={cn('h-[21rem] max-w-[78vw] lg:h-auto lg:w-full lg:max-w-none', layout.shape)}
              />
              <figcaption className="eyebrow mt-4 text-bone/60">{item.caption}</figcaption>
            </figure>
          )
        })}
      </div>
    </section>
  )
}
