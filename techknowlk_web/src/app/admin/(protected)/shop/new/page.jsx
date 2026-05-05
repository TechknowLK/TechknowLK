'use client';

import ProductForm from '@/app/admin/components/ProductForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <Link href="/admin/shop" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Inventory
      </Link>
      <ProductForm />
    </div>
  );
}
