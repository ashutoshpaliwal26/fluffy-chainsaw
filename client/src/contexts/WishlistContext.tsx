import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { WishlistItem, Product } from '@/types'
import toast from 'react-hot-toast'

interface WishlistState {
  items: WishlistItem[]
  itemCount: number
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] }

interface WishlistContextType extends WishlistState {
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.payload
      const existingItem = state.items.find(item => item.product.id === product.id)
      
      if (existingItem) {
        return state // Item already exists
      }

      const newItem: WishlistItem = {
        id: `wishlist-${product.id}`,
        product,
        addedAt: new Date(),
      }

      return {
        items: [...state.items, newItem],
        itemCount: state.itemCount + 1,
      }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.product.id !== action.payload)
      return {
        items: newItems,
        itemCount: newItems.length,
      }
    }

    case 'CLEAR_WISHLIST':
      return { items: [], itemCount: 0 }

    case 'LOAD_WISHLIST': {
      const items = action.payload
      return {
        items,
        itemCount: items.length,
      }
    }

    default:
      return state
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    itemCount: 0,
  })

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      try {
        const items = JSON.parse(savedWishlist).map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt),
        }))
        dispatch({ type: 'LOAD_WISHLIST', payload: items })
      } catch (error) {
        console.error('Failed to load wishlist from localStorage:', error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.items))
  }, [state.items])

  const addItem = (product: Product) => {
    const existingItem = state.items.find(item => item.product.id === product.id)
    if (existingItem) {
      toast.error(`${product.name} is already in your wishlist`)
      return
    }
    
    dispatch({ type: 'ADD_ITEM', payload: product })
    toast.success(`${product.name} added to wishlist`)
  }

  const removeItem = (productId: string) => {
    const item = state.items.find(item => item.product.id === productId)
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
    if (item) {
      toast.success(`${item.product.name} removed from wishlist`)
    }
  }

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' })
    toast.success('Wishlist cleared')
  }

  const isInWishlist = (productId: string) => {
    return state.items.some(item => item.product.id === productId)
  }

  return (
    <WishlistContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
