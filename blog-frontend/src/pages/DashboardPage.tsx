import { useEffect, useState } from 'react';
import { ApiService } from '../services/api';
import type { BlogPost } from '../types';

export default function DashboardPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        // fetch a large limit to compute dashboard stats
        const data = await ApiService.getPosts({
          page: 1,
          limit: 1000,
        });
        setPosts(data);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  const totalPosts = posts.length;

  const uniqueAuthors = new Set(posts.map((p) => p.author)).size;

  const latestPost = posts
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )[0];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* HEADER — SAME AS POSTS PAGE */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">
          Overview of your blog platform
        </p>
      </div>

      {/* GRID — SAME VISUAL SYSTEM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TOTAL POSTS */}
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-sm text-gray-500 mb-2">Total Posts</p>
          <p className="text-3xl font-bold">
            {loading ? '—' : totalPosts}
          </p>
        </div>

        {/* AUTHORS */}
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-sm text-gray-500 mb-2">Authors</p>
          <p className="text-3xl font-bold">
            {loading ? '—' : uniqueAuthors}
          </p>
        </div>

        {/* LAST ACTIVITY */}
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-sm text-gray-500 mb-2">Last Activity</p>

          {loading ? (
            <p className="text-gray-400">Loading…</p>
          ) : latestPost ? (
            <div>
              <p className="font-medium truncate">
                {latestPost.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(latestPost.createdAt).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p className="text-gray-400">No activity yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
