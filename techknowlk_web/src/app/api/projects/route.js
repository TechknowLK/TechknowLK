import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';

// Helper to verify admin
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
    const projects = await prisma.project.findMany({
      orderBy: { id: 'desc' }
    });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    
    // Convert arrays/objects to JSON format as expected by Prisma
    const newProject = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        overview: data.overview,
        features: data.features || [],
        images: data.images || [],
        technologies: data.technologies || [],
        category: data.category,
        demoUrl: data.demoUrl || null,
      }
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
