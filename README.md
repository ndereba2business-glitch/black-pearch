# The Black Perch

Website for **The Black Perch** — a restaurant, lounge, café and spa on Milimani Road, Meru, Kenya. A single-page, scroll-led site built with Next.js.

- **Repo:** `github.com/ndereba2business-glitch/black-pearch`
- **Live:** `the-black-pearch-one.vercel.app`

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

Run `lint`, `typecheck` and `build` before pushing.

If the dev server ever reports `Next.js package not found`, the dev cache is stale — delete `.next/dev` and start it again.

## Stack

- **Next.js 16** (App Router, Turbopack) and **React 19**
- **TypeScript**
- **Tailwind CSS v4** — configured in CSS (`app/globals.css`), there is no `tailwind.config`
- **GSAP + ScrollTrigger** — parallax and scroll-linked motion
- **Lenis** — smooth scrolling and in-page anchor links

## Structure

```
app/
  layout.tsx          fonts, metadata, JSON-LD, header/footer shell
  page.tsx            the section order
  globals.css         design tokens, base styles, scroll-reveal CSS
  icon.png, apple-icon.png, opengraph-image.jpg, robots.ts, sitemap.ts
components/
  layout/             Navbar, Footer
  sections/           Hero, Intro, Space, FeaturedMenu, Story, GuestWords, Visit
  menu/               MenuFilter (tabs), MenuRow
  motion/             ScrollEffects — all scroll behaviour, mounted once
  ui/                 ButtonLink, Frame, Reveal, RevealHeading, Magnetic, WeaveRule, icons
data/                 menu, gallery and testimonial content
lib/
  site.ts             business details: address, phone, hours, links, nav
public/images/        photography and brand marks
```

Page order: Hero → Intro (`#about`) → The Space (`#space`) → Featured Menu (`#menu`) → Story (`#story`) → Guest Words → Visit (`#visit`) → Footer.

## Editing content

Nothing about the business is hard-coded in components.

| To change | Edit |
|---|---|
| Address, phone, hours, WhatsApp, socials, nav links | `lib/site.ts` |
| Dishes, prices, categories, dietary notes | `data/menu.ts` |
| Gallery photographs and captions | `data/space.ts` |
| Guest reviews | `data/testimonials.ts` |

**Photographs** live in `public/images/` and are imported statically, so Next.js generates the dimensions and blur placeholder for you. To add one, drop the file in, import it in the relevant data file and reference the import. A menu item with no `image` is still listed and shows the crest instead.

Keep photographs at 1,600px or more on the long edge where possible. Several current images are smaller than that, and the layouts are sized so none is shown larger than its source — a bigger original lets a picture be used at a bigger size.

## Design system

Tokens are declared in the `@theme` block of `app/globals.css` and become Tailwind utilities (`bg-ink`, `text-brass`, `text-display-lg`, …).

| Token | Value | Use |
|---|---|---|
| `ink` | `#0b0d0b` | Page background |
| `moss` | `#18241c` | Guest-words band, image placeholders |
| `bone` | `#efe9dd` | Text on dark |
| `paper` | `#ebe4d5` | Menu section background |
| `brass` | `#c6a467` | Accent on dark |
| `brass-deep` | `#7a5a20` | Accent on paper (meets AA contrast) |
| Display type | Bodoni Moda | Headings, dish names, prices |
| Body type | Instrument Sans | Everything else |

Corners are square throughout; there are no drop shadows.

## Motion

All scroll behaviour is in `components/motion/ScrollEffects.tsx` and is driven by data attributes, so sections stay server components:

- `data-reveal="up | fade | mask | lines"` — entrance when scrolled into view. Use the `Reveal`, `RevealHeading` and `Frame` components rather than writing the attribute by hand.
- `data-parallax` — slow drift of a picture inside its frame.
- `data-drift="<px>"` — whole-element drift on wide screens.

Reveal styles only hide content once an inline script has confirmed JavaScript is running, so the page is fully readable without it. Under `prefers-reduced-motion`, smooth scrolling and parallax are off and reveals resolve instantly.

## Environment variables

None are required.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used for metadata, sitemap and structured data. Defaults to the Vercel URL above — set it when a custom domain goes live. |

## Deploying

Hosted on Vercel from this repository. No build configuration is needed beyond the defaults.
