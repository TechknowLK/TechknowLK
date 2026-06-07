'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, History, CornerDownRight, CheckCircle2, TrendingUp } from 'lucide-react';

export default function ProjectUpdatesSection({ projectId, initialUpdates }) {
  const [updates, setUpdates] = useState(initialUpdates || []);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    additionalCost: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/client-projects/${projectId}/updates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
           ...formData,
           additionalCost: parseFloat(formData.additionalCost) || 0
        })
      });

      if (res.ok) {
        const data = await res.json();
        setUpdates([data.update, ...updates]);
        setFormData({ title: '', description: '', additionalCost: '' });
        setIsAdding(false);
        router.refresh(); // Refresh page to reflect new actual cost at the top level
      } else {
        alert('Failed to add update.');
      }
    } catch (err) {
      alert('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
      <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Project Timeline & Updates</h3>
            <p className="text-sm text-slate-500 font-medium mt-0.5">Track modifications, milestones, and additional costs.</p>
          </div>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Update
          </button>
        )}
      </div>

      <div className="p-8">
        {isAdding && (
          <form onSubmit={handleSubmit} className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CornerDownRight className="w-4 h-4 text-slate-400" />
              New Update Log
            </h4>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Update Title</label>
                  <input 
                    required 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="e.g. Added Payment Gateway feature"
                    className="block w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-sm text-slate-900" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide text-indigo-600 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> Additional Cost (LKR)
                  </label>
                  <input 
                    type="number" 
                    name="additionalCost" 
                    value={formData.additionalCost} 
                    onChange={handleChange} 
                    placeholder="0.00"
                    className="block w-full px-4 py-2.5 rounded-lg border border-indigo-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-sm text-slate-900 font-medium" 
                  />
                  <p className="text-[10px] text-slate-400 font-medium">This will increase the project's Actual Cost.</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Description Details</label>
                <textarea 
                  required 
                  name="description" 
                  rows={3} 
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Explain what was changed, added, or why costs increased..."
                  className="block w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-sm text-slate-900 resize-none" 
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsAdding(false)} 
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-sm shadow-indigo-600/20"
                >
                  {loading ? 'Saving...' : 'Save Update'}
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pb-4">
          {updates.length === 0 ? (
            <div className="pl-8 pt-2 pb-6 text-sm text-slate-400 font-medium">No timeline updates recorded yet.</div>
          ) : (
            updates.map((update, index) => (
              <div key={update.id} className="relative pl-8">
                <div className="absolute -left-[11px] top-1 bg-white rounded-full p-1 shadow-sm border border-slate-200">
                   <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-200">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-2">
                    <div>
                      <h5 className="font-bold text-slate-900 flex items-center gap-2">
                        {update.title}
                        {index === 0 && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wide">Latest</span>}
                      </h5>
                      <span className="text-xs text-slate-500 block mt-1 font-medium">
                        {new Date(update.date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                    </div>
                    {update.additionalCost > 0 && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-100 shadow-sm whitespace-nowrap">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <div className="text-xs font-bold flex flex-col">
                           <span>Cost Increase</span>
                           <span className="text-red-800">+{update.additionalCost.toLocaleString()} LKR</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap mt-3 leading-relaxed">
                    {update.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
