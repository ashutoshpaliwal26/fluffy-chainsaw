import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Star, Users, Award, Leaf } from 'lucide-react'
import Button from '@/components/ui/Button'
import ProductCard from '@/components/ui/ProductCard'
import { mockProducts, heroProducts } from '@/data/mockData'
import { Product } from '@/types'

const HomePage: React.FC = () => {
  const navigate = useNavigate()

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product._id}`)
  }

  const handleShopNow = () => {
    navigate('/category/all')
  }

  const stats = [
    { value: '18K+', label: 'Happy and loyal customers buy and trust Modulive' },
    { value: '700+', label: 'Products from more than 100 brands and 50 stores' },
    { value: '95%', label: 'Customers who have purchased and have been loyal' }
  ]

  const features = [
    { 
      title: 'Sustainability', 
      description: 'Eco-friendly materials and sustainable production methods',
      icon: Leaf 
    },
    { 
      title: 'Unrivaled quality', 
      description: 'Premium craftsmanship with attention to every detail',
      icon: Award 
    },
    { 
      title: 'Unmatched variety', 
      description: 'Wide selection of furniture for every space and style',
      icon: Star 
    },
    { 
      title: 'Legacy of excellence', 
      description: 'Years of experience in creating beautiful furniture',
      icon: Users 
    }
  ]

  return (
    <>
      <Helmet>
        <title>Modulive - Transform Space with Sustainable Furniture</title>
        <meta name="description" content="Discover our collection of modern, sustainable furniture designed to transform your living space. Shop sofas, chairs, tables and more." />
        <meta property="og:title" content="Modulive - Transform Space with Sustainable Furniture" />
        <meta property="og:description" content="Discover our collection of modern, sustainable furniture designed to transform your living space." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="container lg:py-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* <div className="flex items-center space-x-4 mb-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Design Team</p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">4.9 (1.2k Reviews)</span>
                  </div>
                </div>
              </div> */}

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Transform
                
                Space with{' '}
                
                Sustainable Furniture
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                Discover our curated collection of modern, eco-friendly furniture designed to elevate your living space while caring for the planet.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={handleShopNow} className="group">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="group">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Video
                </Button>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop"
                  alt="Modern living room with sustainable furniture"
                  className="w-full h-80 lg:h-96 object-cover"
                />
                
                {/* Floating Product Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-large"
                >
                  <img src={heroProducts[0].image} alt={heroProducts[0].name} className="w-16 h-12 object-cover rounded-lg mb-2" />
                  <p className="text-xs font-medium text-gray-900 dark:text-gray-100">{heroProducts[0].name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">${heroProducts[0].price}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-large"
                >
                  <img src={heroProducts[1].image} alt={heroProducts[1].name} className="w-16 h-12 object-cover rounded-lg mb-2" />
                  <p className="text-xs font-medium text-gray-900 dark:text-gray-100">{heroProducts[1].name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">${heroProducts[1].price}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm max-w-xs mx-auto">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Best Quality Products
            </h2>
            
            {/* Category Filters */}
            {/* <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['All', 'Chair', 'Cabinet', 'Sofa', 'Bed'].map((category) => (
                <button
                  key={category}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    category === 'All'
                      ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                      : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div> */}
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockProducts.slice(0, 6).map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} onProductClick={handleProductClick} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop"
                  alt="Modern interior design"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Button variant="secondary" size="lg" className="bg-white/90 hover:bg-white">
                    <Play className="mr-2 h-5 w-5" />
                    Watch the video and learn more about Modulive
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                Why Choose Us
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We are committed to providing the highest quality furniture with sustainable practices and exceptional customer service.
              </p>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop"
            alt="Furniture background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              When We Create Furniture, We Strive For The Finest Quality.
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Discover our commitment to excellence in every piece we craft.
            </p>
            <Button size="lg" variant="secondary" onClick={handleShopNow}>
              See Products
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Subscribe to our newsletter and grab{' '}
              <span className="text-3xl">30% OFF</span>
            </h2>
            <div className="flex mt-6">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <Button className="rounded-l-none">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Debug Component - Remove in production */}
      {/* <CartDebug /> */}
    </>
  )
}

export default HomePage
