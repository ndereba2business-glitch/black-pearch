import Image from 'next/image'
import heroImage from '@/public/images/hero/dining-room.jpg'
import { SITE } from '@/lib/site'
import ButtonLink from '@/components/ui/ButtonLink'
import Magnetic from '@/components/ui/Magnetic'
import RevealHeading from '@/components/ui/RevealHeading'
import { IconWhatsapp } from '@/components/ui/icons'

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-clip bg-ink"
    >
      {/* Atmosphere — on wide screens the photograph's own colours, blown
          out of focus, wash the stage behind the type. */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 hidden lg:block">
        <div
          className="absolute inset-0 scale-125 bg-cover bg-center opacity-45 blur-3xl"
          style={{ backgroundImage: `url(${heroImage.blurDataURL})` }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/85 to-ink/30" />
      </div>

      {/* The photograph: full-bleed on small screens, a tall panel on wide ones. */}
      <div className="absolute inset-0 -z-10 overflow-clip lg:left-auto lg:w-[46%]">
        <div data-parallax className="absolute inset-x-0 -inset-y-[7%]">
          <Image
            src={heroImage}
            alt="Candlelit tables set for dinner beneath a ceiling of woven basket lamps and trailing greenery"
            fill
            preload
            sizes="(min-width: 64rem) 46vw, 100vw"
            placeholder="blur"
            className="animate-settle object-cover object-[62%_50%] lg:object-[56%_50%]"
          />
        </div>
        <div aria-hidden="true" className="grain absolute inset-0 opacity-[0.08]" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-ink/75 via-ink/25 via-35% to-ink lg:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-linear-to-r from-ink/70 via-ink/10 to-transparent lg:block"
        />
        {/* keeps the navigation and the footer strip legible over the picture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-linear-to-b from-ink/70 from-0% via-transparent via-25% to-transparent lg:block"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-linear-to-t from-ink/85 to-transparent lg:block"
        />
      </div>

      <div className="shell flex flex-1 flex-col justify-end pt-[calc(var(--header-h)+2rem)]">
        <div className="pb-10 md:pb-14">
          <p className="eyebrow animate-rise text-brass">
            {SITE.address.street} · {SITE.address.locality}, {SITE.address.country}
          </p>

          <RevealHeading
            as="h1"
            id="hero-title"
            onLoad
            delay={150}
            className="mt-5 text-display-xl md:mt-7"
            lines={[
              'Day into night,',
              'under one',
              <em key="roof" className="text-brass">
                woven roof.
              </em>,
            ]}
          />

          <p className="mt-7 max-w-[30rem] animate-rise text-[1.0625rem] leading-relaxed text-bone/85 [animation-delay:650ms] md:mt-9 md:text-lg">
            {SITE.name} is a restaurant, lounge, café and spa in Milimani, Meru — open
            twenty-four hours, every day.
          </p>

          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:800ms] xs:flex-row xs:flex-wrap xs:items-center xs:gap-4">
            <Magnetic className="w-full xs:w-auto">
              <ButtonLink
                href={SITE.reserveUrl}
                external
                icon={<IconWhatsapp />}
                className="w-full xs:w-auto"
              >
                Reserve a table
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="#menu" variant="outline">
              See the menu
            </ButtonLink>
          </div>
        </div>

        <div className="flex animate-rise items-center justify-between gap-6 border-t border-bone/15 py-5 text-bone/70 [animation-delay:1000ms]">
          <p className="eyebrow">{SITE.hours}</p>
          <p className="eyebrow hidden md:block">{SITE.tagline}</p>
          <a href="#about" className="eyebrow flex min-h-11 items-center gap-3 transition-colors duration-300 hover:text-bone">
            Scroll
            <span aria-hidden="true" className="block h-8 w-px overflow-hidden bg-bone/20">
              <span className="block size-full animate-scroll-cue bg-brass" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
