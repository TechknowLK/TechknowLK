'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Info, LayoutList, Image as ImageIcon, Tag, Layers, FileText } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ProductForm({ product = null }) {
  const router = useRouter();
  const isEditing = !!product;

  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    categoryId: product?.categoryId || '',
    subCategoryId: product?.subCategoryId || '',
    brandId: product?.brandId || '',
    images: product?.images ? product.images.join('\n') : '',
    documentation: product?.documentation || ''
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    if (formData.categoryId) {
      const filtered = subCategories.filter(sub => sub.categoryId === parseInt(formData.categoryId));
      setFilteredSubCategories(filtered);
      // Only reset subCategoryId if the currently selected one is not in the filtered list
      if (formData.subCategoryId && !filtered.find(sub => sub.id === parseInt(formData.subCategoryId))) {
        setFormData(prev => ({ ...prev, subCategoryId: '' }));
      }
    } else {
      setFilteredSubCategories([]);
    }
  }, [formData.categoryId, subCategories]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/shop/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await fetch('/api/shop/sub-categories');
      const data = await res.json();
      setSubCategories(data);
    } catch (err) {
      console.error('Error fetching sub-categories:', err);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await fetch('/api/shop/brands');
      const data = await res.json();
      setBrands(data);
    } catch (err) {
      console.error('Error fetching brands:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = async (e, type) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (type === 'images') setUploadingImages(true);
    else setUploadingDoc(true);
    
    setError('');

    const uploadFormData = new FormData();
    for (let i = 0; i < files.length; i++) {
       uploadFormData.append('files', files[i]);
    }

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      });

      if (res.ok) {
        const data = await res.json();
        if (type === 'images') {
          const currentImages = formData.images.trim();
          const urlsText = data.urls.join('\n');
          setFormData(prev => ({
            ...prev,
            images: currentImages ? `${currentImages}\n${urlsText}` : urlsText
          }));
          toast.success('Images uploaded');
        } else {
          setFormData(prev => ({
            ...prev,
            documentation: data.urls[0]
          }));
          toast.success('Documentation uploaded');
        }
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to upload files');
      }
    } catch (err) {
      setError('An error occurred during file upload.');
    } finally {
      if (type === 'images') setUploadingImages(false);
      else setUploadingDoc(false);
      e.target.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      ...formData,
      images: formData.images.split('\n').map(s => s.trim()).filter(Boolean),
      categoryId: parseInt(formData.categoryId),
      brandId: parseInt(formData.brandId),
      price: parseFloat(formData.price)
    };

    try {
      const url = isEditing ? `/api/shop/products/${product.id}` : '/api/shop/products';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success(isEditing ? 'Product updated' : 'Product created');
        router.push('/admin/shop');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {isEditing ? 'Edit Product' : 'Register New Product'}
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Add electronic or electrical items to your shop.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              type="button" 
              onClick={() => router.back()} 
              className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button 
              type="submit" 
              form="product-form"
              disabled={loading} 
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-md shadow-blue-600/20"
            >
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
            <Info className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form id="product-form" onSubmit={handleSubmit} className="p-8 space-y-8">
          <section className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Info className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-slate-900">Product Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Product Name</label>
                <input 
                  required 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900" 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Price (LKR)</label>
                <input 
                  required 
                  type="number" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange} 
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-400" /> Category
                </label>
                <select 
                  required 
                  name="categoryId" 
                  value={formData.categoryId} 
                  onChange={handleChange} 
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900" 
                >
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-400" /> Sub-Category
                </label>
                <select 
                  name="subCategoryId" 
                  value={formData.subCategoryId} 
                  onChange={handleChange} 
                  disabled={!formData.categoryId}
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 disabled:opacity-50" 
                >
                  <option value="">Select Sub-Category</option>
                  {filteredSubCategories.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-slate-400" /> Brand
                </label>
                <select 
                  required 
                  name="brandId" 
                  value={formData.brandId} 
                  onChange={handleChange} 
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900" 
                >
                  <option value="">Select Brand</option>
                  {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Description</label>
              <textarea 
                required 
                name="description" 
                rows={4} 
                value={formData.description} 
                onChange={handleChange} 
                className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 resize-y" 
              />
            </div>
          </section>

          <section className="space-y-6 pt-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <ImageIcon className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-slate-900">Media & Documents</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <div className="flex justify-between items-end">
                  <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-slate-400" /> Images
                  </label>
                  <label className="cursor-pointer inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                    {uploadingImages ? 'Uploading...' : 'Upload Images'}
                    <input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload(e, 'images')} disabled={uploadingImages} className="hidden" />
                  </label>
                </div>
                <textarea 
                  name="images" 
                  rows={4} 
                  value={formData.images} 
                  onChange={handleChange} 
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 text-sm whitespace-pre" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" /> Documentation
                  </label>
                   <label className="cursor-pointer inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                    {uploadingDoc ? 'Uploading...' : 'Upload PDF'}
                    <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e, 'doc')} disabled={uploadingDoc} className="hidden" />
                  </label>
                </div>
                <input 
                  type="text" 
                  name="documentation" 
                  value={formData.documentation} 
                  onChange={handleChange} 
                  placeholder="Link to manual or datasheet"
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900" 
                />
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
