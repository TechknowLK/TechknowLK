import React, { useState, useEffect } from 'react';
import { X, Phone, User, MapPin, Package, Minus, Plus, CheckCircle2, AlertCircle, Mail, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../lib/AuthContext';

export default function OrderModal({ product, isOpen, onClose }) {
  const { customer, token } = useAuth();
  const [tab, setTab] = useState('whatsapp'); // 'whatsapp' | 'email'
  const [quantity, setQuantity] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', note: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setForm({
        name: customer ? customer.name : '',
        email: customer ? customer.email : '',
        phone: customer ? customer.phone || '' : '',
        address: customer 
          ? `${customer.address || ''}${customer.province ? ', ' + customer.province : ''}${customer.postalCode ? ' - ' + customer.postalCode : ''}` 
          : '',
        note: ''
      });
      setErrors({});
      setSubmitted(false);
      setSending(false);
      setTab('whatsapp');
    }
  }, [isOpen, customer]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const total = product.price > 0 ? product.price * quantity : null;

  // ── Validation ──
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[0-9+\s\-]{7,15}$/.test(form.phone.trim())) errs.phone = 'Enter a valid phone number';
    if (!form.address.trim()) errs.address = 'Delivery address is required';
    if (tab === 'email' && form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Enter a valid email address';
    return errs;
  };

  // ── WhatsApp Submit ──
  const handleWhatsApp = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSending(true);

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      await fetch('/api/save-order', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          orderType: 'SINGLE',
          orderMethod: 'WHATSAPP',
          customerName: form.name,
          customerPhone: form.phone,
          customerEmail: form.email || null,
          customerAddress: form.address,
          customerNote: form.note || null,
          items: [
            {
              id: product.id,
              name: product.name,
              quantity,
              price: product.price,
              brand: product.brand?.name || null
            }
          ],
          total: total ? total.toString() : null,
        })
      });
    } catch (err) {
      console.error('Failed to persist order to database:', err);
    }

    const totalLine = total ? `\n💰 Total: LKR ${total.toLocaleString()}` : '';
    const msg =
      `Hello TechKnowLK! I'd like to place an order:\n\n` +
      `📦 Product: ${product.name} (ID: ${product.id})\n` +
      `🔢 Quantity: ${quantity}${totalLine}\n\n` +
      `👤 Name: ${form.name}\n` +
      `📞 Phone: ${form.phone}\n` +
      `📍 Address: ${form.address}` +
      (form.note ? `\n📝 Note: ${form.note}` : '');

    window.open(`https://wa.me/94771336735?text=${encodeURIComponent(msg)}`, '_blank');
    setSending(false);
    setSubmitted(true);
  };

  // ── Email Submit ──
  const handleEmail = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSending(true);

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch('/api/send-order-email', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: form.name,
          email: form.email || null,
          phone: form.phone,
          address: form.address,
          note: form.note || null,
          productName: product.name,
          productId: product.id,
          productBrand: product.brand?.name || null,
          quantity,
          total: total ? total.toLocaleString() : null,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || 'Failed to send order. Please try again.');
        setSending(false);
        return;
      }

      setSending(false);
      setSubmitted(true);
    } catch {
      toast.error('Network error. Please try again.');
      setSending(false);
    }
  };

  // ── Styles ──
  const inputBase = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'white',
  };
  const inputErr = {
    background: 'rgba(239,68,68,0.05)',
    border: '1px solid rgba(239,68,68,0.4)',
    color: 'white',
  };
  const onFocus = (e) => {
    e.target.style.border = '1px solid rgba(51,161,224,0.6)';
    e.target.style.background = 'rgba(51,161,224,0.05)';
  };
  const onBlur = (e, hasErr) => {
    e.target.style.border = hasErr ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(255,255,255,0.1)';
    e.target.style.background = hasErr ? 'rgba(239,68,68,0.05)' : 'rgba(255,255,255,0.05)';
  };

  const isEmail = tab === 'email';
  const handleSubmit = isEmail ? handleEmail : handleWhatsApp;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[1000] transition-all duration-300"
        style={{ background: 'rgba(1,20,35,0.80)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-[1001] flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          data-lenis-prevent
          className="relative w-full max-w-lg rounded-3xl flex flex-col"
          style={{
            background: 'linear-gradient(160deg, #0d3550 0%, #071e2e 100%)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(51,161,224,0.18)',
            maxHeight: '92vh',
            overflowY: 'auto',
          }}
        >
          {/* Top glow line */}
          <div
            className="absolute top-0 left-16 right-16 h-px rounded-full pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, #33A1E0, transparent)', boxShadow: '0 0 12px rgba(51,161,224,0.5)' }}
          />
          {/* BG blob */}
          <div
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(51,161,224,0.1) 0%, transparent 70%)' }}
          />

          {/* ── Header ── */}
          <div
            className="flex items-center justify-between px-6 pt-6 pb-5 flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(51,161,224,0.12)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #33A1E0, #1e7ab8)', boxShadow: '0 4px 20px rgba(51,161,224,0.35)' }}
              >
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg leading-tight">Place Order</h2>
                <p className="text-xs font-medium mt-0.5 line-clamp-1" style={{ color: '#33A1E0' }}>{product.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            /* ── Success ── */
            <div className="flex flex-col items-center justify-center py-14 px-6 gap-5">
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(37,211,102,0.15), rgba(18,140,126,0.1))',
                  border: '1px solid rgba(37,211,102,0.3)',
                  boxShadow: '0 8px 32px rgba(37,211,102,0.15)',
                }}
              >
                <CheckCircle2 className="w-12 h-12 text-green-400" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-white font-bold text-2xl">
                  {isEmail ? 'Order Email Sent! 📧' : 'Order Sent! 🎉'}
                </h3>
                <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                  {isEmail
                    ? 'Your order email has been sent to our team. We will contact you shortly to confirm.'
                    : 'Your order has been sent to our WhatsApp. Our team will contact you shortly to confirm.'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-10 py-3 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #33A1E0, #1e7ab8)', boxShadow: '0 4px 16px rgba(51,161,224,0.3)' }}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-6">

              {/* ── Tab Switch ── */}
              <div
                className="flex rounded-xl p-1 gap-1"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <button
                  type="button"
                  onClick={() => { setTab('whatsapp'); setErrors({}); }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300"
                  style={{
                    background: tab === 'whatsapp' ? 'linear-gradient(135deg, #25D366, #128C7E)' : 'transparent',
                    color: tab === 'whatsapp' ? 'white' : '#6b8fa3',
                    boxShadow: tab === 'whatsapp' ? '0 2px 12px rgba(37,211,102,0.3)' : 'none',
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </button>

                <button
                  type="button"
                  onClick={() => { setTab('email'); setErrors({}); }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300"
                  style={{
                    background: tab === 'email' ? 'linear-gradient(135deg, #33A1E0, #1e7ab8)' : 'transparent',
                    color: tab === 'email' ? 'white' : '#6b8fa3',
                    boxShadow: tab === 'email' ? '0 2px 12px rgba(51,161,224,0.3)' : 'none',
                  }}
                >
                  <Mail className="w-4 h-4" />
                  Email
                </button>
              </div>

              {/* Tab hint */}
              <p className="text-xs text-gray-500 text-center -mt-2">
                {tab === 'whatsapp'
                  ? 'Order will be sent via WhatsApp message'
                  : 'Order will be sent directly to techknowlkinfo@gmail.com'}
              </p>

              {/* ── Product Summary ── */}
              <div
                className="flex items-center gap-4 p-4 rounded-2xl"
                style={{ background: 'rgba(51,161,224,0.06)', border: '1px solid rgba(51,161,224,0.14)' }}
              >
                <div
                  className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
                  style={{ background: 'rgba(51,161,224,0.1)' }}
                >
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-7 h-7 text-[#33A1E0] opacity-40" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm leading-tight line-clamp-2">{product.name}</p>
                  {product.brand?.name && <p className="text-gray-400 text-xs mt-0.5">{product.brand.name}</p>}
                  {product.price > 0 && (
                    <p className="font-bold text-sm mt-1.5" style={{ color: '#33A1E0' }}>
                      LKR {product.price.toLocaleString()} <span className="text-gray-500 font-normal text-xs">/ unit</span>
                    </p>
                  )}
                </div>
              </div>

              {/* ── Quantity ── */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2.5">Quantity</label>
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center rounded-xl overflow-hidden"
                    style={{ border: '1px solid rgba(51,161,224,0.25)', background: 'rgba(255,255,255,0.03)' }}
                  >
                    <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-14 text-center text-white font-bold text-xl select-none">{quantity}</span>
                    <button type="button" onClick={() => setQuantity(q => q + 1)}
                      className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {total && (
                    <div
                      className="flex-1 p-3 rounded-xl text-center"
                      style={{ background: 'rgba(51,161,224,0.06)', border: '1px solid rgba(51,161,224,0.12)' }}
                    >
                      <p className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold">Total</p>
                      <p className="text-white font-black text-2xl mt-0.5">LKR {total.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Divider ── */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

              {/* ── Form Fields ── */}
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Your Details</p>

                {/* Name */}
                <div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Your full name *"
                      value={form.name}
                      onChange={e => { setForm(f => ({ ...f, name: e.target.value })); if (errors.name) setErrors(er => ({ ...er, name: '' })); }}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm placeholder:text-gray-600 outline-none transition-all"
                      style={errors.name ? inputErr : inputBase}
                      onFocus={onFocus}
                      onBlur={e => onBlur(e, !!errors.name)}
                    />
                  </div>
                  {errors.name && <p className="flex items-center gap-1 text-red-400 text-xs mt-1.5"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                </div>

                {/* Email (shown for email tab) */}
                {isEmail && (
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                      <input
                        type="email"
                        placeholder="Your email address (optional)"
                        value={form.email}
                        onChange={e => { setForm(f => ({ ...f, email: e.target.value })); if (errors.email) setErrors(er => ({ ...er, email: '' })); }}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm placeholder:text-gray-600 outline-none transition-all"
                        style={errors.email ? inputErr : inputBase}
                        onFocus={onFocus}
                        onBlur={e => onBlur(e, !!errors.email)}
                      />
                    </div>
                    {errors.email && <p className="flex items-center gap-1 text-red-400 text-xs mt-1.5"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                  </div>
                )}

                {/* Phone */}
                <div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    <input
                      type="tel"
                      placeholder="Phone number (077xxxxxxx) *"
                      value={form.phone}
                      onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); if (errors.phone) setErrors(er => ({ ...er, phone: '' })); }}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm placeholder:text-gray-600 outline-none transition-all"
                      style={errors.phone ? inputErr : inputBase}
                      onFocus={onFocus}
                      onBlur={e => onBlur(e, !!errors.phone)}
                    />
                  </div>
                  {errors.phone && <p className="flex items-center gap-1 text-red-400 text-xs mt-1.5"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                </div>

                {/* Address */}
                <div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-500 pointer-events-none" />
                    <textarea
                      rows={2}
                      placeholder="Delivery address *"
                      value={form.address}
                      onChange={e => { setForm(f => ({ ...f, address: e.target.value })); if (errors.address) setErrors(er => ({ ...er, address: '' })); }}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm placeholder:text-gray-600 outline-none transition-all resize-none"
                      style={errors.address ? inputErr : inputBase}
                      onFocus={onFocus}
                      onBlur={e => onBlur(e, !!errors.address)}
                    />
                  </div>
                  {errors.address && <p className="flex items-center gap-1 text-red-400 text-xs mt-1.5"><AlertCircle className="w-3 h-3" /> {errors.address}</p>}
                </div>

                {/* Note */}
                <textarea
                  rows={2}
                  placeholder="Additional notes (optional)"
                  value={form.note}
                  onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-xl text-sm placeholder:text-gray-600 outline-none transition-all resize-none"
                  style={inputBase}
                  onFocus={onFocus}
                  onBlur={e => onBlur(e, false)}
                />
              </div>

              {/* ── Submit Button ── */}
              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] disabled:opacity-70"
                style={{
                  background: sending
                    ? (isEmail ? 'linear-gradient(135deg, #1a6fa0, #0f5580)' : 'linear-gradient(135deg, #1a9e50, #0d7a3e)')
                    : (isEmail ? 'linear-gradient(135deg, #33A1E0, #1e7ab8)' : 'linear-gradient(135deg, #25D366, #128C7E)'),
                  boxShadow: isEmail
                    ? '0 4px 28px rgba(51,161,224,0.35)'
                    : '0 4px 28px rgba(37,211,102,0.35)',
                }}
              >
                {sending ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {isEmail ? 'Sending Email...' : 'Opening WhatsApp...'}
                  </>
                ) : isEmail ? (
                  <>
                    <Mail className="w-5 h-5" />
                    Send Order via Email
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send Order via WhatsApp
                  </>
                )}
              </button>

              <p className="text-center text-gray-600 text-xs -mt-1">
                {isEmail
                  ? 'Your order will be emailed directly to our team'
                  : 'Your order details will be sent directly to our team'}
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
