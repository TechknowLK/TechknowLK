'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, ChevronDown, ChevronUp, Search, Calendar, Phone, MapPin, Mail, MessageSquare, Check, X, Clock, HelpCircle } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'PENDING' | 'COMPLETED' | 'CANCELLED'
  const [methodFilter, setMethodFilter] = useState('ALL'); // 'ALL' | 'WHATSAPP' | 'EMAIL'

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (!res.ok) throw new Error('Failed to load orders');
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        toast.success(`Order status updated to ${newStatus}`);
        // Update local state
        setOrders(prev =>
          prev.map(ord => (ord.id === id ? { ...ord, status: newStatus } : ord))
        );
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('An error occurred');
    }
  };

  const toggleExpand = (id) => {
    setExpandedOrder(prev => (prev === id ? null : id));
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm) ||
      (order.customerEmail && order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
      order.id.toString().includes(searchTerm);

    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
    const matchesMethod = methodFilter === 'ALL' || order.orderMethod === methodFilter;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusSelectClass = (status) => {
    const base = "border rounded-xl px-3 py-2 text-xs font-bold outline-none transition-all cursor-pointer shadow-sm whitespace-nowrap";
    switch (status) {
      case 'DELIVERED':
        return `${base} bg-green-50 text-green-700 border-green-200 hover:bg-green-100/70 focus:ring-2 focus:ring-green-500/20`;
      case 'PREPARING':
        return `${base} bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100/70 focus:ring-2 focus:ring-blue-500/20`;
      case 'CANCELLED':
        return `${base} bg-red-50 text-red-700 border-red-200 hover:bg-red-100/70 focus:ring-2 focus:ring-red-500/20`;
      default:
        return `${base} bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100/70 focus:ring-2 focus:ring-amber-500/20`;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DELIVERED':
        return (
          <span className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200 uppercase tracking-wider whitespace-nowrap">
            <Check className="w-3.5 h-3.5" />
            Delivered
          </span>
        );
      case 'PREPARING':
        return (
          <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200 uppercase tracking-wider whitespace-nowrap">
            <ShoppingBag className="w-3.5 h-3.5" />
            Stock Checked & Preparing
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="flex items-center gap-1 bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-200 uppercase tracking-wider whitespace-nowrap">
            <X className="w-3.5 h-3.5" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-200 uppercase tracking-wider whitespace-nowrap">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
    }
  };

  const getMethodBadge = (method) => {
    if (method === 'WHATSAPP') {
      return (
        <span className="flex items-center gap-1.5 bg-green-100/70 text-green-800 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          WhatsApp
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 bg-blue-100/70 text-blue-800 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap">
        <Mail className="w-3.5 h-3.5 text-blue-500" />
        Email
      </span>
    );
  };

  const getTypeBadge = (type) => {
    if (type === 'CART') {
      return (
        <span className="bg-purple-100 text-purple-800 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide whitespace-nowrap">
          🛒 Cart
        </span>
      );
    }
    return (
      <span className="bg-cyan-100 text-cyan-800 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide whitespace-nowrap">
        📦 Single
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Title block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
            Customer Orders
          </h1>
          <p className="text-slate-500 mt-1">Monitor, manage, and dispatch website product orders</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search customer, phone..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors duration-200"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {/* Status filter */}
          <div className="flex bg-slate-100 p-1 rounded-2xl gap-1">
            {['ALL', 'PENDING', 'PREPARING', 'DELIVERED', 'CANCELLED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                  statusFilter === st ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {st === 'PREPARING' ? 'PREPARING' : st}
              </button>
            ))}
          </div>

          {/* Method filter */}
          <div className="flex bg-slate-100 p-1 rounded-2xl gap-1">
            {['ALL', 'WHATSAPP', 'EMAIL'].map((m) => (
              <button
                key={m}
                onClick={() => setMethodFilter(m)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                  methodFilter === m ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {m === 'ALL' ? 'ALL METHODS' : m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table/List */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center text-slate-500">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-20 text-center text-slate-500 flex flex-col items-center gap-4">
            <ShoppingBag className="w-12 h-12 text-slate-300 animate-bounce" />
            <p className="text-slate-600 font-semibold text-lg">No orders found</p>
            <p className="text-slate-400 text-sm -mt-3">Orders placed by customers will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="w-10"></th>
                  <th className="px-6 py-5 font-semibold text-slate-900 text-sm whitespace-nowrap">Order ID</th>
                  <th className="px-6 py-5 font-semibold text-slate-900 text-sm whitespace-nowrap">Customer</th>
                  <th className="px-6 py-5 font-semibold text-slate-900 text-sm whitespace-nowrap">Type / Method</th>
                  <th className="px-6 py-5 font-semibold text-slate-900 text-sm whitespace-nowrap">Date</th>
                  <th className="px-6 py-5 font-semibold text-slate-900 text-sm whitespace-nowrap">Total</th>
                  <th className="px-6 py-5 font-semibold text-slate-900 text-sm text-right whitespace-nowrap">Status / Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredOrders.map((order) => {
                  const isExpanded = expandedOrder === order.id;
                  const formattedDate = new Date(order.createdAt).toLocaleString('en-LK', { 
                    timeZone: 'Asia/Colombo',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true 
                  });

                  // Safe items parse
                  let itemsList = [];
                  try {
                    itemsList = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
                  } catch {
                    itemsList = order.items || [];
                  }

                  return (
                    <React.Fragment key={order.id}>
                      <tr 
                        className={`hover:bg-slate-50/50 cursor-pointer transition-colors duration-200 ${isExpanded ? 'bg-slate-50/70' : ''}`}
                        onClick={() => toggleExpand(order.id)}
                      >
                        <td className="pl-6 py-5 text-center">
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </td>
                        <td className="px-6 py-5 font-bold text-slate-500 text-xs whitespace-nowrap tracking-wide">
                          #TKLK-{1000 + order.id}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="font-semibold text-slate-900">{order.customerName}</div>
                          <div className="text-xs text-slate-500 font-medium mt-0.5">{order.customerPhone}</div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex gap-2 items-center flex-nowrap">
                            {getTypeBadge(order.orderType)}
                            {getMethodBadge(order.orderMethod)}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-xs font-semibold text-slate-500 whitespace-nowrap">
                          {formattedDate}
                        </td>
                        <td className="px-6 py-5 font-black text-slate-900 whitespace-nowrap">
                          {order.total ? `LKR ${order.total.toLocaleString()}` : 'N/A'}
                        </td>
                        <td className="px-6 py-5 text-right whitespace-nowrap" onClick={e => e.stopPropagation()}>
                          <div className="flex justify-end">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                              className={getStatusSelectClass(order.status)}
                            >
                              <option value="PENDING" className="bg-white text-slate-700 font-semibold">Pending</option>
                              <option value="PREPARING" className="bg-white text-slate-700 font-semibold">Stock Checked & Preparing</option>
                              <option value="DELIVERED" className="bg-white text-slate-700 font-semibold">Delivered</option>
                              <option value="CANCELLED" className="bg-white text-slate-700 font-semibold">Cancelled</option>
                            </select>
                          </div>
                        </td>
                      </tr>

                      {/* Expandable Order Details Card */}
                      {isExpanded && (
                        <tr>
                          <td colSpan="7" className="bg-slate-50/40 px-8 py-6 border-b border-slate-200">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-top-2 duration-300">
                              
                              {/* Customer Box */}
                              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                                <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Customer Details</h4>
                                <div className="space-y-3.5">
                                  <div className="flex gap-3 items-start">
                                    <Clock className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-[10px] uppercase font-bold text-slate-400 leading-none">Order Placed At</p>
                                      <p className="text-xs font-semibold text-slate-800 mt-1">{formattedDate}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-3 items-start">
                                    <Phone className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-[10px] uppercase font-bold text-slate-400 leading-none">Phone Number</p>
                                      <p className="text-xs font-semibold text-slate-800 mt-1">{order.customerPhone}</p>
                                    </div>
                                  </div>
                                  {order.customerEmail && (
                                    <div className="flex gap-3 items-start">
                                      <Mail className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <p className="text-[10px] uppercase font-bold text-slate-400 leading-none">Email Address</p>
                                        <p className="text-xs font-semibold text-slate-800 mt-1">{order.customerEmail}</p>
                                      </div>
                                    </div>
                                  )}
                                  <div className="flex gap-3 items-start">
                                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-[10px] uppercase font-bold text-slate-400 leading-none">Delivery Address</p>
                                      <p className="text-xs font-semibold text-slate-800 leading-relaxed mt-1 whitespace-pre-line">{order.customerAddress}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Note & Meta Box */}
                              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                                <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Order Information</h4>
                                <div className="space-y-4">
                                  <div>
                                    <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none mb-1.5">Order Method</span>
                                    {getMethodBadge(order.orderMethod)}
                                  </div>
                                  <div>
                                    <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none mb-1.5">Checkout Mode</span>
                                    {getTypeBadge(order.orderType)}
                                  </div>
                                  <div>
                                    <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none mb-1">Customer Note</span>
                                    <p className="text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-1 whitespace-pre-line italic">
                                      {order.customerNote ? `"${order.customerNote}"` : 'No custom notes provided.'}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Items Table Box */}
                              <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                                <div>
                                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3">Items Summary</h4>
                                  <div className="space-y-2.5 overflow-y-auto max-h-48 pr-1">
                                    {itemsList.map((item, idx) => (
                                      <div key={idx} className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                        <div className="min-w-0 pr-2">
                                          <p className="text-xs font-bold text-slate-800 truncate">
                                            {item.name} {item.id && <span className="text-slate-400 font-semibold text-[10px] ml-1">(ID: {item.id})</span>}
                                          </p>
                                          <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                                            Qty: {item.quantity} {item.brand ? `• Brand: ${item.brand}` : ''}
                                          </p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                          <p className="text-xs font-black text-slate-900">
                                            {item.price > 0 ? `LKR ${(item.price * item.quantity).toLocaleString()}` : 'N/A'}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-150 flex justify-between items-center">
                                  <span className="text-xs font-extrabold text-slate-400 uppercase">Grand Total</span>
                                  <span className="text-lg font-black text-blue-600">
                                    {order.total ? `LKR ${order.total.toLocaleString()}` : 'N/A'}
                                  </span>
                                </div>
                              </div>

                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
