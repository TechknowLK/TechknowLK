'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Info, LayoutList, Image as ImageIcon, Code2, Link as LinkIcon } from 'lucide-react';

export default function ProjectForm({ project = null }) {
  const router = useRouter();
  const isEditing = !!project;

  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    overview: project?.overview || '',
    features: project?.features ? project.features.join('\n') : '',
    images: project?.images ? project.images.join('\n') : '',
    technologies: project?.technologies ? project.technologies.join('\n') : '',
    category: project?.category || 'Software Solutions',
    demoUrl: project?.demoUrl || ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadingImages, setUploadingImages] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    setError('');

    const uploadFormData = new FormData();
    for (let i = 0; i < files.length; i++) {
       uploadFormData.append('files', files[i]);
    }

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      });

      if (res.ok) {
        const data = await res.json();
        const currentImages = formData.images.trim();
        const urlsText = data.urls.join('\n');
        
        setFormData(prev => ({
          ...prev,
          images: currentImages ? `${currentImages}\n${urlsText}` : urlsText
        }));
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to upload images');
      }
    } catch (err) {
      setError('An error occurred during file upload.');
    } finally {
      setUploadingImages(false);
      e.target.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Convert newline-separated strings back to arrays
    const payload = {
      ...formData,
      features: formData.features.split('\n').map(s => s.trim()).filter(Boolean),
      images: formData.images.split('\n').map(s => s.trim()).filter(Boolean),
      technologies: formData.technologies.split('\n').map(s => s.trim()).filter(Boolean)
    };

    try {
      const url = isEditing ? `/api/projects/${project.id}` : '/api/projects';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        router.push('/admin/dashboard');
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
              {isEditing ? 'Edit Project' : 'Create New Project'}
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">
              {isEditing ? 'Update the details of your existing project below.' : 'Fill in the information to add a new project to your portfolio.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              type="button" 
              onClick={() => router.back()} 
              className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button 
              type="submit" 
              form="project-form"
              disabled={loading} 
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-md shadow-blue-600/20"
            >
              {loading ? (
                 <span className="flex items-center gap-2">
                   <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   Saving...
                 </span>
              ) : (
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

        <form id="project-form" onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* General Information */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Info className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-slate-900">General Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Project Title</label>
                <input 
                  required 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="e.g. E-Commerce Platform"
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
                  <option value="IoT & Automation">IoT & Automation</option>
                  <option value="Electrical & Networking">Electrical & Networking</option>
                  <option value="IT Consulting">IT Consulting</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Short Description</label>
              <textarea 
                required 
                name="description" 
                rows={2} 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="A brief summary of the project..."
                className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 resize-none" 
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Detailed Overview</label>
              <textarea 
                required 
                name="overview" 
                rows={4} 
                value={formData.overview} 
                onChange={handleChange} 
                placeholder="Provide a comprehensive explanation of the project's goals, challenges, and solutions..."
                className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 resize-y" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-slate-400" /> Demo URL (Optional)
              </label>
              <input 
                type="url" 
                name="demoUrl" 
                value={formData.demoUrl} 
                onChange={handleChange} 
                placeholder="https://..."
                className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900" 
              />
            </div>
          </section>

          {/* Details & Assets */}
          <section className="space-y-6 pt-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <LayoutList className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-slate-900">Details & Assets</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <LayoutList className="w-4 h-4 text-slate-400" /> Features
                </label>
                <p className="text-xs text-slate-500 font-medium pb-1">One feature per line</p>
                <textarea 
                  name="features" 
                  rows={6} 
                  value={formData.features} 
                  onChange={handleChange} 
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 text-sm whitespace-pre" 
                  placeholder="User authentication&#10;Real-time chat&#10;Payment gateway" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-slate-400" /> Images
                  </label>
                  <label className="cursor-pointer inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                    {uploadingImages ? 'Uploading...' : 'Upload Images'}
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      disabled={uploadingImages}
                      className="hidden" 
                    />
                  </label>
                </div>
                <p className="text-xs text-slate-500 font-medium pb-1">Image URLs (one per line, or upload above)</p>
                <textarea 
                  name="images" 
                  rows={6} 
                  value={formData.images} 
                  onChange={handleChange} 
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 text-sm whitespace-pre" 
                  placeholder="/assets/hero.jpg&#10;https://example.com/screenshot.png" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-slate-400" /> Technologies
                </label>
                <p className="text-xs text-slate-500 font-medium pb-1">One technology per line</p>
                <textarea 
                  name="technologies" 
                  rows={6} 
                  value={formData.technologies} 
                  onChange={handleChange} 
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 text-sm whitespace-pre" 
                  placeholder="React&#10;Next.js&#10;Tailwind CSS" 
                />
              </div>
            </div>
          </section>

        </form>
      </div>
    </div>
  );
}
