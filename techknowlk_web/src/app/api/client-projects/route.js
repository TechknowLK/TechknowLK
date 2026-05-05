import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.clientProject.findMany({
      orderBy: { id: 'desc' },
      include: {
        updates: true
      }
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching client projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch client projects' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    
    const project = await prisma.clientProject.create({
      data: {
        projectId: data.projectId,
        projectName: data.projectName,
        clientName: data.clientName,
        clientContact: data.clientContact,
        category: data.category,
        projectManager: data.projectManager,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        status: data.status,
        estimatedBudget: parseFloat(data.estimatedBudget) || 0,
        actualCost: parseFloat(data.actualCost) || 0,
        paymentStatus: data.paymentStatus,
        overallProgress: parseInt(data.overallProgress) || 0,
      }
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating client project:', error);
    return NextResponse.json(
      { error: 'Failed to create client project' },
      { status: 500 }
    );
  }
}
