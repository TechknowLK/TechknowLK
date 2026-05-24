import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from '../components/LogoutButton';
import { LayoutDashboard, Globe, Shield, Briefcase, ShoppingBag } from 'lucide-react';

export default async function ProtectedLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-8">
              <div className="flex-shrink-0 flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-600/20">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="font-bold text-2xl tracking-tight text-slate-900">
                  Techknow<span className="text-blue-600">LK</span>
                </span>
              </div>
              <div className="hidden sm:flex sm:space-x-2">
                <Link 
                  href="/admin/dashboard" 
                  className="text-slate-500 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link 
                  href="/admin/client-projects" 
                  className="text-slate-500 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200"
                >
                  <Briefcase className="w-4 h-4" />
                  Client Projects
                </Link>
                <Link 
                  href="/admin/shop" 
                  className="text-slate-500 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200"
                >
                  <Briefcase className="w-4 h-4" />
                  Shop
                </Link>
                <Link 
                  href="/admin/orders" 
                  className="text-slate-500 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Orders
                </Link>
                <Link 
                  href="/" 
                  target="_blank" 
                  className="text-slate-500 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                >
                  <Globe className="w-4 h-4" />
                  View Website
                </Link>
              </div>
            </div>
            <div className="hidden sm:flex sm:items-center">
              <div className="flex items-center gap-4">
                <div className="text-sm text-right mr-2 hidden lg:block">
                  <p className="font-semibold text-slate-900 leading-none mb-1">Administrator</p>
                  <p className="text-slate-500 leading-none text-xs">Manage your site</p>
                </div>
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Decorative background blur element */}
      <div className="absolute top-20 right-0 w-[500px] h-[300px] bg-blue-100/50 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      
      <main className="flex-1 max-w-7xl mx-auto py-10 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
