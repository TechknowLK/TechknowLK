'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function BrandManagement() {
  const [brands, setBrands] = useState([]);
  const [newBrand, setNewBrand] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await fetch('/api/shop/brands');
      const data = await res.json();
      setBrands(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast.error('Failed to load brands');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newBrand.trim()) return;

    try {
      const res = await fetch('/api/shop/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newBrand }),
      });
      if (res.ok) {
        toast.success('Brand added');
        setNewBrand('');
        fetchBrands();
      } else {
        toast.error('Failed to add brand');
      }
    } catch (error) {
      console.error('Error adding brand:', error);
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    toast.info('Delete functionality coming soon');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Link href="/admin/shop" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Shop
      </Link>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900">Manage Brands</h1>
        <p className="text-slate-500 mt-1">Add or remove product brands</p>

        <form onSubmit={handleAdd} className="mt-8 flex gap-3">
          <input
            type="text"
            value={newBrand}
            onChange={(e) => setNewBrand(e.target.value)}
            placeholder="New brand name..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-500">Loading...</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {brands.map((brand) => (
              <div key={brand.id} className="px-8 py-5 flex justify-between items-center hover:bg-slate-50 transition-colors">
                <span className="font-semibold text-slate-900">{brand.name}</span>
                <button
                  onClick={() => handleDelete(brand.id)}
                  className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {brands.length === 0 && (
              <div className="p-10 text-center text-slate-400">No brands found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
