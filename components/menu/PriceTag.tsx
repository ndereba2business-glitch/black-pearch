// components/menu/PriceTag.tsx
//
// `active` is driven by the parent MenuCard's hover state so the glow
// syncs with the rest of the card's hover choreography instead of having
// its own independent :hover trigger.

export default function PriceTag({
  price,
  currency = 'KES',
  active = false,
}: {
  price: number
  currency?: string
  active?: boolean
}) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-cormorant), serif',
        fontSize: '1.5rem',
        fontWeight: 500,
        color: '#f0ede6',
        letterSpacing: '0.02em',
        textShadow: active
          ? '0 0 18px rgba(201,169,110,0.55)'
          : '0 0 0px rgba(201,169,110,0)',
        transition: 'text-shadow 0.4s ease',
      }}
    >
      {currency} {price.toLocaleString()}
    </span>
  )
}