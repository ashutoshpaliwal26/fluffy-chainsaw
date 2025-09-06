import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { CartProvider } from '@/contexts/CartContext'
import { WishlistProvider } from '@/contexts/WishlistContext'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import CategoryPage from '@/pages/CategoryPage'
import ProductPage from '@/pages/ProductPage'
import CartPage from '@/pages/CartPage'
import WishlistPage from '@/pages/WishlistPage'
import CheckoutPage from '@/pages/CheckoutPage'
import LoginPage from '@/pages/auth/LoginPage'
import SignupPage from '@/pages/auth/SignupPage'
import ProfilePage from '@/pages/ProfilePage'
import NotFoundPage from '@/pages/NotFoundPage'
import GoogleAuthLogin from './pages/auth/GoogleAuthLogin'
import OTPVerifyPage from './pages/OTPVerifyPage'
function App() {

  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="category/:categoryId" element={<CategoryPage />} />
              <Route path="product/:productId" element={<ProductPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route path='/google-auth' element={<GoogleAuthLogin/>}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify/:userId" element={<OTPVerifyPage/>}/>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
