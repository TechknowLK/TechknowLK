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

export async function GET() {
  try {
    const categories = await prisma.shopCategory.findMany({
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(req) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { name } = await req.json();
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const newCategory = await prisma.shopCategory.create({
      data: { name }
    });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Failed to create category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
