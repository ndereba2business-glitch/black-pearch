// components/menu/MenuFilter.tsx
'use client'

import { motion } from 'framer-motion'
import { CATEGORY_LABELS, MENU_CATEGORIES } from '@/data/menu'
import type { MenuFilterCategory } from '@/types/menu'

export default function MenuFilter({
  active,
  onChange,
}: {
  active: MenuFilterCategory
  onChange: (category: MenuFilterCategory) => void
}) {
  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      className="menu-filter-track"
    >
      {MENU_CATEGORIES.map((category) => {
        const isActive = active === category
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls="featured-menu-panel"
            onClick={() => onChange(category)}
            className="menu-filter-tab"
            style={{ color: isActive ? '#f0ede6' : 'rgba(240,237,230,0.4)' }}
          >
            {CATEGORY_LABELS[category]}
            {isActive && (
              <motion.span
                layoutId="menu-filter-underline"
                className="menu-filter-underline"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
          </button>
        )
      })}

      <style jsx>{`
        .menu-filter-track {
          display: flex;
          align-items: center;
          gap: 40px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          border-bottom: 1px solid rgba(240, 237, 230, 0.08);
        }
        .menu-filter-track::-webkit-scrollbar {
          display: none;
        }

        .menu-filter-tab {
          position: relative;
          background: transparent;
          border: none;
          padding: 10px 2px 16px 2px;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: color 0.4s ease;
        }
        .menu-filter-tab:hover {
          color: #f0ede6;
        }

        .menu-filter-underline {
          position: absolute;
          left: 2px;
          right: 2px;
          bottom: 0;
          height: 1px;
          background: #c9a96e;
          box-shadow: 0 0 8px rgba(201, 169, 110, 0.6);
        }

        @media (max-width: 640px) {
          .menu-filter-track {
            gap: 28px;
          }
        }
      `}</style>
    </div>
  )
}