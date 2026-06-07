import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return false;
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get('categoryId');
  const subCategoryId = searchParams.get('subCategoryId');
  const brandId = searchParams.get('brandId');

  try {
    const where = {};
    if (categoryId) where.categoryId = parseInt(categoryId);
    if (subCategoryId) where.subCategoryId = parseInt(subCategoryId);
    if (brandId) where.brandId = parseInt(brandId);

    const products = await prisma.shopProduct.findMany({
      where,
      include: {
        category: true,
        subCategory: true,
        brand: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    
    if (!data.name || !data.categoryId || !data.brandId) {
      return NextResponse.json({ error: 'Name, Category, and Brand are required' }, { status: 400 });
    }

    const newProduct = await prisma.shopProduct.create({
      data: {
        name: data.name,
        description: data.description || '',
        images: data.images || [],
        categoryId: parseInt(data.categoryId),
        subCategoryId: data.subCategoryId ? parseInt(data.subCategoryId) : null,
        brandId: parseInt(data.brandId),
        documentation: data.documentation || null,
        price: parseFloat(data.price) || 0,
      }
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
