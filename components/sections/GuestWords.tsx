import { TESTIMONIALS } from '@/data/testimonials'
import Reveal from '@/components/ui/Reveal'
import WeaveRule from '@/components/ui/WeaveRule'

export default function GuestWords() {
  return (
    <section aria-labelledby="guests-title" className="bg-moss">
      <WeaveRule className="text-brass/35" />
      <div className="shell py-20 md:py-28">
        <Reveal as="h2" id="guests-title" className="eyebrow text-brass">
          In our guests’ words
        </Reveal>

        <ul className="mt-10 grid gap-y-12 md:mt-14 md:grid-cols-3 md:gap-x-10 lg:gap-x-16">
          {TESTIMONIALS.map((testimonial, index) => (
            <Reveal as="li" key={testimonial.id} delay={index * 110}>
              <figure className="flex h-full flex-col border-t border-bone/20 pt-7">
                <blockquote className="font-display text-display-sm italic text-bone md:text-[clamp(1.375rem,1.1rem+0.8vw,1.875rem)] md:leading-[1.3]">
                  <p>“{testimonial.quote}”</p>
                </blockquote>
                <figcaption className="eyebrow mt-auto pt-7 text-bone/70">
                  {testimonial.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
      <WeaveRule className="text-brass/35" />
    </section>
  )
}
