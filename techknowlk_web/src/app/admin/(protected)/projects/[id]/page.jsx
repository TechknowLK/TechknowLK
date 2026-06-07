import { prisma } from '@/lib/prisma';
import ProjectForm from '../../../components/ProjectForm';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({ params }) {
  const { id } = await params;
  
  const project = await prisma.project.findUnique({
    where: { id: parseInt(id) }
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProjectForm project={project} />
    </div>
  );
}
