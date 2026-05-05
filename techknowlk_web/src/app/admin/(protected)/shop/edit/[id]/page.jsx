'use client';

import React, { useState, useEffect } from 'react';
import ProductForm from '@/app/admin/components/ProductForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EditProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/shop/products/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div className="p-10 text-center">Loading product details...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <Link href="/admin/shop" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Inventory
      </Link>
      <ProductForm product={product} />
    </div>
  );
}
