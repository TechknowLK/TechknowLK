'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="ml-3 inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-sm font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-sm"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  );
}
