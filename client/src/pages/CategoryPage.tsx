import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/ui/ProductCard';
import SearchBar from '@/components/ui/SearchBar';
import { mockProducts, mockCategories } from '@/data/mockData';
import { Product, SortOption } from '@/types';
import { cn } from '@/utils/cn';
import { apiClient } from '@/lib/apiClient';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const [viewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [sortBy, setSortBy] = useState('featured')

  const searchQuery = searchParams.get('search') || ''
  const category = mockCategories.find(c => c.id === categoryId)
  const [products, setProducts] = useState<Product[] | null>(null);
  

  const sortOptions: SortOption[] = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' },
  ]

  // const brands = Array.from(new Set(mockProducts.map(p => p.brand)))
  // const colors = Array.from(new Set(mockProducts.flatMap(p => p.colors || [])))

  const filteredProducts = useMemo(() => {
    let products = mockProducts

    // Filter by category
    if (categoryId !== 'all') {
      products = products.filter(p => p.category === categoryId)
    }

    // Filter by search query
    if (searchQuery) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      products = products.filter(p => selectedBrands.includes(p.brand))
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      products = products.filter(p =>
        p.colors?.some(color => selectedColors.includes(color))
      )
    }

    // Filter by price range
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort products
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        products.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        products.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        products.reverse()
        break
      default:
        // Featured - keep original order
        break
    }

    return products
  }, [categoryId, searchQuery, selectedBrands, selectedColors, priceRange, sortBy])

  const handleSearch = (query: string) => {
    if (query) {
      setSearchParams({ search: query })
    } else {
      setSearchParams({})
    }
  }

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product._id}`)
  }

  // const toggleBrand = (brand: string) => {
  //   setSelectedBrands(prev =>
  //     prev.includes(brand)
  //       ? prev.filter(b => b !== brand)
  //       : [...prev, brand]
  //   )
  // }

  // const toggleColor = (color: string) => {
  //   setSelectedColors(prev =>
  //     prev.includes(color)
  //       ? prev.filter(c => c !== color)
  //       : [...prev, color]
  //   )
  // }

  const clearFilters = () => {
    setSelectedBrands([])
    setSelectedColors([])
    setPriceRange([0, 1000])
    setSortBy('featured')
  }

  const fetchProduct = async() => {
    try{
      const res = await apiClient.get("/product")
      console.log({res});
      if(res.status === 200){
        setProducts(res.data.data);
      }
    }catch(err){
      console.log(err);
    }
  }

  console.log({products});
  
  useEffect(() => {
    fetchProduct();
  }, [])

  return (
    <>
      <Helmet>
        <title>{`${category?.name || 'Products'} - Modulive`}</title>
        <meta name="description" content={`Browse our collection of ${category?.name.toLowerCase() || 'products'}`} />
      </Helmet>

      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {category?.name || 'All Products'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredProducts.length} products found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <SearchBar
              onSearch={handleSearch}
              suggestions={['Sofa', 'Chair', 'Table', 'Cabinet', 'Bed']}
              className="w-full lg:w-80"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={cn(
            'lg:w-64 space-y-6',
            showFilters ? 'block' : 'hidden lg:block'
          )}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>

              {/* Brands */}
              {/* <div className="mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Brand</h4>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => toggleColor(color)}
                      className={cn(
                        'w-8 h-8 rounded-full border-2 transition-all',
                        selectedColors.includes(color)
                          ? 'border-gray-900 dark:border-white scale-110'
                          : 'border-gray-300 dark:border-gray-600'
                      )}
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
                      title={color}
                    />
                  ))}
                </div>
              </div> */}

              {/* Price Range */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>

              <div className="flex items-center space-x-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* View Mode */}
                {/* <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2 transition-colors',
                      viewMode === 'grid'
                        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                        : 'bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                    )}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-2 transition-colors',
                      viewMode === 'list'
                        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                        : 'bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                    )}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div> */}
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className={cn(
                'grid gap-6',
                viewMode === 'grid' 
                  ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              )}>
                {products && products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <ProductCard
                      product={product}
                      onProductClick={handleProductClick}
                      className={viewMode === 'list' ? 'flex-row' : ''}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryPage
