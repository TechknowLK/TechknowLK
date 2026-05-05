import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const clientProjectId = parseInt(id);
    const data = await req.json();

    const additionalCost = parseFloat(data.additionalCost) || 0;

    // Use a transaction to ensure both the update is created and the main project is updated safely
    const [newUpdate, updatedProject] = await prisma.$transaction([
      prisma.projectUpdate.create({
        data: {
          clientProjectId: clientProjectId,
          title: data.title,
          description: data.description,
          additionalCost: additionalCost,
        }
      }),
      // Only increment actualCost if there's an additional cost
      ...(additionalCost > 0 
        ? [prisma.clientProject.update({
            where: { id: clientProjectId },
            data: {
              actualCost: {
                increment: additionalCost
              }
            }
          })] 
        : [])
    ]);

    return NextResponse.json({ update: newUpdate, project: updatedProject || null }, { status: 201 });
  } catch (error) {
    console.error('Error creating project update:', error);
    return NextResponse.json(
      { error: 'Failed to create project update' },
      { status: 500 }
    );
  }
}
