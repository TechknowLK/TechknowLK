import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus, Package, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../lib/CartContext';
import { useNavigate } from 'react-router-dom';
import CartOrderModal from './CartOrderModal';

export default function CartDrawer() {
  const { cartItems, cartCount, cartTotal, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  const handleOrderAll = () => {
    // Build WhatsApp message with all cart items
    const lines = cartItems.map(item =>
      `• ${item.name} (Qty: ${item.quantity})${item.price > 0 ? ` — LKR ${(item.price * item.quantity).toLocaleString()}` : ''}`
    );
    const total = cartTotal > 0 ? `\n\nTotal: LKR ${cartTotal.toLocaleString()}` : '';
    const msg = `Hello TechKnowLK,\n\nI'd like to order the following items:\n${lines.join('\n')}${total}\n\nPlease confirm availability and delivery details.`;
    const url = `https://wa.me/94771336735?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[998] transition-all duration-400 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(1,42,67,0.55)', backdropFilter: isCartOpen ? 'blur(4px)' : 'none' }}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        data-lenis-prevent
        className={`fixed top-0 right-0 h-full z-[999] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]`}
        style={{
          width: 'min(440px, 100vw)',
          transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
          background: 'linear-gradient(180deg, #0a2d45 0%, #071e2e 100%)',
          boxShadow: '-8px 0 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(51,161,224,0.15)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #33A1E0, #1e7ab8)' }}
            >
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-none">Your Cart</h2>
              <p className="text-[#33A1E0] text-xs font-medium mt-0.5">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center"
                style={{ background: 'rgba(51,161,224,0.08)', border: '1px solid rgba(51,161,224,0.15)' }}
              >
                <ShoppingBag className="w-10 h-10 text-[#33A1E0] opacity-50" />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold text-lg">Your cart is empty</p>
                <p className="text-gray-500 text-sm mt-1">Browse products and add items</p>
              </div>
              <button
                onClick={() => { setIsCartOpen(false); navigate('/products'); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
                style={{ background: 'rgba(51,161,224,0.15)', color: '#33A1E0', border: '1px solid rgba(51,161,224,0.25)' }}
              >
                Browse Products <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div
                key={item.id}
                className="flex gap-3 p-3 rounded-2xl transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* Image */}
                <div
                  className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0"
                  style={{ background: 'rgba(51,161,224,0.08)' }}
                >
                  {item.images?.[0] ? (
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-8 h-8 text-[#33A1E0] opacity-40" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm leading-tight line-clamp-2">{item.name}</p>
                  {item.price > 0 && (
                    <p className="text-[#33A1E0] font-bold text-sm mt-1">
                      LKR {(item.price * item.quantity).toLocaleString()}
                    </p>
                  )}

                  {/* Qty controls */}
                  <div className="flex items-center justify-between mt-2">
                    <div
                      className="flex items-center rounded-lg overflow-hidden"
                      style={{ border: '1px solid rgba(51,161,224,0.2)' }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-white text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div
            className="flex-shrink-0 px-5 py-5 space-y-4"
            style={{ borderTop: '1px solid rgba(51,161,224,0.15)' }}
          >
            {/* Total */}
            {cartTotal > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-medium">Total</span>
                <span className="text-white font-black text-xl">LKR {cartTotal.toLocaleString()}</span>
              </div>
            )}

            {/* Proceed to Order */}
            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="w-full h-13 py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #33A1E0, #1e7ab8)', boxShadow: '0 4px 20px rgba(51,161,224,0.3)' }}
            >
              <ShoppingCart className="w-5 h-5" />
              Proceed to Order
            </button>

            {/* Clear cart */}
            <button
              onClick={clearCart}
              className="w-full py-2 text-sm text-gray-500 hover:text-red-400 transition-colors font-medium"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>

      <CartOrderModal
        cartItems={cartItems}
        cartTotal={cartTotal}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onClearCart={clearCart}
      />
    </>
  );
}
