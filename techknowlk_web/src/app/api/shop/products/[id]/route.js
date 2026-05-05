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

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const product = await prisma.shopProduct.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
        subCategory: true,
        brand: true
      }
    });
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const data = await req.json();
    const updatedProduct = await prisma.shopProduct.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        description: data.description,
        images: data.images,
        categoryId: parseInt(data.categoryId),
        subCategoryId: data.subCategoryId ? parseInt(data.subCategoryId) : null,
        brandId: parseInt(data.brandId),
        documentation: data.documentation,
        price: parseFloat(data.price),
      }
    });
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.shopProduct.delete({
      where: { id: parseInt(id) }
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
