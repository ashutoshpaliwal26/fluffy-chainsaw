export interface Product {
  _id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  brand: string
  rating: number
  reviewCount: number
  inStock: boolean
  colors?: string[]
  sizes?: string[]
  tags?: string[]
  features?: string[]
  stockQuantity? : number
  review? : number
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedColor?: string
  selectedSize?: string
}

export interface WishlistItem {
  id: string
  product: Product
  addedAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  addresses: Address[]
  orders: Order[]
}

export interface Address {
  id: string
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: Date
  shippingAddress: Address
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  productCount: number
}

export interface FilterOptions {
  categories: string[]
  priceRange: [number, number]
  brands: string[]
  colors: string[]
  sizes: string[]
  rating: number
}

export interface SortOption {
  value: string
  label: string
}

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}
