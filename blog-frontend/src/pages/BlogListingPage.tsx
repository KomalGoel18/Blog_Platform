import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ApiService } from '../services/api';
import type { BlogPost } from '../types';
import { SkeletonCard } from '../components/SkeletonCard';
import { ErrorState } from '../components/ErrorState';
import { PostCard } from '../components/PostCard';
import { EmptyState } from '../components/EmptyState';

const PAGE_SIZE = 9;

export function BlogListingPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);
  const search = searchParams.get('search') || '';
  const author = searchParams.get('author') || '';

  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch ALL posts once
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await ApiService.getPosts({
          page: 1,
          limit: 1000, // large enough to cover all
          search,
          author,
        });

        const sorted = [...data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        setAllPosts(sorted);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [search, author]);

  const totalPages = Math.ceil(allPosts.length / PAGE_SIZE);

  // Slice posts for current page
  const visiblePosts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return allPosts.slice(start, end);
  }, [allPosts, page]);

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    setSearchParams(params);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(PAGE_SIZE)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error} onRetry={() => setPage(page)} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
        </div>
        <button
          onClick={() => navigate('/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create Post
        </button>
      </div>

      {/* Content */}
      {visiblePosts.length === 0 ? (
        <div className="mt-20">
          <EmptyState />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 mt-12">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="p-2 border rounded disabled:opacity-40"
  >
    <ChevronLeft />
  </button>

  <span className="text-sm font-medium">
    Page {page} of {totalPages || 1}
  </span>

  <button
    disabled={page === totalPages || totalPages === 0}
    onClick={() => setPage(page + 1)}
    className="p-2 border rounded disabled:opacity-40"
  >
    <ChevronRight />
  </button>
</div>
    </div>
  );
}
