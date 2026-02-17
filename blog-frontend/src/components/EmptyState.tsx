import { useNavigate } from 'react-router-dom';

export function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-2xl">
        📝
      </div>

      <h2 className="text-xl font-semibold mb-2">
        It's quiet in here
      </h2>

      <p className="text-gray-500 mb-6">
        No blog posts have been created yet.
        Start sharing your thoughts with the world.
      </p>

      <button
        onClick={() => navigate('/create')}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
      >
        + Create Your First Post
      </button>
    </div>
  );
}
