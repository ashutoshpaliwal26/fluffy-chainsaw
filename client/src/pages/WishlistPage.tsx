import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'
import ProductCard from '@/components/ui/ProductCard'
import { useWishlist } from '@/contexts/WishlistContext'
import { useCart } from '@/contexts/CartContext'
import { Product } from '@/types'

const WishlistPage: React.FC = () => {
  const { items, removeItem, clearWishlist } = useWishlist()
  const { addItem } = useCart()
  const navigate = useNavigate()

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product._id}`)
  }

  const handleMoveToCart = (product: Product) => {
    addItem(product)
    removeItem(product._id)
  }

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Wishlist - Modulive</title>
        </Helmet>
        
        <div className="container py-20">
          <div className="text-center max-w-md mx-auto">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your wishlist is empty
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Save items you love to your wishlist and shop them later.
            </p>
            <Button onClick={() => navigate('/category/all')}>
              Start Shopping
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{`Wishlist (${items.length || 0}) - Modulive`}</title>
      </Helmet>

      <div className="container py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Wishlist
          </h1>
          <span className="text-gray-600 dark:text-gray-400">
            ({items.length} items)
          </span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Items you've saved for later
          </p>
          <Button variant="outline" onClick={clearWishlist}>
            Clear Wishlist
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative group"
            >
              <ProductCard
                product={item.product}
                onProductClick={handleProductClick}
              />
              
              {/* Move to Cart Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Button
                  size="sm"
                  onClick={() => handleMoveToCart(item.product)}
                  className="w-full"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Move to Cart
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}

export default WishlistPage
