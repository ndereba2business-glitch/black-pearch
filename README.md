# The Black Perch

A premium lifestyle hub website for **The Black Perch** — a nightclub/lounge, artisan cafe, spa & wellness, ice cream parlor, and auto care/detailing venue in Milimani, Meru, Kenya. Built as a single-page, scroll-driven, cinematic experience.

Developed under the Forge Eleven portfolio brand, adapted from an original Forge Eleven template.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally. The page auto-updates as you edit files inside `app/` and `components/`.

## Stack

- **Next.js** — framework
- **TypeScript**
- **Tailwind CSS** — utility styling (note: some `gap-*` utilities are unreliable in this pipeline; inline styles are used instead in places)
- **GSAP + ScrollTrigger** — scroll-driven animation
- **Lenis** — smooth scrolling
- **Framer Motion** — component-level motion (menu filter transitions)
- **Resend** — contact form email delivery

## Design System

| Token | Value |
|---|---|
| Charcoal (background) | `#080808` |
| Cream (text) | `#f0ede6` |
| Gold (accent) | `#c9a96e` |
| Heading font | Cormorant Garamond |
| Body font | DM Sans |

## Site Structure

Single-page scroll with anchor-based navigation (not multi-route). Current build order:

1. Hero (`id="home"`)
2. Marquee
3. Featured Menu (`id="menu"`)
4. Our Story / About (`id="story"`)
5. Reservations / Contact (`id="reserve"`)


## Image Assets

Images are intentionally deferred — real photography is dropped into `public/images/` once available. Each image slot renders a labeled dashed-border placeholder behind the `<img>` tag, so a missing file never shows as a blank space; it falls back to the placeholder automatically via `onError`.

Current folders:

- `public/images/menu/` — dish photography (see `data/menu.ts` for expected filenames)
- `public/images/experience/` — "Our Story" mosaic photography
- `public/images/reservation/` — reservation section photography

## Environment Variables

Set `RESEND_API_KEY` in your deployment environment (Vercel dashboard → Settings → Environment Variables). Never commit this to `.env.local` or push it to the repo.

## Deploy on Vercel

Connect this GitHub repo, add the `RESEND_API_KEY` environment variable in the dashboard, and deploy.

- **Repo:** `github.com/ndereba2business-glitch/black-pearch`
- **Live:** `the-black-pearch-one.vercel.app`

## Development Notes

- Full-file replacements preferred over partial edits to avoid regressions.
- Run `tsc --noEmit` and `eslint` before committing.
- Preserve existing atmosphere layers (custom cursor, ambient particles, fog, grain overlay) — don't remove without explicit instruction.
- One commit per completed section/feature, following Conventional Commits.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [GSAP ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)