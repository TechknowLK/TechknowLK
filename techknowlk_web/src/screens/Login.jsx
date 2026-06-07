import React, { useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import logo from "/assets/Img/logo02.png";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      toast.success("Welcome back!");
      navigate("/profile");
    } else {
      setError(res.error || "Invalid email or password");
      toast.error(res.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F7F6] p-0 md:p-6 lg:p-8 font-sans overflow-hidden">
      
      {/* Animation Stylesheet */}
      <style>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slowGlow {
          0%, 100% { transform: scale(1) translate(0px, 0px); }
          50% { transform: scale(1.15) translate(20px, -20px); }
        }
        @keyframes slowGlowReverse {
          0%, 100% { transform: scale(1) translate(0px, 0px); }
          50% { transform: scale(1.1) translate(-20px, 20px); }
        }
        .animate-fade-left {
          animation: fadeInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-right {
          animation: fadeInRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-stagger-1 { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; }
        .animate-stagger-2 { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards; }
        .animate-stagger-3 { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards; }
        .animate-stagger-4 { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.65s forwards; }
        .animate-glow-1 { animation: slowGlow 10s ease-in-out infinite; }
        .animate-glow-2 { animation: slowGlowReverse 12s ease-in-out infinite; }
      `}</style>

      <div className="w-full max-w-5xl bg-white rounded-none md:rounded-3xl shadow-2xl flex overflow-hidden min-h-[100vh] md:min-h-[80vh] lg:min-h-[75vh]">
        
        {/* Left Column: Visual Brand Banner */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#011423] via-[#012A3A] to-[#154D71] p-12 text-white flex-col justify-between relative overflow-hidden animate-fade-left">
          
          {/* Glowing Animated Blobs */}
          <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-[#33A1E0]/15 blur-3xl pointer-events-none animate-glow-1" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#25D366]/8 blur-3xl pointer-events-none animate-glow-2" />

          {/* Logo & Brand */}
          <div className="relative z-10 flex items-center gap-2 transform transition-transform duration-500 hover:scale-105">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full scale-125" />
            <span className="font-bold text-xl tracking-wide">
              Techknow<span className="text-[#33A1E0]">LK</span>
            </span>
          </div>

          {/* Marketing Messaging */}
          <div className="relative z-10 my-auto space-y-6">
            <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-wide">
              Hello <br />
              <span className="text-[#33A1E0] inline-block hover:scale-105 transition-transform duration-300">TechknowLK!</span> 
            </h2>
            <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
              Your trusted partner for high-quality hardware solutions, custom electronic projects, and smart tech innovations in Sri Lanka.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-sm text-gray-200 transform transition-transform duration-300 hover:translate-x-2">
                <CheckCircle className="w-5 h-5 text-[#33A1E0]" />
                <span>Premium Quality Hardware Parts</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-200 transform transition-transform duration-300 hover:translate-x-2">
                <CheckCircle className="w-5 h-5 text-[#33A1E0]" />
                <span>Custom Engineering & Tech Projects</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-200 transform transition-transform duration-300 hover:translate-x-2">
                <CheckCircle className="w-5 h-5 text-[#33A1E0]" />
                <span>Real-Time Order Tracking Dashboard</span>
              </div>
            </div>
          </div>

          {/* Footer inside Left Banner */}
          <div className="relative z-10 text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Techknow Lanka. All rights reserved.
          </div>
        </div>

        {/* Right Column: Clean Form Layout */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative animate-fade-right">
          
          {/* Mobile Logo Header */}
          <div className="flex md:hidden items-center gap-2 mb-8">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
            <span className="font-bold text-lg text-[#012A3A]">
              Techknow<span className="text-[#33A1E0]">LK</span>
            </span>
          </div>

          <div className="max-w-md w-full mx-auto space-y-8">
            
            {/* Title Block */}
            <div className="animate-stagger-1">
              <h3 className="text-3xl font-extrabold text-[#012A3A] tracking-wide">Welcome Back!</h3>
              <p className="text-gray-500 text-sm mt-2">
                Don't have an account?{" "}
                <Link to="/register" className="text-[#33A1E0] font-bold hover:underline transition-all duration-300 hover:text-[#1e7ab8]">
                  Create a new account now
                </Link>
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-red-600 text-sm animate-pulse">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Address */}
              <div className="animate-stagger-2">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#33A1E0] transition-colors duration-300" />
                  <input
                    type="email"
                    placeholder="yourname@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#012A3A] placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-[#33A1E0] focus:bg-white focus:ring-4 focus:ring-[#33A1E0]/10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="animate-stagger-3">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#33A1E0] transition-colors duration-300" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#012A3A] placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-[#33A1E0] focus:bg-white focus:ring-4 focus:ring-[#33A1E0]/10"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="animate-stagger-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#012A3A] to-[#154D71] hover:from-[#33A1E0] hover:to-[#1e7ab8] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all duration-500 disabled:opacity-70 group cursor-pointer"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Login Now</span>
                      <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1.5" />
                    </>
                  )}
                </button>
              </div>

            </form>

            {/* Back Home */}
            <div className="text-center pt-4 border-t border-gray-100 animate-stagger-4">
              <Link to="/" className="text-xs text-gray-400 hover:text-[#33A1E0] transition-colors duration-300">
                &larr; Back to Home
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
