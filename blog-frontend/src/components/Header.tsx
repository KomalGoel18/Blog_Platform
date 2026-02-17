import { NavLink, useNavigate } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ApiService } from '../services/api';
import type { BlogPost } from '../types';

export function Header() {
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [showNotifications, setShowNotifications] = useState(false);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);

  const [showUserMenu, setShowUserMenu] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowSearch(false);
        setShowNotifications(false);
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Fetch recent activity for notifications
  useEffect(() => {
    const fetchRecent = async () => {
      const posts = await ApiService.getPosts({ page: 1, limit: 5 });

const sorted = [...posts].sort(
  (a, b) =>
    new Date(b.createdAt).getTime() -
    new Date(a.createdAt).getTime()
);

setRecentPosts(sorted);
    };
    fetchRecent();
  }, []);

  const base =
    'px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600';
  const active =
    'px-3 py-2 text-sm font-semibold text-blue-600 border-b-2 border-blue-600';

  return (
    <header className="bg-white border-b relative z-50">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
      >
        {/* LEFT */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
            📘 BlogPlatform
          </div>

          <nav className="flex gap-6">
            <NavLink to="/" className={({ isActive }) => (isActive ? active : base)}>
              Dashboard
            </NavLink>
            <NavLink to="/posts" className={({ isActive }) => (isActive ? active : base)}>
              Posts
            </NavLink>
            <NavLink to="/analytics" className={({ isActive }) => (isActive ? active : base)}>
              Analytics
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? active : base)}>
              Settings
            </NavLink>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">
          {/* SEARCH */}
          <button
            onClick={() => {
              setShowSearch((s) => !s);
              setShowNotifications(false);
              setShowUserMenu(false);
            }}
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {showSearch && (
            <div className="absolute right-36 top-14 bg-white shadow rounded-lg p-3 w-72">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate(`/posts?search=${searchQuery}`);
                  setShowSearch(false);
                }}
              >
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts..."
                  className="w-full border px-3 py-2 rounded text-sm"
                />
              </form>
            </div>
          )}

          {/* NOTIFICATIONS */}
          <button
            onClick={() => {
              setShowNotifications((s) => !s);
              setShowSearch(false);
              setShowUserMenu(false);
            }}
          >
            <Bell className="w-5 h-5 text-gray-600" />
          </button>

          {showNotifications && (
            <div className="absolute right-16 top-14 bg-white shadow rounded-lg w-72">
              <div className="p-3 border-b text-sm font-semibold">
                Recent Activity
              </div>
              {recentPosts.length === 0 ? (
                <p className="p-3 text-sm text-gray-500">
                  No activity yet
                </p>
              ) : (
                recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      navigate(`/posts/${post.id}`);
                      setShowNotifications(false);
                    }}
                  >
                    <p className="font-medium truncate">{post.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* USER MENU */}
          <button
            onClick={() => {
              setShowUserMenu((s) => !s);
              setShowSearch(false);
              setShowNotifications(false);
            }}
            className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold"
          >
            U
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-14 bg-white shadow rounded-lg w-40">
              <button
                onClick={() => navigate('/settings')}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
              >
                Settings
              </button>
              <button
                onClick={() => alert('Logout not implemented')}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
