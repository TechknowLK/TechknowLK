'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Info, FileText, User, DollarSign, Activity } from 'lucide-react';

export default function ClientProjectForm({ project = null }) {
  const router = useRouter();
  const isEditing = !!project;

  const [formData, setFormData] = useState({
    projectId: project?.projectId || '',
    projectName: project?.projectName || '',
    clientName: project?.clientName || '',
    clientContact: project?.clientContact || '',
    category: project?.category || 'Software Solutions',
    projectManager: project?.projectManager || '',
    startDate: project?.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
    endDate: project?.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
    status: project?.status || 'Ongoing',
    estimatedBudget: project?.estimatedBudget || 0,
    actualCost: project?.actualCost || 0,
    paymentStatus: project?.paymentStatus || 'Pending',
    overallProgress: project?.overallProgress || 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEditing ? `/api/client-projects/${project.id}` : '/api/client-projects';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        router.push('/admin/client-projects');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {isEditing ? 'Edit Client Project' : 'Register Client Project'}
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">
              {isEditing ? 'Update the details for this project.' : 'Enter details to start tracking a new project.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              type="button" 
              onClick={() => router.back()} 
              className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button 
              type="submit" 
              form="client-project-form"
              disabled={loading} 
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-md shadow-blue-600/20"
            >
              {loading ? 'Saving...' : (
                <>
                  <Save className="w-4 h-4" />
                  Save Project
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
            <Info className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form id="client-project-form" onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* General Information */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <FileText className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-slate-900">Project Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Project ID</label>
                <input 
                  required 
                  type="text" 
                  name="projectId" 
                  value={formData.projectId} 
                  onChange={handleChange} 
                  placeholder="e.g. TLE202601"
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900" 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Project Name</label>
                <input 
                  required 
                  type="text" 
                  name="projectName" 
                  value={formData.projectName} 
                  onChange={handleChange} 
                  placeholder="e.g. Clothing Web App"
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900" 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Category</label>
                <select 
                  required 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900" 
                >
                  <option value="Software Solutions">Software Solutions</option>
                  <option value="IoT">IoT</option>
                  <option value="Networking">Networking</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Project Manager</label>
                <input 
                  required 
                  type="text" 
                  name="projectManager" 
                  value={formData.projectManager} 
                  onChange={handleChange} 
                  placeholder="Manager Name"
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900" 
                />
              </div>
            </div>
          </section>

          {/* Client Information */}
          <section className="space-y-6 pt-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <User className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-slate-900">Client Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Client Name</label>
                <input 
                  required 
                  type="text" 
                  name="clientName" 
                  value={formData.clientName} 
                  onChange={handleChange} 
                  placeholder="e.g. Acme Corp"
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900" 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Client Contact Details</label>
                <input 
                  required 
                  type="text" 
                  name="clientContact" 
                  value={formData.clientContact} 
                  onChange={handleChange} 
                  placeholder="Email, Phone, Address"
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900" 
                />
              </div>
            </div>
          </section>

          {/* Financials */}
          <section className="space-y-6 pt-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <DollarSign className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-slate-900">Financials</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Estimated Budget</label>
                <input 
                  required 
                  type="number" 
                  name="estimatedBudget" 
                  value={formData.estimatedBudget} 
                  onChange={handleChange} 
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900" 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Actual Cost</label>
                <input 
                  required 
                  type="number" 
                  name="actualCost" 
                  value={formData.actualCost} 
                  onChange={handleChange} 
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900" 
                />
              </div>
              <div className="space-y-2 pb-4">
                <label className="block text-sm font-semibold text-slate-700 text-blue-600">Calculated Profit / Loss</label>
                <div className="h-12 flex items-center px-4 rounded-xl font-bold bg-slate-50 text-slate-800 border border-slate-200 border-dashed border-2">
                  {(parseFloat(formData.estimatedBudget || 0) - parseFloat(formData.actualCost || 0)).toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Payment Status</label>
                <select 
                  required 
                  name="paymentStatus" 
                  value={formData.paymentStatus} 
                  onChange={handleChange} 
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900" 
                >
                  <option value="Pending">Pending</option>
                  <option value="Partial">Partial</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>
          </section>

          {/* Timeline & Status */}
          <section className="space-y-6 pt-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Activity className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-slate-900">Timeline & Status</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Start Date</label>
                <input 
                  type="date" 
                  name="startDate" 
                  value={formData.startDate} 
                  onChange={handleChange} 
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900" 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">End Date</label>
                <input 
                  type="date" 
                  name="endDate" 
                  value={formData.endDate} 
                  onChange={handleChange} 
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900" 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Project Status</label>
                <select 
                  required 
                  name="status" 
                  value={formData.status} 
                  onChange={handleChange} 
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900" 
                >
                  <option value="Not Started">Not Started</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Overall Progress (%)</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    name="overallProgress" 
                    value={formData.overallProgress} 
                    onChange={handleChange} 
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                  />
                  <span className="w-12 text-center font-bold text-slate-700">{formData.overallProgress}%</span>
                </div>
              </div>
            </div>
          </section>

        </form>
      </div>
    </div>
  );
}
