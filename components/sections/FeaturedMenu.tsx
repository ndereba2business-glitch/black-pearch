'use client'

import { useState } from 'react'
import Image from 'next/image'
import mark from '@/public/images/brand/mark.png'
import MenuFilter from '@/components/menu/MenuFilter'
import MenuRow from '@/components/menu/MenuRow'
import ButtonLink from '@/components/ui/ButtonLink'
import Reveal from '@/components/ui/Reveal'
import RevealHeading from '@/components/ui/RevealHeading'
import { IconWhatsapp } from '@/components/ui/icons'
import { MENU_ITEMS } from '@/data/menu'
import { SITE } from '@/lib/site'
import type { MenuFilterCategory } from '@/types/menu'
import { cn } from '@/lib/cn'

const PANEL_ID = 'menu-panel'

export default function FeaturedMenu() {
  const [category, setCategory] = useState<MenuFilterCategory>('all')
  const [activeId, setActiveId] = useState(MENU_ITEMS[0].id)
  // Large preview photographs are only mounted once a dish has been looked at.
  const [seen, setSeen] = useState<string[]>([MENU_ITEMS[0].id])

  const items =
    category === 'all' ? MENU_ITEMS : MENU_ITEMS.filter((item) => item.category === category)
  const activeItem = items.find((item) => item.id === activeId) ?? items[0]

  const activate = (id: string) => {
    setActiveId(id)
    setSeen((ids) => (ids.includes(id) ? ids : [...ids, id]))
  }

  const changeCategory = (next: MenuFilterCategory) => {
    setCategory(next)
    const first = next === 'all' ? MENU_ITEMS[0] : MENU_ITEMS.find((item) => item.category === next)
    if (first) activate(first.id)
  }

  return (
    <section id="menu" aria-labelledby="menu-title" className="on-paper section-y bg-paper text-ink">
      <div className="shell">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-8">
            <Reveal as="p" className="eyebrow text-brass-deep">
              Featured menu
            </Reveal>
            <RevealHeading
              id="menu-title"
              className="mt-6 text-display-lg"
              lines={['From first coffee', <em key="last">to last call.</em>]}
            />
          </div>
          <Reveal as="p" delay={120} className="max-w-md text-ink/75 lg:col-span-4 lg:pb-3">
            A selection from the kitchen and the bar — breakfast plates, signature mains, pizzas,
            burgers and cocktails. Prices are in Kenyan shillings.
          </Reveal>
        </div>

        <Reveal className="mt-12 md:mt-16">
          <MenuFilter active={category} onChange={changeCategory} panelId={PANEL_ID} />
        </Reveal>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          {/* Large photograph of whichever dish the pointer is on. It repeats
              the row thumbnails, so it is hidden from assistive tech. */}
          <div aria-hidden="true" className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)] pt-10">
              <div className="relative aspect-[4/5] overflow-hidden bg-moss">
                <span className="absolute inset-0 grid place-items-center">
                  <Image src={mark} alt="" className="h-auto w-24 opacity-70" />
                </span>
                {MENU_ITEMS.filter((item) => item.image && seen.includes(item.id)).map((item) => (
                  <Image
                    key={item.id}
                    src={item.image!}
                    alt=""
                    fill
                    sizes="(min-width: 100rem) 600px, 38vw"
                    placeholder="blur"
                    className={cn(
                      'object-cover transition-[opacity,transform] duration-700 ease-out-expo',
                      item.id === activeItem.id ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                    )}
                  />
                ))}
              </div>
              <p className="eyebrow mt-4 text-ink/70">{activeItem.title}</p>
            </div>
          </div>

          <div
            id={PANEL_ID}
            role="tabpanel"
            aria-labelledby={`menu-tab-${category}`}
            className="lg:col-span-7"
          >
            {/* Re-keyed per category so the rows replay their entrance. */}
            <ul key={category} className="lg:pt-4">
              {items.map((item, index) => (
                <MenuRow
                  key={item.id}
                  item={item}
                  index={index}
                  active={item.id === activeItem.id}
                  onActivate={() => activate(item.id)}
                />
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xs text-sm text-ink/75">
                Looking for something that isn’t listed here? Ask and we’ll send the full menu.
              </p>
              <ButtonLink
                href={SITE.menuUrl}
                external
                tone="light"
                variant="outline"
                icon={<IconWhatsapp />}
              >
                Ask for the full menu
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
