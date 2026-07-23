// components/ui/CustomCursor.tsx
'use client'

import React from 'react'
import { useCursor } from '@/hooks/useCursor'

export default function CustomCursor() {
  const { cursorRef, labelRef, isDisabled } = useCursor()

  if (isDisabled) return null

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '36px',
        height: '36px',
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform, opacity',
        opacity: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
      }}
    >
      {/* Outer Thin Matte Ring with Glass Blur */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '1px solid rgba(200, 169, 90, 0.45)',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(9, 9, 9, 0.2) 100%)',
          backdropFilter: 'blur(2px)',
          boxShadow: '0 0 15px rgba(212, 175, 55, 0.12), inset 0 0 8px rgba(200, 169, 90, 0.1)',
          transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
        }}
      />

      {/* Middle Metallic Gold Subtle Highlight */}
      <div
        style={{
          position: 'absolute',
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229, 199, 107, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Polished Core Dot */}
      <div
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: '#E5C76B',
          boxShadow: '0 0 8px #D4AF37, 0 0 2px #ffffff',
          position: 'relative',
          zIndex: 2,
        }}
      />

      {/* Dynamic Text Label (for gallery/view cards) */}
      <span
        ref={labelRef}
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: '9px',
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#090909',
          zIndex: 3,
          opacity: 0,
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none',
        }}
      />

      <style jsx global>{`
        /* Hide standard cursor on desktop devices with fine pointer */
        @media (pointer: fine) {
          body, a, button, input, textarea, select, [role="button"] {
            cursor: none !important;
          }
        }

        /* Subtle idle shimmer effect */
        .cursor-idle > div:first-child {
          animation: cursorShimmer 3s infinite ease-in-out;
        }

        @keyframes cursorShimmer {
          0%, 100% {
            box-shadow: 0 0 12px rgba(212, 175, 55, 0.15), inset 0 0 6px rgba(200, 169, 90, 0.1);
            border-color: rgba(200, 169, 90, 0.45);
          }
          50% {
            box-shadow: 0 0 22px rgba(229, 199, 107, 0.35), inset 0 0 12px rgba(212, 175, 55, 0.25);
            border-color: rgba(229, 199, 107, 0.8);
          }
        }
      `}</style>
    </div>
  )
}