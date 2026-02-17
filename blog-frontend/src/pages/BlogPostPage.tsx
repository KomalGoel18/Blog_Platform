import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Share2, Bookmark } from 'lucide-react';
import { ApiService } from '../services/api';
import type { BlogPost } from '../types';
import { ErrorState } from '../components/ErrorState';

export function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchPost = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getPost(parseInt(id));
      setPost(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !confirm('Are you sure you want to delete this post?')) return;

    try {
      setDeleting(true);
      await ApiService.deletePost(parseInt(id));
      navigate('/');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete post');
      setDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Posts
          </button>
          <ErrorState error={error || 'Post not found'} onRetry={fetchPost} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Posts
        </button>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
  {/* Title */}
  <h1 className="text-4xl font-bold text-gray-900 leading-tight">
    {post.title}
  </h1>

  {/* Actions */}
  <div className="flex gap-2 shrink-0">
    <button
      onClick={() => navigate(`/edit/${post.id}`)}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
    >
      <Edit className="w-4 h-4" />
      Edit
    </button>

    <button
      onClick={handleDelete}
      disabled={deleting}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
    >
      <Trash2 className="w-4 h-4" />
      Delete
    </button>
  </div>
</div>

          <div className="flex items-center gap-4 mb-8 pb-8 border-b">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
            <div>
              <div className="font-semibold text-gray-900">{post.author}</div>
              <div className="text-sm text-gray-500">
                {formatDate(post.createdAt)}
              </div>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bookmark className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {post.updatedAt !== post.createdAt && (
            <div className="mt-8 pt-8 border-t text-sm text-gray-500">
              Last updated: {formatDate(post.updatedAt)}
            </div>
          )}

          <div className="mt-12 pt-8 border-t text-center">
            <div className="text-sm text-gray-500 mb-4">END OF ARTICLE</div>
            <div className="flex justify-center gap-4">
              <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <span className="text-xl">👍</span>
              </button>
              <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <Bookmark className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
