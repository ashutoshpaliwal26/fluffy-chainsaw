import React from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Product } from '@/types'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { cn } from '@/utils/cn'
import Card from './Card'
import Button from './Button'

interface ProductCardProps {
  product: Product
  className?: string
  onProductClick?: (product: Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className, onProductClick }) => {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const isWishlisted = isInWishlist(product._id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isWishlisted) {
      removeFromWishlist(product._id)
    } else {
      addToWishlist(product)
    }
  }

  const handleProductClick = () => {
    onProductClick?.(product)
  }

  return (
    <Card hover className={cn('group cursor-pointer', className)} onClick={handleProductClick}>
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
        <button
          onClick={handleWishlistToggle}
          className={cn(
            'absolute top-3 right-3 p-2 rounded-full transition-all duration-200',
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          )}
        >
          <Heart className={cn('h-4 w-4', isWishlisted && 'fill-current')} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">{product.brand}</span>
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600 ml-1">
              {product.rating} ({product.review})
            </span>
          </div>
        </div>

        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="p-2"
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {typeof product.stockQuantity === 'number' && (
          <div
            className={`mt-2 text-xs ${
              product.stockQuantity <= 0
                ? "text-red-500"
                : product.stockQuantity <= 10
                ? "text-yellow-500"
                : "text-green-500"
            } font-medium`}
          >
            {product.stockQuantity <= 0
              ? "Out of Stock"
              : product.stockQuantity <= 10
              ? "Low Stock"
              : "In Stock"}
          </div>
        )}
      </div>
    </Card>
  )
}

export default ProductCard
