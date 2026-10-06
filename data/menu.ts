// Single source of truth for the featured menu. Components read everything
// from here — to change a dish, a price or a photograph, edit this file.
//
// Photographs live in public/images/menu/. An item without an `image` is
// still listed; it simply shows the crest in place of a picture.

import type { DietaryTag, MenuBadgeType, MenuFilterCategory, MenuItem } from '@/types/menu'

import croissantBenedict from '@/public/images/menu/golden-croissant-benedict.jpg'
import avocadoToast from '@/public/images/menu/truffle-avocado-toast.jpg'
import frenchToast from '@/public/images/menu/artisan-french-toast-flight.jpg'
import garlicChicken from '@/public/images/menu/creamy-garlic-chicken.jpg'
import lambShank from '@/public/images/menu/slow-braised-lamb-shank.jpg'
import nilePerch from '@/public/images/menu/pan-seared-nile-perch.jpg'
import ugaliFish from '@/public/images/menu/ugali-and-fish.jpg'
import smashBurger from '@/public/images/menu/wagyu-smash-burger.jpg'
import porkPizza from '@/public/images/menu/smoked-bbq-pulled-pork-pizza.jpg'
import spritz from '@/public/images/menu/golden-hour-spritz.jpg'
import whiskeySour from '@/public/images/menu/smoked-whiskey-sour.jpg'

export const MENU_CURRENCY = 'KES'

export const MENU_CATEGORIES: MenuFilterCategory[] = [
  'all',
  'breakfast',
  'mains',
  'pizzas-burgers',
  'cocktails',
]

export const CATEGORY_LABELS: Record<MenuFilterCategory, string> = {
  all: 'All',
  breakfast: 'Breakfast & Café',
  mains: 'Signature Mains',
  'pizzas-burgers': 'Pizzas & Burgers',
  cocktails: 'Craft Cocktails',
}

export const BADGE_LABELS: Record<MenuBadgeType, string> = {
  'chefs-selection': 'Chef’s selection',
  'house-favourite': 'House favourite',
  'signature-dish': 'Signature',
  'premium-cut': 'Premium cut',
}

export const DIETARY_LABELS: Record<DietaryTag, string> = {
  vegetarian: 'Vegetarian',
  'gluten-free': 'Gluten free',
  'contains-nuts': 'Contains nuts',
  dairy: 'Dairy',
  spicy: 'Spicy',
}

export const MENU_ITEMS: MenuItem[] = [
  // ── Breakfast & Café ─────────────────────────────────────────
  {
    id: 'golden-croissant-benedict',
    title: 'Golden Croissant Benedict',
    category: 'breakfast',
    description:
      'Butter-laminated croissant, slow-poached egg, hollandaise, smoked salmon ribbons.',
    image: croissantBenedict,
    imagePosition: '50% 38%',
    badge: 'chefs-selection',
    dietaryTags: ['dairy'],
    pairing: 'Fresh Orange Press',
    price: 950,
  },
  {
    id: 'truffle-avocado-toast',
    title: 'Truffle Avocado Toast',
    category: 'breakfast',
    description:
      'Charred sourdough, whipped avocado, black truffle oil, chili flake, microgreens.',
    image: avocadoToast,
    badge: 'house-favourite',
    dietaryTags: ['vegetarian'],
    price: 850,
  },
  {
    id: 'artisan-french-toast-flight',
    title: 'Artisan French Toast Flight',
    category: 'breakfast',
    description: 'Brioche trio dusted in cinnamon sugar, salted caramel, roasted hazelnut.',
    image: frenchToast,
    badge: 'signature-dish',
    dietaryTags: ['dairy', 'contains-nuts'],
    price: 900,
  },

  // ── Signature Mains ──────────────────────────────────────────
  {
    id: 'creamy-garlic-chicken',
    title: 'Creamy Garlic Chicken',
    category: 'mains',
    description: 'Pan-fried chicken in garlic butter cream, fresh coriander, walnuts.',
    image: garlicChicken,
    badge: 'chefs-selection',
    dietaryTags: ['dairy', 'contains-nuts'],
    pairing: 'Chardonnay',
    price: 1200,
  },
  {
    id: 'slow-braised-lamb-shank',
    title: 'Slow-Braised Lamb Shank',
    category: 'mains',
    description: 'Twelve-hour braise, red wine jus, root vegetable purée, rosemary oil.',
    image: lambShank,
    badge: 'premium-cut',
    dietaryTags: ['gluten-free'],
    pairing: 'Malbec',
    price: 1800,
  },
  {
    id: 'pan-seared-nile-perch',
    title: 'Pan-Seared Nile Perch',
    category: 'mains',
    description: 'Crisp-skin perch, brown butter, capers, charred lemon, seasonal greens.',
    image: nilePerch,
    badge: 'house-favourite',
    dietaryTags: ['gluten-free', 'dairy'],
    pairing: 'Sauvignon Blanc',
    price: 1450,
  },
  {
    id: 'ugali-and-fish',
    title: 'Ugali and Fish',
    category: 'mains',
    description: 'Whole fried fish with ugali, greens and kachumbari.',
    image: ugaliFish,
    badge: 'chefs-selection',
    dietaryTags: ['dairy'],
    price: 800,
  },

  // ── Pizzas & Burgers ─────────────────────────────────────────
  {
    id: 'wagyu-smash-burger',
    title: 'Wagyu Smash Burger',
    category: 'pizzas-burgers',
    description:
      'Double-smashed wagyu, aged cheddar, caramelized onion, truffle aioli, brioche bun.',
    image: smashBurger,
    imagePosition: '50% 70%',
    badge: 'signature-dish',
    dietaryTags: ['dairy'],
    price: 1350,
  },
  {
    id: 'smoked-bbq-pulled-pork-pizza',
    title: 'Smoked BBQ Pulled Pork Pizza',
    category: 'pizzas-burgers',
    description: 'Twelve-hour smoked pork, house BBQ glaze, pickled red onion, smoked mozzarella.',
    image: porkPizza,
    badge: 'house-favourite',
    dietaryTags: ['spicy', 'dairy'],
    price: 1250,
  },

  // ── Craft Cocktails ──────────────────────────────────────────
  {
    id: 'black-perch-old-fashioned',
    title: 'The Black Perch Old Fashioned',
    category: 'cocktails',
    description: 'Bourbon, smoked demerara, orange bitters, hand-cut ice, torched orange peel.',
    badge: 'signature-dish',
    price: 2000,
  },
  {
    id: 'golden-hour-spritz',
    title: 'Golden Hour Spritz',
    category: 'cocktails',
    description: 'Prosecco, elderflower, fresh grapefruit, soda, edible gold leaf.',
    image: spritz,
    imagePosition: '50% 45%',
    badge: 'house-favourite',
    price: 850,
  },
  {
    id: 'smoked-whiskey-sour',
    title: 'Smoked Whiskey Sour',
    category: 'cocktails',
    description: 'Rye whiskey, fresh lemon, egg white foam, applewood smoke finish.',
    image: whiskeySour,
    imagePosition: '50% 62%',
    price: 1050,
  },
]
