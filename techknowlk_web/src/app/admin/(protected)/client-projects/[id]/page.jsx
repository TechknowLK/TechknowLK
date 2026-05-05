import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ClientProjectForm from '../../../components/ClientProjectForm';
import ProjectUpdatesSection from '../../../components/ProjectUpdatesSection';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function EditClientProjectPage({ params }) {
  const { id } = await params;
  
  if (isNaN(parseInt(id))) {
    notFound();
  }

  const project = await prisma.clientProject.findUnique({
    where: { id: parseInt(id) },
    include: {
      updates: {
        orderBy: { date: 'desc' }
      }
    }
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Back button above form */}
      <div className="mb-4">
        <Link href="/admin/client-projects" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to List
        </Link>
      </div>

      <ClientProjectForm project={project} />
      
      {/* Include the Updates/Timeline component */}
      <ProjectUpdatesSection projectId={project.id} initialUpdates={project.updates} />
    </div>
  );
}
