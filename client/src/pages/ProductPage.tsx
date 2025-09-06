import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Share2, 
  Star, 
  Plus, 
  Minus, 
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Button from '@/components/ui/Button'
import ProductCard from '@/components/ui/ProductCard'
import { mockProducts } from '@/data/mockData'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { Product } from '@/types'
import { apiClient } from '@/lib/apiClient'

const ProductPage: React.FC = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist } = useWishlist()
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [product, setProducts] = useState<Product | null>(null);

  // const product = mockProducts.find(p => p._id === productId)
  const relatedProducts = mockProducts.filter(p => p._id !== productId && p.category === product?.category).slice(0, 4)

  // if (!product) {
  //   return (
  //     <div className="container py-20 text-center">
  //       <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h1>
  //       <Button onClick={() => navigate('/')}>Return Home</Button>
  //     </div>
  //   )
  // }

  console.log({product});

  const handleAddToCart = () => {
    if(!product) return;
    addItem(product, quantity, selectedColor, selectedSize)
  }

  const handleAddToWishlist = () => {
    if(!product) return;
    addToWishlist(product)
  }

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product._id}`)
  }

  const features = [
    { icon: Truck, text: 'Free delivery on orders over $30.0' },
    { icon: Shield, text: '2 year warranty' },
    { icon: RotateCcw, text: '30 day return policy' }
  ]

  const fetchProduct = async() => {
    try{
      const res = await apiClient.get(`/product/${productId}`);
      console.log({res});
      
      if(res.status === 200){
        setProducts(res.data.data);
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [])
  

  return (
    <>
      {product && <Helmet>
        <title>{`${product && product.name} - Modulive`}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} - Modulive`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images[0]} />
      </Helmet>}

      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-gray-900 dark:hover:text-white">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigate('/category/all')} className="hover:text-gray-900 dark:hover:text-white">
            Products
          </button>
          <span>/</span>
          <span className="text-gray-900 dark:text-white capitalize">{product && product.category}</span>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{product && product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden aspect-square"
            >
             {product &&  <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />}
              
              {/* Navigation Arrows */}
              {product && product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </motion.div>

            {/* Thumbnail Images */}
            {product && product.images.length > 1 && (
              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? 'border-gray-900 dark:border-white'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand and Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center">
                  <span className="text-white dark:text-gray-900 font-bold text-xs">R</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{product && product.brand}</span>
              </div>
              <span className="text-sm text-gray-500">HR1325R00 - 8</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              {product && product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {product && [...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {product && product.review} reviews
              </span>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-gray-900 dark:text-white">
              ${product && product.price.toFixed(2)}
            </div>

            {/* Color Selection */}
            {/* {product && product.colors.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-lg border-2 transition-colors ${
                        selectedColor === color
                          ? 'border-gray-900 dark:border-white'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                      style={{ 
                        backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                       color.toLowerCase() === 'black' ? '#000000' :
                                       color.toLowerCase() === 'gray' ? '#6b7280' :
                                       color.toLowerCase() === 'blue' ? '#3b82f6' :
                                       color.toLowerCase() === 'beige' ? '#f5f5dc' :
                                       color.toLowerCase() === 'brown' ? '#8b4513' :
                                       color.toLowerCase() === 'teal' ? '#14b8a6' :
                                       color.toLowerCase() === 'natural' ? '#d4a574' : '#6b7280'
                      }}
                    />
                  ))}
                </div>
                {selectedColor && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 capitalize">
                    {selectedColor}
                  </p>
                )}
              </div>
            )} */}

            {/* Size Selection */}
            {/* {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">Size</h3>
                  <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Size guide
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 border rounded-lg text-center transition-colors ${
                        selectedSize === size
                          ? 'border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )} */}

            {/* Quantity */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!product?.stockQuantity}
                className="flex-1"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleAddToWishlist}
                className="p-3"
              >
                {product && <Heart className={`h-5 w-5 ${isInWishlist(product._id) ? 'fill-current text-red-500' : ''}`} />}
              </Button>
              <Button variant="outline" size="lg" className="p-3">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 py-2">
                  <feature.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              You might also like
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}

export default ProductPage
