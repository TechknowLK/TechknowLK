import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Filter, Package, Eye, ChevronRight, Tag, DollarSign, X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Footer from '../components/Footer';
import { useCart } from '../lib/CartContext';
import { toast } from 'react-toastify';

import video from "/assets/Video/Hero.mp4";

export default function Products() {
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState(new Set());

  const bgStyle = {
    backgroundImage:
      "radial-gradient(ellipse at 50% 35%, rgba(52,167,213,0.25) 0%, rgba(52,167,213,0.12) 18%, rgba(1,42,67,0.70) 60%, rgba(1,42,67,0.95) 100%), linear-gradient(180deg, #012A43 0%, #012A43 100%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

  useEffect(() => {
    Promise.all([
      fetch('/api/shop/products').then(res => res.json()),
      fetch('/api/shop/categories').then(res => res.json()),
      fetch('/api/shop/brands').then(res => res.json())
    ]).then(([productsData, categoriesData, brandsData]) => {
      setProducts(productsData);
      setCategories(categoriesData);
      setBrands(brandsData);

      // Set initial max price based on products
      if (productsData.length > 0) {
        const max = Math.max(...productsData.map(p => p.price));
        setPriceRange(prev => ({ ...prev, max: max || 100000 }));
      }

      setLoading(false);
    }).catch(err => {
      console.error('Error fetching products:', err);
      setLoading(false);
    });
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category?.name === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || product.brand?.name === selectedBrand;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;

    return matchesCategory && matchesBrand && matchesSearch && matchesPrice;
  });

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSearchQuery('');
    const max = Math.max(...products.map(p => p.price));
    setPriceRange({ min: 0, max: max || 100000 });
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // prevent Link navigation
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`"${product.name}" added to cart!`, { autoClose: 2000 });
    setAddedIds(prev => new Set([...prev, product.id]));
    setTimeout(() => {
      setAddedIds(prev => { const next = new Set(prev); next.delete(product.id); return next; });
    }, 2500);
  };

  const vignetteStyle = {
    background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.35) 100%)",
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SEOHead
        title="Electronic & Electrical Products | TechKnowLK"
        description="High-quality electronic components and electrical systems for your engineering needs."
        url="https://techknowlk.com/products"
      />

      {/* Hero Section */}
      <section 
      style={bgStyle}
      className="relative w-full h-[520px] flex items-center justify-center text-center px-6 overflow-hidden ">
        <video
          className="absolute top-0 left-0 w-full h-[1000px] object-cover opacity-40"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={video} type="video/mp4" />
        </video>

        {/* vignette layer (darken edges) */}
        <div style={vignetteStyle} className="absolute inset-0 pointer-events-none" />

        {/* <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full flex items-center justify-center bg-gray-700/60 "> */}

          <div className="relative z-10 max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-sm" data-aos="fade-down" data-aos-duration="1000">
              <span className="text-white">Our </span>
              <span className="text-[#33A1E0]">Products</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-200/90 font-light leading-relaxed max-w-3xl mx-auto" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="500">
              Discover expertly sourced electronic and electrical components specifically designed for your advanced modern engineering projects.
            </p>

            <div className="relative z-10 max-w-4xl"data-aos="fade-down" data-aos-duration="1000" data-aos-delay="400">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#33A1E0] transition-all"
              />
            </div>
          </div>

        {/* </div> */}
      </section>

      {/* Main Content */}
      <section className="max-w-[1400px] mx-auto px-10 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 space-y-8">
            {/* Active Filters Summary */}
            {(selectedCategory !== 'All' || selectedBrand !== 'All' || searchQuery !== '') && (
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Filters</span>
                  <button onClick={resetFilters} className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1">
                    <X className="w-3 h-3" /> Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== 'All' && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold flex items-center gap-1">
                      {selectedCategory} <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('All')} />
                    </span>
                  )}
                  {selectedBrand !== 'All' && (
                    <span className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold flex items-center gap-1">
                      {selectedBrand} <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedBrand('All')} />
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-widest">
                <Filter className="w-4 h-4 text-blue-600" />
                Categories
              </h3>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`text-left px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedCategory === 'All' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  All Products
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`text-left px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat.name ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-widest">
                <Tag className="w-4 h-4 text-blue-600" />
                Popular Brands
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedBrand('All')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${selectedBrand === 'All' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'}`}
                >
                  All
                </button>
                {brands.map(brand => (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand.name)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${selectedBrand === brand.name ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'}`}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-widest">
                <DollarSign className="w-4 h-4 text-blue-600" />
                Price Range
              </h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max={Math.max(...products.map(p => p.price)) || 100000}
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex items-center justify-between text-xs font-black text-slate-900">
                  <span>LKR 0</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md">
                    Up to {priceRange.max.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white rounded-3xl h-[400px] animate-pulse border border-slate-100"></div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
                <Package className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900">No products found</h3>
                <p className="text-slate-500">Try adjusting your search or category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <Link
                    to={`/products/${product.id}`}
                    key={product.id}
                    className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
                  >
                    <div className="relative aspect-square bg-slate-50 overflow-hidden">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <Package className="w-12 h-12" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                          {product.brand?.name}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{product.category?.name}</span>
                          {product.subCategory && (
                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{product.subCategory.name}</span>
                          )}
                        </div>
                        {product.price > 0 && (
                          <span className="text-lg font-black text-slate-900">LKR {product.price.toLocaleString()}</span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors leading-tight">{product.name}</h3>
                      <p className="text-slate-500 text-xs line-clamp-2 mb-3 flex-1">{product.description}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                        <span className="text-sm font-bold text-slate-900 flex items-center gap-1">
                          Details <ChevronRight className="w-3 h-4 text-blue-600" />
                        </span>
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                          style={{
                            background: addedIds.has(product.id) ? 'rgba(22,163,74,0.1)' : 'rgba(51,161,224,0.1)',
                            color: addedIds.has(product.id) ? '#16a34a' : '#33A1E0',
                            border: addedIds.has(product.id) ? '1px solid rgba(22,163,74,0.3)' : '1px solid rgba(51,161,224,0.2)',
                          }}
                        >
                          {addedIds.has(product.id) ? (
                            <><Check className="w-3.5 h-3.5" /> Added!</>
                          ) : (
                            <><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</>
                          )}
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </section>

    </div>
  );
}
