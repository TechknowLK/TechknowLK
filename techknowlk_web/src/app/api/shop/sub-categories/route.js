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

  try {
    const where = {};
    if (categoryId) where.categoryId = parseInt(categoryId);

    const subCategories = await prisma.shopSubCategory.findMany({
      where,
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(subCategories, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch sub-categories:', error);
    return NextResponse.json({ error: 'Failed to fetch sub-categories' }, { status: 500 });
  }
}

export async function POST(req) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { name, categoryId } = await req.json();
    if (!name || !categoryId) return NextResponse.json({ error: 'Name and Category ID are required' }, { status: 400 });

    const newSubCategory = await prisma.shopSubCategory.create({
      data: { 
        name,
        categoryId: parseInt(categoryId)
      }
    });
    return NextResponse.json(newSubCategory, { status: 201 });
  } catch (error) {
    console.error('Failed to create sub-category:', error);
    return NextResponse.json({ error: 'Failed to create sub-category' }, { status: 500 });
  }
}
