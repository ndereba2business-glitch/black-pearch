// components/sections/FeaturedMenu.tsx
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import MenuFilter from '@/components/menu/MenuFilter'
import MenuCard from '@/components/menu/MenuCard'
import { CATEGORY_LABELS, MENU_ITEMS } from '@/data/menu'
import type { MenuFilterCategory } from '@/types/menu'

gsap.registerPlugin(ScrollTrigger)

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -12, scale: 0.96, filter: 'blur(4px)' },
}

export default function FeaturedMenu() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [activeCategory, setActiveCategory] = useState<MenuFilterCategory>('all')

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return MENU_ITEMS
    return MENU_ITEMS.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  // ── Scroll-triggered entrance (GSAP) — mirrors About.tsx / Contact.tsx ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = headingRef.current?.querySelectorAll('.line-inner')
      gsap.set(lines || [], { y: '110%' })
      gsap.to(lines || [], {
        y: '0%',
        duration: 1.1,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.menu-label', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.menu-supporting-text', {
        opacity: 0,
        y: 20,
        duration: 0.9,
        delay: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.menu-filter-wrap', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.menu-filter-wrap',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="section-padding"
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: '120px',
        paddingBottom: '120px',
        background: '#080808',
        overflow: 'hidden',
      }}
    >
      <div
        className="menu-label"
        style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}
      >
        <div style={{ width: '40px', height: '1px', background: '#c9a96e' }} />
        <span
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#c9a96e',
          }}
        >
          Featured Menu
        </span>
      </div>

      <h2
        ref={headingRef}
        style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 300,
          color: '#f0ede6',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          marginBottom: '28px',
          maxWidth: '900px',
        }}
      >
        <span style={{ display: 'block', overflow: 'hidden' }}>
          <span className="line-inner" style={{ display: 'block' }}>
            Taste the <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>Craftsmanship</span>
          </span>
        </span>
      </h2>

      <p
        className="menu-supporting-text"
        style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '15px',
          lineHeight: 1.8,
          color: 'rgba(240,237,230,0.5)',
          maxWidth: '560px',
          marginBottom: '64px',
        }}
      >
        Fresh local ingredients elevated through modern culinary artistry. Explore our
        carefully curated menu using the interactive category filters below.
      </p>

      <div className="menu-filter-wrap" style={{ marginBottom: '64px' }}>
        <MenuFilter active={activeCategory} onChange={setActiveCategory} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          id="featured-menu-panel"
          role="tabpanel"
          aria-label={CATEGORY_LABELS[activeCategory]}
          className="menu-grid"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <MenuCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <style jsx>{`
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px 32px;
        }
        @media (max-width: 1024px) {
          .menu-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .menu-grid {
            grid-template-columns: 1fr;
            gap: 56px;
          }
        }
      `}</style>
    </section>
  )
}