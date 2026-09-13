// data/menu.ts
//
// PLACEHOLDER MENU — Space Next Door demo (space-next-door-demo branch).
// No real menu, dish names, or prices could be publicly verified for this
// venue, so every item below is a clearly-labeled placeholder rather than
// an invented dish. Replace with the client's real menu (names, descriptions,
// prices, photos) before this demo goes live. Category keys are unchanged
// from the original site (see types/menu.ts) to avoid touching MenuFilter/
// MenuCard component logic; only their display labels are re-themed for a
// sports bar & grill.
//
// Swap the `image` paths for real photography once it's shot — everything
// else (cards, filters, badges) reads from here, nothing is hardcoded in
// the components.

import type {
  DietaryTag,
  MenuBadgeType,
  MenuFilterCategory,
  MenuItem,
} from '@/types/menu'

export const CATEGORY_LABELS: Record<MenuFilterCategory, string> = {
  all: 'All Selection',
  breakfast: 'Bar Bites & Starters',
  mains: 'Grill & Mains',
  'pizzas-burgers': 'Pizzas & Burgers',
  cocktails: 'Cocktails & Spirits',
}

export const MENU_CATEGORIES: MenuFilterCategory[] = [
  'all',
  'breakfast',
  'mains',
  'pizzas-burgers',
  'cocktails',
]

export const BADGE_LABELS: Record<MenuBadgeType, string> = {
  'chefs-selection': "Chef's Selection",
  'house-favourite': 'House Favourite',
  'signature-dish': 'Signature Dish',
  'premium-cut': 'Premium Cut',
  'wine-pairing': 'Wine Pairing Available',
}

export const DIETARY_TAG_META: Record<DietaryTag, { label: string; icon: string }> = {
  vegetarian: { label: 'Vegetarian', icon: '🌿' },
  'gluten-free': { label: 'Gluten Free', icon: '🌾' },
  'contains-nuts': { label: 'Contains Nuts', icon: '🥜' },
  dairy: { label: 'Dairy', icon: '🥛' },
  spicy: { label: 'Hot / Spicy', icon: '🌶' },
}

// PLACEHOLDER ITEMS — none of these are real dishes. `rating` and `price`
// are set to 0 with currency "TBC" so nothing on screen reads as a real,
// confirmed price. Replace every field with the client's actual menu.
export const MENU_ITEMS: MenuItem[] = [
  // ── Bar Bites & Starters ───────────────────────────────────────
  {
    id: 'starter-placeholder-1',
    title: '[Starter — name TBC]',
    category: 'breakfast',
    description: '[Add real description once the menu is confirmed]',
    image: '/images/menu/starter-placeholder-1.png',
    rating: 0,
    price: 0,
    currency: 'TBC',
  },
  {
    id: 'starter-placeholder-2',
    title: '[Starter — name TBC]',
    category: 'breakfast',
    description: '[Add real description once the menu is confirmed]',
    image: '/images/menu/starter-placeholder-2.png',
    rating: 0,
    price: 0,
    currency: 'TBC',
  },

  // ── Grill & Mains ────────────────────────────────────────────
  {
    id: 'grill-placeholder-1',
    title: '[Grill dish — name TBC]',
    category: 'mains',
    description: '[Add real description once the menu is confirmed]',
    image: '/images/menu/grill-placeholder-1.png',
    rating: 0,
    price: 0,
    currency: 'TBC',
  },
  {
    id: 'grill-placeholder-2',
    title: '[Grill dish — name TBC]',
    category: 'mains',
    description: '[Add real description once the menu is confirmed]',
    image: '/images/menu/grill-placeholder-2.png',
    rating: 0,
    price: 0,
    currency: 'TBC',
  },
  {
    id: 'grill-placeholder-3',
    title: '[Grill dish — name TBC]',
    category: 'mains',
    description: '[Add real description once the menu is confirmed]',
    image: '/images/menu/grill-placeholder-3.png',
    rating: 0,
    price: 0,
    currency: 'TBC',
  },

  // ── Pizzas & Burgers ─────────────────────────────────────────
  {
    id: 'pizza-burger-placeholder-1',
    title: '[Pizza or burger — name TBC]',
    category: 'pizzas-burgers',
    description: '[Add real description once the menu is confirmed]',
    image: '/images/menu/pizza-burger-placeholder-1.png',
    rating: 0,
    price: 0,
    currency: 'TBC',
  },
  {
    id: 'pizza-burger-placeholder-2',
    title: '[Pizza or burger — name TBC]',
    category: 'pizzas-burgers',
    description: '[Add real description once the menu is confirmed]',
    image: '/images/menu/pizza-burger-placeholder-2.png',
    rating: 0,
    price: 0,
    currency: 'TBC',
  },

  // ── Cocktails & Spirits ──────────────────────────────────────
  {
    id: 'cocktail-placeholder-1',
    title: '[Cocktail — name TBC]',
    category: 'cocktails',
    description: '[Add real description once the menu is confirmed]',
    image: '/images/menu/cocktail-placeholder-1.png',
    rating: 0,
    price: 0,
    currency: 'TBC',
  },
  {
    id: 'cocktail-placeholder-2',
    title: '[Cocktail — name TBC]',
    category: 'cocktails',
    description: '[Add real description once the menu is confirmed]',
    image: '/images/menu/cocktail-placeholder-2.png',
    rating: 0,
    price: 0,
    currency: 'TBC',
  },
  {
    id: 'cocktail-placeholder-3',
    title: '[Cocktail — name TBC]',
    category: 'cocktails',
    description: '[Add real description once the menu is confirmed]',
    image: '/images/menu/cocktail-placeholder-3.png',
    rating: 0,
    price: 0,
    currency: 'TBC',
  },
]
