import { Product, Category } from '@/types'

export const mockProducts: Product[] = [
  {
    _id: '68b94d4e947cb5a0560039fa',
    name: 'Easy Sofa',
    description: 'Comfortable and stylish sofa perfect for modern living spaces',
    price: 506.00,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=400&fit=crop'
    ],
    category: 'sofa',
    brand: 'Modulive',
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    colors: ['Gray', 'Blue', 'Beige'],
    tags: ['comfortable', 'modern', 'living-room']
  },
  {
    _id: '2',
    name: 'Easy Sofa',
    description: 'Premium armchair with ergonomic design',
    price: 126.00,
    images: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop'
    ],
    category: 'chair',
    brand: 'Modulive',
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    colors: ['Gray', 'Black', 'Brown'],
    tags: ['ergonomic', 'office', 'comfortable']
  },
  {
    _id: '3',
    name: 'Cabinet',
    description: 'Spacious cabinet with modern design',
    price: 138.00,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=400&fit=crop'
    ],
    category: 'cabinet',
    brand: 'Modulive',
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    colors: ['Blue', 'White', 'Gray'],
    tags: ['storage', 'modern', 'spacious']
  },
  {
    _id: '4',
    name: 'Ruma Chair',
    description: 'Elegant dining chair with woven details',
    price: 100.00,
    images: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=400&fit=crop'
    ],
    category: 'chair',
    brand: 'Modulive',
    rating: 4.5,
    reviewCount: 67,
    inStock: true,
    colors: ['Natural', 'Black'],
    tags: ['dining', 'woven', 'elegant']
  },
  {
    _id: '5',
    name: 'Bump Pot',
    description: 'Modern decorative pot for plants',
    price: 86.00,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop'
    ],
    category: 'decor',
    brand: 'Modulive',
    rating: 4.3,
    reviewCount: 43,
    inStock: true,
    colors: ['Beige', 'White'],
    tags: ['decorative', 'plants', 'modern']
  },
  {
    _id: '6',
    name: 'Armani',
    description: 'Luxury wardrobe with premium finish',
    price: 222.00,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop'
    ],
    category: 'cabinet',
    brand: 'Modulive',
    rating: 4.9,
    reviewCount: 201,
    inStock: true,
    colors: ['Blue', 'White'],
    tags: ['luxury', 'wardrobe', 'premium']
  },
  {
    _id: '7',
    name: 'Marlin Chair',
    description: 'Comfortable office chair with modern design',
    price: 150.00,
    images: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=400&fit=crop'
    ],
    category: 'chair',
    brand: 'Modulive',
    rating: 4.7,
    reviewCount: 98,
    inStock: true,
    colors: ['Teal', 'Gray'],
    tags: ['office', 'comfortable', 'modern']
  },
  {
    _id: '8',
    name: 'Ellie Chair',
    description: 'Stylish accent chair for any room',
    price: 180.00,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop'
    ],
    category: 'chair',
    brand: 'Modulive',
    rating: 4.4,
    reviewCount: 76,
    inStock: true,
    colors: ['Brown', 'Black'],
    tags: ['accent', 'stylish', 'versatile']
  }
]

export const mockCategories: Category[] = [
  {
    id: 'all',
    name: 'All',
    slug: 'all',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
    productCount: 8
  },
  {
    id: 'chair',
    name: 'Chair',
    slug: 'chair',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&h=200&fit=crop',
    productCount: 4
  },
  {
    id: 'cabinet',
    name: 'Cabinet',
    slug: 'cabinet',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
    productCount: 2
  },
  {
    id: 'sofa',
    name: 'Sofa',
    slug: 'sofa',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&h=200&fit=crop',
    productCount: 1
  },
  {
    id: 'bed',
    name: 'Bed',
    slug: 'bed',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop',
    productCount: 0
  }
]

export const heroProducts = [
  {
    id: 'hero-1',
    name: 'Marlin Chair',
    price: 150.00,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop'
  },
  {
    id: 'hero-2',
    name: 'Ellie Chair',
    price: 180.00,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop'
  }
]
