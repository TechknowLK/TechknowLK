'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Edit, Package, Tag, Layers } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ShopDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/shop/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/shop/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success('Product deleted successfully');
        fetchProducts();
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('An error occurred');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Shop Inventory</h1>
          <p className="text-slate-500 mt-1">Manage your electrical and electronic products</p>
        </div>
        <div className="flex gap-3">
           <Link
            href="/admin/shop/categories"
            className="bg-white text-slate-700 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 border border-slate-200 hover:bg-slate-50 transition-all duration-200"
          >
            <Layers className="w-5 h-5" />
            Categories
          </Link>
          <Link
            href="/admin/shop/sub-categories"
            className="bg-white text-slate-700 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 border border-slate-200 hover:bg-slate-50 transition-all duration-200"
          >
            <Layers className="w-5 h-5" />
            Sub-Categories
          </Link>
           <Link
            href="/admin/shop/brands"
            className="bg-white text-slate-700 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 border border-slate-200 hover:bg-slate-50 transition-all duration-200"
          >
            <Tag className="w-5 h-5" />
            Brands
          </Link>
          <Link
            href="/admin/shop/new"
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center text-slate-500">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="p-20 text-center text-slate-500 flex flex-col items-center gap-4">
            <Package className="w-12 h-12 text-slate-300" />
            <p>No products found. Start by adding your first item!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-8 py-5 font-semibold text-slate-900 text-sm">Product</th>
                  <th className="px-8 py-5 font-semibold text-slate-900 text-sm">Category</th>
                  <th className="px-8 py-5 font-semibold text-slate-900 text-sm">Brand</th>
                  <th className="px-8 py-5 font-semibold text-slate-900 text-sm">Price</th>
                  <th className="px-8 py-5 font-semibold text-slate-900 text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors duration-200">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        {product.images?.[0] && (
                          <img 
                            src={product.images[0]} 
                            alt={product.name} 
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200" 
                          />
                        )}
                        <span className="font-semibold text-slate-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {product.category?.name}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-600">{product.brand?.name}</td>
                    <td className="px-8 py-5 font-medium text-slate-900">
                      LKR {product.price?.toLocaleString()}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <Link 
                          href={`/admin/shop/edit/${product.id}`}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
