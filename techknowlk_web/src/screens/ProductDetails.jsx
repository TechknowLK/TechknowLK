import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Download, 
  Package, 
  Tag, 
  Layers, 
  Info,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Footer from '../components/Footer';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    fetch(`/api/shop/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product details:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Package className="w-20 h-20 text-slate-200 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
        <Link to="/products" className="mt-6 text-blue-600 font-bold flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  const images = product.images || [];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title={`${product.name} | TechKnowLK`}
        description={product.description}
        url={`https://techknowlk.com/products/${product.id}`}
      />

      <div className="pt-32 pb-20 container mx-auto px-6">
        {/* Breadcrumbs / Back */}
        <Link to="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gallery Section */}
          <div className="space-y-6">
            <div className="relative aspect-square bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 group">
              {images.length > 0 ? (
                <img 
                  src={images[activeImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-110" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-200">
                  <Package className="w-32 h-32" />
                </div>
              )}
              
              {images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => setActiveImage(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setActiveImage(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === idx ? 'border-blue-600 scale-95 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="mb-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100 flex items-center gap-1">
                  <Layers className="w-3 h-3" /> {product.category?.name}
                </span>
                {product.subCategory && (
                  <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-100 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {product.subCategory.name}
                  </span>
                )}
                <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-slate-900/10">
                  {product.brand?.name}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                {product.name}
              </h1>
              {product.price > 0 && (
                <div className="text-3xl font-black text-blue-600 flex items-baseline gap-2">
                  <span className="text-lg text-slate-400 font-bold uppercase">LKR</span>
                  {product.price.toLocaleString()}
                </div>
              )}
            </div>

            <div className="prose prose-slate max-w-none mb-12">
              <div className="flex items-center gap-2 text-slate-900 font-bold mb-4 uppercase tracking-wider text-sm">
                <Info className="w-4 h-4 text-blue-600" />
                Description
              </div>
              <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            {/* Specifications Quick View */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Availability</div>
                  <div className="text-sm font-bold text-slate-900">In Stock</div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <Package className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Shipping</div>
                  <div className="text-sm font-bold text-slate-900">Worldwide</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-[#012A43] text-white h-16 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 group">
                  <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Order Now
                </button>
                {product.documentation && (
                  <a 
                    href={product.documentation} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 h-16 border-2 border-slate-200 text-slate-700 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-slate-900 transition-all"
                  >
                    <Download className="w-5 h-5" />
                    Technical Docs
                  </a>
                )}
              </div>
              
              <button className="w-full h-16 bg-blue-50 text-blue-600 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white transition-all">
                <MessageSquare className="w-5 h-5" />
                Inquiry for Bulk Orders
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
