import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const project = await prisma.clientProject.findUnique({
      where: { id: parseInt(id) },
      include: {
        updates: {
          orderBy: { date: 'desc' }
        }
      }
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching client project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch client project' },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const data = await req.json();

    const project = await prisma.clientProject.update({
      where: { id: parseInt(id) },
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

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating client project:', error);
    return NextResponse.json(
      { error: 'Failed to update client project' },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await prisma.clientProject.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting client project:', error);
    return NextResponse.json(
      { error: 'Failed to delete client project' },
      { status: 500 }
    );
  }
}
