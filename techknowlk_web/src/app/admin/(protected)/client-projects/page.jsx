import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteClientProjectButton from '../../components/DeleteClientProjectButton';
import { Plus, Briefcase, Calendar, ArrowUpRight, TrendingUp, DollarSign } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ClientProjectsPage() {
  const projects = await prisma.clientProject.findMany({
    orderBy: { id: 'desc' },
  });

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 p-8 bg-white rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-50 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Client Projects</h1>
          <p className="max-w-xl text-sm text-slate-500 font-medium">
            Manage your ongoing and completed projects, track financials, and update client records.
          </p>
        </div>
        
        <div className="relative z-10">
          <Link
            href="/admin/client-projects/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-white border-b border-slate-100">
              <tr>
                <th scope="col" className="py-4 pl-8 pr-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Project ID & Title</th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Client</th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status / Progress</th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Financials (P/L)</th>
                <th scope="col" className="relative py-4 pl-3 pr-8 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {projects.map((project) => {
                const profitOrLoss = project.estimatedBudget - project.actualCost;
                
                return (
                  <tr key={project.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="whitespace-nowrap py-5 pl-8 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                           <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{project.projectName}</div>
                          <div className="text-xs text-slate-500 font-medium">#{project.projectId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm">
                      <div className="text-slate-900 font-medium">{project.clientName}</div>
                      <div className="text-slate-500 text-xs">{project.projectManager}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide
                          ${project.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                            project.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' : 
                            'bg-amber-100 text-amber-700'}`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${project.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'}`} 
                          style={{ width: `${project.overallProgress}%` }}
                        ></div>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">{project.overallProgress}% Complete</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm">
                      <div className="flex flex-col gap-1">
                         <div className="text-xs text-slate-500">Budget: Ksh {project.estimatedBudget.toLocaleString()}</div>
                         <div className={`text-sm font-bold flex items-center gap-1 ${profitOrLoss >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                           <TrendingUp className="w-3.5 h-3.5" />
                           {profitOrLoss >= 0 ? '+' : '-'}{Math.abs(profitOrLoss).toLocaleString()}
                         </div>
                      </div>
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-8 text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Link 
                          href={`/admin/client-projects/${project.id}`} 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-blue-600 hover:bg-blue-50 font-semibold transition-colors"
                        >
                          View/Edit Map
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                        <DeleteClientProjectButton id={project.id} title={project.projectName} />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-12 px-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4 text-slate-400">
                      <Briefcase className="w-8 h-8" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">No client projects yet</h3>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto">
                      Get started by tracking your first client project.
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/admin/client-projects/new"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Client Project
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
