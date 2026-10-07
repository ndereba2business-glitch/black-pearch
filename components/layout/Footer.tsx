import Image from 'next/image'
import crest from '@/public/images/brand/crest.png'
import { NAV_LINKS, SITE } from '@/lib/site'
import { IconFacebook, IconInstagram, IconTiktok } from '@/components/ui/icons'
import WeaveRule from '@/components/ui/WeaveRule'

const SOCIAL_ICONS = {
  Instagram: IconInstagram,
  Facebook: IconFacebook,
  TikTok: IconTiktok,
} as const

export default function Footer() {
  return (
    <footer className="bg-ink">
      <div className="shell">
        <WeaveRule />

        <div className="grid gap-x-10 gap-y-14 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <Image
              src={crest}
              alt={`${SITE.name} crest`}
              sizes="140px"
              className="h-auto w-28 md:w-35"
            />
            <p className="mt-6 font-display text-display-sm italic text-bone/80">{SITE.tagline}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-2 md:col-start-7">
            <h2 className="eyebrow text-bone/60">Explore</h2>
            <ul className="mt-3">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-bone/85 hover:text-bone"
                  >
                    <span className="link-line">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="eyebrow text-bone/60">Find us</h2>
            <address className="mt-5 not-italic text-bone/85">
              <p>
                {SITE.address.street}
                <br />
                {SITE.address.locality}, {SITE.address.country}
              </p>
              <p>
                <a href={SITE.phone.href} className="inline-flex min-h-11 items-center hover:text-bone">
                  <span className="link-line">{SITE.phone.display}</span>
                </a>
              </p>
            </address>
          </div>

          <div className="md:col-span-2">
            <h2 className="eyebrow text-bone/60">Follow</h2>
            <ul className="mt-3">
              {SITE.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.label]
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-3 text-bone/85 transition-colors duration-300 hover:text-brass"
                    >
                      <Icon width={16} height={16} />
                      <span className="link-line">{social.label}</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-bone/10 py-6 text-[0.8125rem] text-bone/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>{SITE.hours}</p>
        </div>
      </div>
    </footer>
  )
}
