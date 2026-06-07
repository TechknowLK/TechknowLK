'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowLeft, Layers } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function SubCategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [catRes, subRes] = await Promise.all([
        fetch('/api/shop/categories'),
        fetch('/api/shop/sub-categories')
      ]);
      const catData = await catRes.json();
      const subData = await subRes.json();
      setCategories(catData);
      setSubCategories(subData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load categories');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newSubCategory.trim() || !selectedCategoryId) {
      toast.warn('Please select a category and enter a sub-category name');
      return;
    }

    try {
      const res = await fetch('/api/shop/sub-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: newSubCategory,
          categoryId: selectedCategoryId
        }),
      });
      if (res.ok) {
        toast.success('Sub-category added');
        setNewSubCategory('');
        fetchData();
      } else {
        toast.error('Failed to add sub-category');
      }
    } catch (error) {
      console.error('Error adding sub-category:', error);
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    toast.info('Delete functionality coming soon');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/admin/shop" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Shop
      </Link>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900">Manage Sub-Categories</h1>
        <p className="text-slate-500 mt-1">Add sub-categories to your product categories</p>

        <form onSubmit={handleAdd} className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
            required
          >
            <option value="">Select Main Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <input
            type="text"
            value={newSubCategory}
            onChange={(e) => setNewSubCategory(e.target.value)}
            placeholder="Sub-category name..."
            className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Sub-Category
          </button>
        </form>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-500">Loading...</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {categories.map(cat => {
              const catSubs = subCategories.filter(sub => sub.categoryId === cat.id);
              if (catSubs.length === 0) return null;
              return (
                <div key={cat.id} className="p-8">
                  <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    {cat.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {catSubs.map(sub => (
                      <div key={sub.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-all">
                        <span className="font-semibold text-slate-900">{sub.name}</span>
                        <button
                          onClick={() => handleDelete(sub.id)}
                          className="p-1.5 text-slate-300 hover:text-red-600 hover:bg-white rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {subCategories.length === 0 && (
              <div className="p-20 text-center text-slate-400">
                <p>No sub-categories found. Add your first one above!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
