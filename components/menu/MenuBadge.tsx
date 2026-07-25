// components/menu/MenuBadge.tsx
//
// Elegant gold pill used for "Chef's Selection", "House Favourite", etc.
// Shimmer is a slow, infrequent sweep — decoration, not a spinner.

import { BADGE_LABELS } from '@/data/menu'
import type { MenuBadgeType } from '@/types/menu'

export default function MenuBadge({ type }: { type: MenuBadgeType }) {
  return (
    <span className="menu-badge">
      {BADGE_LABELS[type]}

      <style jsx>{`
        .menu-badge {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 6px 14px;
          border: 1px solid rgba(201, 169, 110, 0.4);
          border-radius: 999px;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #c9a96e;
          background: linear-gradient(
            120deg,
            rgba(201, 169, 110, 0.08) 0%,
            rgba(201, 169, 110, 0.02) 100%
          );
          overflow: hidden;
          white-space: nowrap;
        }

        .menu-badge::after {
          content: '';
          position: absolute;
          top: 0;
          left: -150%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.22),
            transparent
          );
          animation: menuBadgeShimmer 5s ease-in-out infinite;
        }

        @keyframes menuBadgeShimmer {
          0%,
          60%,
          100% {
            left: -150%;
          }
          80% {
            left: 150%;
          }
        }
      `}</style>
    </span>
  )
}