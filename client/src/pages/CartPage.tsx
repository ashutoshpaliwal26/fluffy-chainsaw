import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useCart } from '@/contexts/CartContext'
import { handelAuthentication } from '@/utils/handelAuth'

const CartPage: React.FC = () => {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart()
  const navigate = useNavigate()

  const shipping = 15.00
  const tax = total * 0.08
  const finalTotal = total + shipping + tax

  // Ensure itemCount is always a number
  const handleCheckOut = async () => {
    const isAuth = await handelAuthentication(); 
    if (!isAuth) {
      navigate("/login");
    }
    navigate("/checkout");
  }

  const safeItemCount = typeof itemCount === 'number' ? itemCount : 0

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - Modulive</title>
        </Helmet>

        <div className="container py-20">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your cart is empty
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button onClick={() => navigate('/category/all')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{`Shopping Cart (${safeItemCount}) - Modulive`}</title>
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
            Shopping Cart
          </h1>
          <span className="text-gray-600 dark:text-gray-400">
            ({itemCount} items)
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex space-x-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.product.brand}
                    </p>

                    {item.selectedColor && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Color: <span className="capitalize">{item.selectedColor}</span>
                      </p>
                    )}

                    {item.selectedSize && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Size: {item.selectedSize}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            ${item.product.price.toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Link to="/category/all">
                <Button variant="ghost">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-8"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal ({itemCount} items)
                  </span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full mt-6"
                onClick={handleCheckOut}
              >
                Proceed to Checkout
              </Button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Free shipping on orders over $100
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartPage
