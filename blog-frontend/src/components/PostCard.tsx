import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
      {/* Image */}
      <div className="h-44 bg-gradient-to-r from-blue-200 to-purple-200" />

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs mb-2">
          <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-semibold">
            BLOG
          </span>
          <span className="text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-lg font-bold leading-snug mb-2">
          {post.title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {post.content}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
              {post.author.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-gray-700">{post.author}</span>
          </div>

          <Link
            to={`/posts/${post.id}`}
            className="text-blue-600 text-sm font-semibold hover:underline"
          >
            READ MORE →
          </Link>
        </div>
      </div>
    </div>
  );
}
