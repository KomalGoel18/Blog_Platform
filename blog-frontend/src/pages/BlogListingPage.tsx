import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ApiService } from '../services/api';
import type { BlogPost } from '../types';
import { SkeletonCard } from '../components/SkeletonCard';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';

export function BlogListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 10);
  const search = searchParams.get('search') || '';
  const author = searchParams.get('author') || '';

  const [searchInput, setSearchInput] = useState(search);
  const [authorInput, setAuthorInput] = useState(author);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ApiService.getPosts({ page, limit, search, author });
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, limit, search, author]);

  const updateParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams);
    value ? params.set(key, value) : params.delete(key);
    params.set('page', '1');
    setSearchParams(params);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {[...Array(limit)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error} onRetry={() => setSearchParams(searchParams)} />;
  }

  if (posts.length === 0 && !search && !author) {
    return <EmptyState />;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <button
          onClick={() => navigate('/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create Post
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateParam('search', searchInput);
        }}
        className="flex gap-2 mb-6"
      >
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by title"
          className="border px-3 py-2 rounded w-full"
        />
        <input
          value={authorInput}
          onChange={(e) => setAuthorInput(e.target.value)}
          placeholder="Filter by author"
          className="border px-3 py-2 rounded w-64"
        />
        <button
          type="button"
          onClick={() => updateParam('author', authorInput)}
          className="border px-4 py-2 rounded"
        >
          Apply
        </button>
      </form>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">No posts found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => navigate(`/posts/${post.id}`)}
                className="border rounded p-4 cursor-pointer hover:shadow"
              >
                <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {post.content.slice(0, 120)}...
                </p>
                <div className="text-xs text-gray-500">
                  {post.author} • {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              disabled={page === 1}
              onClick={() => updateParam('page', String(page - 1))}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => updateParam('page', String(page + 1))}
              className="px-4 py-2 border rounded"
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
