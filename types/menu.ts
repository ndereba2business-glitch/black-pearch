// types/menu.ts

export type MenuCategory =
  | 'breakfast'
  | 'mains'
  | 'pizzas-burgers'
  | 'cocktails'

export type MenuFilterCategory = 'all' | MenuCategory

export type DietaryTag =
  | 'vegetarian'
  | 'gluten-free'
  | 'contains-nuts'
  | 'dairy'
  | 'spicy'

export type MenuBadgeType =
  | 'chefs-selection'
  | 'house-favourite'
  | 'signature-dish'
  | 'premium-cut'
  | 'wine-pairing'

export interface MenuItem {
  id: string
  title: string
  category: MenuCategory
  description: string
  image: string
  badge?: MenuBadgeType
  dietaryTags?: DietaryTag[]
  pairing?: string
  rating: number
  price: number
  currency?: string
}