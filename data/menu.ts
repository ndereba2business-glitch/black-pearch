// data/menu.ts
//
// Single source of truth for Featured Menu content. Swap the `image` paths
// for real photography once it's shot — everything else (cards, filters,
// badges) reads from here, nothing is hardcoded in the components.

import type {
  DietaryTag,
  MenuBadgeType,
  MenuFilterCategory,
  MenuItem,
} from '@/types/menu'

export const CATEGORY_LABELS: Record<MenuFilterCategory, string> = {
  all: 'All Selection',
  breakfast: 'Breakfast & Café',
  mains: 'Signature Mains',
  'pizzas-burgers': 'Pizzas & Burgers',
  cocktails: 'Craft Cocktails',
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

// NOTE: placeholder images — these files don't exist yet. Drop real photos
// into /public/images/menu/ using these exact filenames, or update the
// paths below once real assets are ready.
export const MENU_ITEMS: MenuItem[] = [
  // ── Breakfast & Café ─────────────────────────────────────────
  {
    id: 'golden-croissant-benedict',
    title: 'Golden Croissant Benedict',
    category: 'breakfast',
    description:
      'Butter-laminated croissant, slow-poached egg, hollandaise, smoked salmon ribbons.',
    image: '/images/menu/golden-croissant-benedict.jpg',
    badge: 'chefs-selection',
    dietaryTags: ['dairy'],
    pairing: 'Fresh Orange Press',
    rating: 4.8,
    price: 950,
  },
  {
    id: 'truffle-avocado-toast',
    title: 'Truffle Avocado Toast',
    category: 'breakfast',
    description:
      'Charred sourdough, whipped avocado, black truffle oil, chili flake, microgreens.',
    image: '/images/menu/truffle-avocado-toast.jpg',
    badge: 'house-favourite',
    dietaryTags: ['vegetarian'],
    rating: 4.7,
    price: 850,
  },
  {
    id: 'artisan-french-toast-flight',
    title: 'Artisan French Toast Flight',
    category: 'breakfast',
    description:
      'Brioche trio dusted in cinnamon sugar, salted caramel, roasted hazelnut.',
    image: '/images/menu/artisan-french-toast-flight.jpg',
    badge: 'signature-dish',
    dietaryTags: ['dairy', 'contains-nuts'],
    rating: 4.9,
    price: 900,
  },

  // ── Signature Mains ──────────────────────────────────────────
  {
    id: 'creamy-garlic-chicken',
    title: 'Creamy Garlic Chicken',
    category: 'mains',
    description:
      'Pan-fried artisan chicken with garlic butter cream, fresh coriander, walnuts.',
    image: '/images/menu/creamy-garlic-chicken.jpg',
    badge: 'chefs-selection',
    dietaryTags: ['dairy', 'contains-nuts'],
    pairing: 'Chardonnay',
    rating: 4.9,
    price: 1200,
  },
  {
    id: 'slow-braised-lamb-shank',
    title: 'Slow-Braised Lamb Shank',
    category: 'mains',
    description:
      'Twelve-hour braise, red wine jus, root vegetable purée, rosemary oil.',
    image: '/images/menu/slow-braised-lamb-shank.jpeg',
    badge: 'premium-cut',
    dietaryTags: ['gluten-free'],
    pairing: 'Malbec',
    rating: 4.8,
    price: 1800,
  },
  {
    id: 'pan-seared-nile-perch',
    title: 'Pan-Seared Nile Perch',
    category: 'mains',
    description:
      'Crisp-skin perch, brown butter, capers, charred lemon, seasonal greens.',
    image: '/images/menu/pan-seared-nile-perch.jpg',
    badge: 'house-favourite',
    dietaryTags: ['gluten-free', 'dairy'],
    pairing: 'Sauvignon Blanc',
    rating: 4.7,
    price: 1450,
  },

  // ── Pizzas & Burgers ─────────────────────────────────────────
  {
    id: 'wagyu-smash-burger',
    title: 'Wagyu Smash Burger',
    category: 'pizzas-burgers',
    description:
      'Double-smashed wagyu, aged cheddar, caramelized onion, truffle aioli, brioche bun.',
    image: '/images/menu/wagyu-smash-burger.jpg',
    badge: 'signature-dish',
    dietaryTags: ['dairy'],
    rating: 4.9,
    price: 1350,
  },
  {
    id: 'black-truffle-margherita',
    title: 'Black Truffle Margherita',
    category: 'pizzas-burgers',
    description:
      'Wood-fired sourdough base, San Marzano tomato, fior di latte, shaved black truffle.',
    image: '/images/menu/black-truffle-margherita.jpg',
    badge: 'chefs-selection',
    dietaryTags: ['vegetarian', 'dairy'],
    rating: 4.8,
    price: 1100,
  },
  {
    id: 'smoked-bbq-pulled-pork-pizza',
    title: 'Smoked BBQ Pulled Pork Pizza',
    category: 'pizzas-burgers',
    description:
      'Twelve-hour smoked pork, house BBQ glaze, pickled red onion, smoked mozzarella.',
    image: '/images/menu/smoked-bbq-pulled-pork-pizza.jpg',
    badge: 'house-favourite',
    dietaryTags: ['spicy', 'dairy'],
    rating: 4.6,
    price: 1250,
  },

  // ── Craft Cocktails ──────────────────────────────────────────
  {
    id: 'black-perch-old-fashioned',
    title: 'The Black Perch Old Fashioned',
    category: 'cocktails',
    description:
      'Bourbon, smoked demerara, orange bitters, hand-cut ice, torched orange peel.',
    image: '/images/menu/black-perch-old-fashioned.jpg',
    badge: 'signature-dish',
    rating: 4.9,
    price: 950,
  },
  {
    id: 'golden-hour-spritz',
    title: 'Golden Hour Spritz',
    category: 'cocktails',
    description:
      'Prosecco, elderflower, fresh grapefruit, soda, edible gold leaf.',
    image: '/images/menu/golden-hour-spritz.jpg',
    badge: 'house-favourite',
    rating: 4.7,
    price: 850,
  },
  {
    id: 'smoked-whiskey-sour',
    title: 'Smoked Whiskey Sour',
    category: 'cocktails',
    description:
      'Rye whiskey, fresh lemon, egg white foam, applewood smoke finish.',
    image: '/images/menu/smoked-whiskey-sour.jpg',
    rating: 4.8,
    price: 1050,
  },
]