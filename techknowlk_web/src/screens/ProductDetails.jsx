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
  MessageSquare,
  Check,
  Zap,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import OrderModal from '../components/OrderModal';
import { useCart } from '../lib/CartContext';
import { toast } from 'react-toastify';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();

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

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, 1);
    setAddedToCart(true);
    toast.success(`"${product.name}" added to cart!`, { autoClose: 2000 });
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleInquiry = () => {
    const msg = `Hello TechKnowLK,\n\nI'm interested in bulk ordering:\n📦 Product: ${product?.name}\n\nPlease provide pricing and availability details.`;
    window.open(`https://wa.me/94771336735?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f8fafc' }}>
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center animate-spin"
            style={{ background: 'linear-gradient(135deg, #33A1E0, #012A43)', boxShadow: '0 4px 20px rgba(51,161,224,0.4)' }}
          >
            <Package className="w-6 h-6 text-white" />
          </div>
          <p className="text-[#4a6a7c] font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <Package className="w-20 h-20 text-slate-200" />
        <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
        <Link to="/products" className="mt-2 text-[#33A1E0] font-bold flex items-center gap-2 hover:gap-3 transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  const images = product.images || [];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #f0f6fb 0%, #f8fafc 100%)' }}>
      <SEOHead 
        title={`${product.name} | TechKnowLK`}
        description={product.description}
        url={`https://techknowlk.com/products/${product.id}`}
      />

      <div className="pt-32 pb-20 container mx-auto px-6 max-w-6xl">
        {/* Breadcrumbs / Back */}
        <Link to="/products" className="inline-flex items-center gap-2 text-[#4a6a7c] hover:text-[#33A1E0] transition-colors mb-10 group font-medium">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* ── Gallery Section ── */}
          <div className="space-y-4">
            {/* Main image */}
            <div
              className="relative aspect-square rounded-3xl overflow-hidden group"
              style={{ background: 'linear-gradient(135deg, #e8f3fa, #f0f6fb)', boxShadow: '0 8px 40px rgba(1,42,67,0.12)' }}
            >
              {images.length > 0 ? (
                <img 
                  src={images[activeImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[#a8c8da]">
                  <Package className="w-24 h-24" />
                  <p className="text-sm font-medium">No image available</p>
                </div>
              )}
              
              {/* Image nav arrows */}
              {images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => setActiveImage(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="p-3 rounded-2xl font-bold transition-all hover:scale-110 active:scale-95"
                    style={{ background: 'rgba(1,42,67,0.75)', backdropFilter: 'blur(8px)', color: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setActiveImage(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="p-3 rounded-2xl font-bold transition-all hover:scale-110 active:scale-95"
                    style={{ background: 'rgba(1,42,67,0.75)', backdropFilter: 'blur(8px)', color: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Image counter badge */}
              {images.length > 1 && (
                <div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: 'rgba(1,42,67,0.7)', backdropFilter: 'blur(8px)' }}
                >
                  {activeImage + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-300"
                    style={{
                      border: activeImage === idx ? '2px solid #33A1E0' : '2px solid transparent',
                      opacity: activeImage === idx ? 1 : 0.55,
                      boxShadow: activeImage === idx ? '0 4px 16px rgba(51,161,224,0.3)' : 'none',
                      transform: activeImage === idx ? 'scale(0.95)' : 'scale(1)',
                    }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Details Section ── */}
          <div className="flex flex-col">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1"
                style={{ background: 'rgba(51,161,224,0.12)', color: '#33A1E0', border: '1px solid rgba(51,161,224,0.25)' }}
              >
                <Layers className="w-3 h-3" /> {product.category?.name}
              </span>
              {product.subCategory && (
                <span
                  className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1"
                  style={{ background: 'rgba(1,42,67,0.07)', color: '#4a6a7c', border: '1px solid rgba(1,42,67,0.1)' }}
                >
                  <Tag className="w-3 h-3" /> {product.subCategory.name}
                </span>
              )}
              <span
                className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full"
                style={{ background: '#012A43', color: 'white', boxShadow: '0 2px 8px rgba(1,42,67,0.25)' }}
              >
                {product.brand?.name}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4" style={{ color: '#012A43' }}>
              {product.name}
            </h1>

            {product.price > 0 && (
              <div className="flex items-baseline gap-2 mb-6">
                <span
                  className="text-4xl font-black"
                  style={{ background: 'linear-gradient(135deg, #33A1E0, #1e7ab8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  {product.price.toLocaleString()}
                </span>
                <span className="text-base font-bold text-[#4a6a7c] uppercase">LKR</span>
              </div>
            )}

            {/* Description */}
            <div
              className="p-5 rounded-2xl mb-6"
              style={{ background: 'rgba(1,42,67,0.04)', border: '1px solid rgba(1,42,67,0.07)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-[#33A1E0]" />
                <span className="text-xs font-black text-[#012A43] uppercase tracking-widest">Description</span>
              </div>
              <p className="text-[#4a6a7c] text-base leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            {/* Specs quick view */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div
                className="p-4 rounded-2xl flex items-center gap-3"
                style={{ background: 'white', border: '1px solid rgba(1,42,67,0.07)', boxShadow: '0 2px 12px rgba(1,42,67,0.06)' }}
              >
                <div className="p-2 rounded-xl" style={{ background: 'rgba(34,197,94,0.1)' }}>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#a8c8da] uppercase">Availability</div>
                  <div className="text-sm font-bold text-[#012A43]">In Stock</div>
                </div>
              </div>
              <div
                className="p-4 rounded-2xl flex items-center gap-3"
                style={{ background: 'white', border: '1px solid rgba(1,42,67,0.07)', boxShadow: '0 2px 12px rgba(1,42,67,0.06)' }}
              >
                <div className="p-2 rounded-xl" style={{ background: 'rgba(51,161,224,0.1)' }}>
                  <Package className="w-5 h-5 text-[#33A1E0]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#a8c8da] uppercase">Shipping</div>
                  <div className="text-sm font-bold text-[#012A43]">Island-wide</div>
                </div>
              </div>
            </div>

            {/* ── Action Buttons ── */}
            <div className="mt-auto space-y-3">

              {/* Row 1: Order Now + Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Order Now */}
                <button
                  onClick={() => setIsOrderOpen(true)}
                  className="flex-1 h-14 rounded-2xl font-bold text-white flex items-center justify-center gap-2.5 transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #012A43, #154D71)',
                    boxShadow: '0 4px 24px rgba(1,42,67,0.35)',
                  }}
                >
                  <Zap className="w-5 h-5 text-[#33A1E0]" />
                  Order Now
                </button>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-14 rounded-2xl font-bold flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                  style={{
                    background: addedToCart
                      ? 'linear-gradient(135deg, #16a34a, #15803d)'
                      : 'linear-gradient(135deg, #33A1E0, #1e7ab8)',
                    color: 'white',
                    boxShadow: addedToCart
                      ? '0 4px 24px rgba(22,163,74,0.4)'
                      : '0 4px 24px rgba(51,161,224,0.4)',
                  }}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>

              {/* View Cart shortcut (shown after adding) */}
              {addedToCart && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all animate-pulse"
                  style={{ background: 'rgba(51,161,224,0.08)', color: '#33A1E0', border: '1px solid rgba(51,161,224,0.2)' }}
                >
                  View Cart →
                </button>
              )}

              {/* Technical Docs */}
              {product.documentation && (
                <a 
                  href={product.documentation} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-95"
                  style={{ background: 'white', color: '#012A43', border: '1px solid rgba(1,42,67,0.12)', boxShadow: '0 2px 12px rgba(1,42,67,0.08)' }}
                >
                  <Download className="w-5 h-5 text-[#33A1E0]" />
                  Technical Documentation
                </a>
              )}

              {/* Bulk Inquiry */}
              <button
                onClick={handleInquiry}
                className="w-full py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-95"
                style={{
                  background: 'rgba(51,161,224,0.08)',
                  color: '#33A1E0',
                  border: '1px solid rgba(51,161,224,0.2)',
                }}
              >
                <MessageSquare className="w-5 h-5" />
                Inquiry for Bulk Orders
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        product={product}
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
      />
    </div>
  );
}
