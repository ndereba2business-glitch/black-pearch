import type { StaticImageData } from 'next/image'

export type MenuCategory = 'breakfast' | 'mains' | 'pizzas-burgers' | 'cocktails'

export type MenuFilterCategory = 'all' | MenuCategory

export type DietaryTag = 'vegetarian' | 'gluten-free' | 'contains-nuts' | 'dairy' | 'spicy'

export type MenuBadgeType =
  | 'chefs-selection'
  | 'house-favourite'
  | 'signature-dish'
  | 'premium-cut'

export interface MenuItem {
  id: string
  title: string
  category: MenuCategory
  description: string
  /** Omit until a real photograph of the item exists. */
  image?: StaticImageData
  /** CSS object-position for the square thumbnail crop. */
  imagePosition?: string
  badge?: MenuBadgeType
  dietaryTags?: DietaryTag[]
  pairing?: string
  /** Price in Kenyan shillings. */
  price: number
}
