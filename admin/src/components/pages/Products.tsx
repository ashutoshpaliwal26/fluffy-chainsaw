import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ChevronDown
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { type Product } from '../../data/mockData';
import ProductForm from '../other/ProductForm';
import { useToast } from '../../contexts/ToastContext';
import { AxiosError, type AxiosPromise } from 'axios';
import type { ErrorResponse } from '../../utils/apiClient';
import apiClient from '../../utils/apiClient';

export const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [addProduct, setAddProduct] = useState<boolean>(false);
  const [product, setProduct] = useState<Product[] | null>(null);
  const showToast = useToast();

  const categories = ['All', ...Array.from(new Set(product && product.map(p => p.category)))];

  const closeForm = () => {
    setAddProduct(false);
  }

  const getStatusVariant = (stock: number) => {

    console.log(product)

    console.log({ stock });

    let status = "In Stock";
    if (stock <= 10) {
      status = "Low Stock"
    }

    if (stock <= 0) {
      status = "Out of Stock"
    }

    switch (status) {
      case 'In Stock': return 'success';
      case 'Low Stock': return 'warning';
      case 'Out of Stock': return 'error';
      default: return 'neutral';
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await apiClient.get("/product", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`
        }
      });

      if (res.status === 200) {
        setProduct(res.data.data);
      }

    } catch (err) {
      console.log({ err });
      const error = err as AxiosError<ErrorResponse>
      if (showToast) {
        showToast(error.response?.data.message ?? "Some Unknown Error !!!", 3, "error")
      }
    }
  }

  console.log({ product });

  const deleteProduct = async (id: string) => {
    try {
      const res = await apiClient.delete(`/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`
        }
      })
      console.log({ res });

      if (res.status === 200) {
        if (showToast) {
          showToast("Item Delete Successfully", 3);
          fetchProducts();
        }
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      if (showToast) {
        showToast(error.response?.data.message ?? "Internal Servier Error", 3, "error");
      }
    }
  }


  useEffect(() => {
    fetchProducts();
  }, [addProduct])

  return (
    <div
      className="p-6 space-y-6 relative"
    >
      {addProduct &&
        <div className='absolute z-10 w-full h-full'>
          <ProductForm closeForm={closeForm}/>
        </div>
      }
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your product inventory</p>
        </div>
        <Button className='cursor-pointer' icon={Plus} onClick={() => setAddProduct(true)}>Add Product</Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none pr-10 pl-4 py-2.5 bg-gray-50 dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pr-10 pl-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="stock">Stock</option>
              <option value="category">Category</option>
            </select>
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Products Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {product && product.map((product, index) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={product.images[0]}
                        alt={product.images[0]}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          ID: {product._id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {product.stockQuantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusVariant(product.stockQuantity as number)}>
                      {product.stockQuantity <= 10 ? "Low Stock" : `${product.stockQuantity <= 0 ? "Out of Stock" : "In Stock"}`}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <Button variant="ghost" size="sm" icon={Edit} />
                    <Button variant="ghost" size="sm" icon={Trash2} className="text-red-600 hover:text-red-700" onClick={() => deleteProduct(product._id)} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {product && product.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No products found matching your criteria.</p>
          </div>
        )}
      </Card>
    </div>
  );
};