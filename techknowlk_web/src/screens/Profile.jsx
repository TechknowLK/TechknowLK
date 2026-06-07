import React, { useState, useEffect } from "react";
import { useAuth } from "../lib/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Phone, MapPin, Map, Hash, Mail, ClipboardList, LogOut, Edit3, Save, ShoppingBag, Clock, CheckCircle, XCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function Profile() {
  const { customer, logout, updateProfile, fetchOrders } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", province: "", postalCode: "" });
  const [saving, setSaving] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!customer) {
      navigate("/login");
    } else {
      setForm({
        name: customer.name || "",
        phone: customer.phone || "",
        address: customer.address || "",
        province: customer.province || "",
        postalCode: customer.postalCode || "",
      });
    }
  }, [customer, navigate]);

  // Load orders
  useEffect(() => {
    if (customer) {
      const getOrders = async () => {
        setLoadingOrders(true);
        const res = await fetchOrders();
        setLoadingOrders(false);
        if (res.success) {
          setOrders(res.orders);
        }
      };
      getOrders();
    }
  }, [customer]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    setSaving(true);
    const res = await updateProfile(form);
    setSaving(false);
    if (res.success) {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } else {
      toast.error(res.error || "Failed to update profile");
    }
  };

  if (!customer) return null;

  const pageStyle = {
    background: "linear-gradient(135deg, #011423 0%, #06263f 50%, #011423 100%)",
    minHeight: "100vh",
  };

  const cardStyle = {
    background: "rgba(13, 53, 80, 0.45)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(51, 161, 224, 0.18)",
    boxShadow: "0 16px 48px rgba(0, 0, 0, 0.5)",
  };

  const inputStyle = {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "white",
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "DELIVERED":
        return (
          <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-green-500/10 border border-green-500/30 text-green-400">
            <CheckCircle className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case "PREPARING":
        return (
          <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <ShoppingBag className="w-3.5 h-3.5" /> Stock Checked & Preparing
          </span>
        );
      case "CANCELLED":
        return (
          <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-red-500/10 border border-red-500/30 text-red-400">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
    }
  };

  return (
    <div style={pageStyle} className="px-4 md:px-[5%] py-28 text-white min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-8 rounded-3xl" style={cardStyle}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#33A1E0] to-[#1e7ab8] flex items-center justify-center font-bold text-2xl tracking-wider shadow-lg">
              {customer.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black">Welcome, {customer.name}!</h1>
              <p className="text-gray-400 text-sm mt-1">Manage your details and track your purchases.</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              toast.info("Logged out successfully");
            }}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-red-500/20 hover:border-red-500/50 hover:bg-red-500/10 text-red-400 font-semibold text-sm transition-all duration-300 active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Profile Card */}
          <div className="space-y-6">
            <div style={cardStyle} className="p-6 md:p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#33A1E0] to-transparent" />
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2.5">
                  <User className="w-5 h-5 text-[#33A1E0]" /> Profile Details
                </h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition"
                    title="Edit Profile"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition focus:border-[#33A1E0]/50"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition focus:border-[#33A1E0]/50"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Delivery Address</label>
                    <textarea
                      rows={3}
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition focus:border-[#33A1E0]/50 resize-none"
                      style={inputStyle}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Province</label>
                      <input
                        type="text"
                        value={form.province}
                        onChange={(e) => setForm({ ...form, province: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition focus:border-[#33A1E0]/50"
                        style={inputStyle}
                        placeholder="Western"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Postal Code</label>
                      <input
                        type="text"
                        value={form.postalCode}
                        onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition focus:border-[#33A1E0]/50"
                        style={inputStyle}
                        placeholder="10115"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 py-3 rounded-xl bg-[#33A1E0] hover:bg-[#1e7ab8] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 disabled:opacity-75"
                    >
                      {saving ? "Saving..." : <><Save className="w-3.5 h-3.5" /> Save</>}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-gray-300 font-bold text-xs transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Name */}
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-400">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Full Name</p>
                      <p className="text-sm font-semibold text-white mt-1">{customer.name}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Email Address</p>
                      <p className="text-sm font-semibold text-white mt-1 break-words">{customer.email}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Phone Number</p>
                      <p className="text-sm font-semibold text-white mt-1">
                        {customer.phone || <span className="text-gray-500 italic">Not set</span>}
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Delivery Address</p>
                      <p className="text-sm font-semibold text-white mt-1 leading-relaxed whitespace-pre-line">
                        {customer.address || <span className="text-gray-500 italic">Not set</span>}
                      </p>
                    </div>
                  </div>

                  {/* Province */}
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-400">
                      <Map className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Province</p>
                      <p className="text-sm font-semibold text-white mt-1">
                        {customer.province || <span className="text-gray-500 italic">Not set</span>}
                      </p>
                    </div>
                  </div>

                  {/* Postal Code */}
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-400">
                      <Hash className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Postal Code</p>
                      <p className="text-sm font-semibold text-white mt-1">
                        {customer.postalCode || <span className="text-gray-500 italic">Not set</span>}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order History Card */}
          <div className="lg:col-span-2 space-y-6">
            <div style={cardStyle} className="p-6 md:p-8 rounded-3xl">
              <h3 className="text-xl font-bold flex items-center gap-2.5 mb-6">
                <ClipboardList className="w-5 h-5 text-[#33A1E0]" /> Order History
              </h3>

              {loadingOrders ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <span className="w-8 h-8 border-3 border-[#33A1E0]/20 border-t-[#33A1E0] rounded-full animate-spin" />
                  <p className="text-xs text-gray-400">Fetching order history...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-20 bg-white/3 border border-dashed border-white/10 rounded-2xl">
                  <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-300">No Orders Placed</h4>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto mt-2 leading-relaxed">
                    You haven't placed any orders yet. Visit our shop to browse and order products!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 rounded-2xl bg-white/4 border border-white/5 hover:border-white/10 transition-all flex flex-col gap-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
                        <div>
                          <p className="text-xs font-semibold text-gray-400">Order ID: #{order.id}</p>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            {new Date(order.createdAt).toLocaleDateString("en-LK", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="px-2.5 py-0.5 text-[10px] font-black tracking-widest text-[#33A1E0] bg-[#33A1E0]/10 border border-[#33A1E0]/20 rounded-md">
                            {order.orderMethod}
                          </span>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {Array.isArray(order.items) &&
                          order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-[#33A1E0] font-black text-xs">x{item.quantity}</span>
                                <span className="text-gray-300 truncate">{item.name}</span>
                                {item.brand && (
                                  <span className="text-[10px] text-gray-500 px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
                                    {item.brand}
                                  </span>
                                )}
                              </div>
                              {item.price > 0 && (
                                <span className="font-semibold text-gray-400 text-xs flex-shrink-0">
                                  LKR {item.price.toLocaleString()}
                                </span>
                              )}
                            </div>
                          ))}
                      </div>

                      {/* Total */}
                      {order.total && (
                        <div className="flex justify-between items-center pt-3 border-t border-dashed border-white/5">
                          <span className="text-xs text-gray-500 font-semibold">Total Amount</span>
                          <span className="text-base font-black text-[#33A1E0]">
                            LKR {order.total.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
