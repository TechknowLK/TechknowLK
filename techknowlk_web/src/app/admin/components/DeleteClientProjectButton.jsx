'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

export default function DeleteClientProjectButton({ id, title }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete the client project: "${title}"?\nThis action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/client-projects/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to delete project. Please try again.');
        setIsDeleting(false);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('An error occurred. Please try again.');
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors ${
        isDeleting ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      title="Delete Client Project"
    >
      <Trash2 className="w-4 h-4" />
      <span className="sr-only">Delete</span>
    </button>
  );
}
