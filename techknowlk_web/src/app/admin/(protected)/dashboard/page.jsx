import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteButton from './DeleteButton';
import { Plus, FolderKanban, Calendar, ArrowUpRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const projects = await prisma.project.findMany({
    orderBy: { id: 'desc' },
  });

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Header section with stats/cards idea */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 p-8 bg-white rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-50 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Projects Portfolio</h1>
          <p className="max-w-xl text-sm text-slate-500 font-medium">
            Manage your entire portfolio from here. Add new projects, edit existing details, or remove outdated entries to keep your personal website fresh.
          </p>
        </div>
        
        <div className="relative z-10">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Create Project
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 flex items-center border-b border-slate-100 bg-slate-50/50 py-5">
           <div className="flex bg-white shadow-sm border border-slate-200 rounded-lg p-1">
             <div className="px-4 py-1.5 text-sm font-semibold bg-slate-100 text-slate-900 rounded-md">All Projects</div>
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="py-4 pl-8 pr-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Project Details</th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Date Added</th>
                <th scope="col" className="relative py-4 pl-3 pr-8 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="whitespace-nowrap py-5 pl-8 pr-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                         <FolderKanban className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{project.title}</div>
                        <div className="text-xs text-slate-500 font-medium">#{project.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                      {project.category}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                       <Calendar className="w-4 h-4 text-slate-400" />
                       {new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                  </td>
                  <td className="relative whitespace-nowrap py-5 pl-3 pr-8 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Link 
                        href={`/admin/projects/${project.id}`} 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-blue-600 hover:bg-blue-50 font-semibold transition-colors"
                      >
                        Edit
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                      <DeleteButton id={project.id} title={project.title} />
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-12 px-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4 text-slate-400">
                      <FolderKanban className="w-8 h-8" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">No projects yet</h3>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto">
                      Get started by adding your first portfolio project. It will appear here once created.
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/admin/projects/new"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add First Project
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
