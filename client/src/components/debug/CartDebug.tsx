import React from 'react'
import { useCart } from '@/contexts/CartContext'
import { mockProducts } from '@/data/mockData'
import Button from '@/components/ui/Button'

const CartDebug: React.FC = () => {
  const { items, total, itemCount, addItem, clearCart } = useCart()

  const testAddItem = () => {
    const testProduct = mockProducts[0]
    console.log('Adding test product:', testProduct)
    addItem(testProduct)
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-lg z-50">
      <h3 className="font-bold mb-2">Cart Debug</h3>
      <p>Items: {itemCount}</p>
      <p>Total: ${total.toFixed(2)}</p>
      <div className="space-y-2 mt-2">
        <Button size="sm" onClick={testAddItem}>
          Test Add Item
        </Button>
        <Button size="sm" variant="outline" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>
      {items.length > 0 && (
        <div className="mt-2 text-xs">
          <p>Cart Items:</p>
          {items.map(item => (
            <div key={item.id}>
              {item.product.name} x{item.quantity}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CartDebug
