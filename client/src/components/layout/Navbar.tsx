import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  ShoppingCart, 
  Heart, 
  User, 
} from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import SearchBar from '@/components/ui/SearchBar'

const Navbar: React.FC = () => {
  const { itemCount } = useCart()
  const { itemCount: wishlistCount } = useWishlist()
  const navigate = useNavigate()

  const handleSearch = (query: string) => {
    navigate(`/category/all?search=${encodeURIComponent(query)}`)
  }


  return (
    <nav className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-gray-900 font-bold text-sm">M</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar
              onSearch={handleSearch}
              suggestions={['Sofa', 'Chair', 'Table', 'Cabinet', 'Bed']}
            />
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">

            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Profile */}
            <Link to="/profile" className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchBar
            onSearch={handleSearch}
            suggestions={['Sofa', 'Chair', 'Table', 'Cabinet', 'Bed']}
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
