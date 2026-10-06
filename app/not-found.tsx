import type { Metadata } from 'next'
import ButtonLink from '@/components/ui/ButtonLink'

export const metadata: Metadata = {
  title: 'Page not found',
}

export default function NotFound() {
  return (
    <section className="shell flex min-h-svh flex-col justify-center pb-24 pt-[calc(var(--header-h)+4rem)]">
      <p className="eyebrow text-brass">404</p>
      <h1 className="mt-6 max-w-[14ch] text-display-lg">
        This table doesn’t <em className="text-brass">exist.</em>
      </h1>
      <p className="mt-6 max-w-md text-bone/80">
        The page you’re looking for has moved or was never here. The rest of the house is open.
      </p>
      <div className="mt-10">
        <ButtonLink href="/">Back to the front door</ButtonLink>
      </div>
    </section>
  )
}
