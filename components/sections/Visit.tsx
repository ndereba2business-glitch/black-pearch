import { SITE } from '@/lib/site'
import ButtonLink from '@/components/ui/ButtonLink'
import Magnetic from '@/components/ui/Magnetic'
import Reveal from '@/components/ui/Reveal'
import RevealHeading from '@/components/ui/RevealHeading'
import { IconArrowUpRight, IconPhone, IconWhatsapp } from '@/components/ui/icons'

const GOOD_TO_KNOW = [
  'Reservations recommended after 6 PM',
  'Indoor and outdoor seating',
  'Private events and group bookings',
]

export default function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="section-y bg-ink">
      <div className="shell grid gap-y-16 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7">
          <Reveal as="p" className="eyebrow text-brass">
            Visit
          </Reveal>
          <RevealHeading
            id="visit-title"
            className="mt-6 text-display-xl"
            lines={[
              'Pull up',
              <em key="chair" className="text-brass">
                a chair.
              </em>,
            ]}
          />
          <Reveal as="p" delay={100} className="mt-8 max-w-md text-[1.0625rem] text-bone/80">
            Dinner for two, a family lunch, a birthday or a business meeting — send us a message
            and we’ll set the table.
          </Reveal>

          <Reveal
            delay={180}
            className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:gap-4"
          >
            <Magnetic className="w-full xs:w-auto">
              <ButtonLink
                href={SITE.reserveUrl}
                external
                icon={<IconWhatsapp />}
                className="w-full xs:w-auto"
              >
                Reserve on WhatsApp
              </ButtonLink>
            </Magnetic>
            <ButtonLink href={SITE.phone.href} variant="outline" icon={<IconPhone />}>
              Call {SITE.phone.display}
            </ButtonLink>
          </Reveal>
        </div>

        <dl className="self-end lg:col-span-4 lg:col-start-9">
          <Reveal className="border-t border-bone/15 py-6">
            <dt className="eyebrow text-bone/60">Address</dt>
            <dd className="mt-3">
              <address className="font-display text-display-sm not-italic">
                {SITE.address.street}
                <br />
                {SITE.address.locality}, {SITE.address.country}
              </address>
              <a
                href={SITE.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-brass"
              >
                <span className="link-line">Get directions</span>
                <IconArrowUpRight width={15} height={15} />
                <span className="sr-only"> on Google Maps (opens in a new tab)</span>
              </a>
            </dd>
          </Reveal>

          <Reveal delay={80} className="border-t border-bone/15 py-6">
            <dt className="eyebrow text-bone/60">Hours</dt>
            <dd className="mt-3 font-display text-display-sm">{SITE.hours}</dd>
          </Reveal>

          <Reveal delay={160} className="border-y border-bone/15 py-6">
            <dt className="eyebrow text-bone/60">Good to know</dt>
            <dd className="mt-3">
              <ul className="space-y-1.5 text-bone/80">
                {GOOD_TO_KNOW.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </dd>
          </Reveal>
        </dl>
      </div>
    </section>
  )
}
