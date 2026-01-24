import { FileEdit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <FileEdit className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
        It's quiet in here
      </h3>
      <p className="text-gray-600 text-center max-w-md mb-6">
        No blog posts have been created yet. Start sharing your thoughts with
        the world.
      </p>
      <button
        onClick={() => navigate('/create')}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <span className="text-xl">+</span>
        Create Your First Post
      </button>
    </div>
  );
}
