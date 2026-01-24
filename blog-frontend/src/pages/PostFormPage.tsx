import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Bold, Italic, Link, Image } from 'lucide-react';
import { ApiService } from '../services/api';
import type { BlogPost } from '../types';

export function PostFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && id) {
      loadPost(parseInt(id));
    }
  }, [id, isEditMode]);

  const loadPost = async (postId: number) => {
    try {
      setLoading(true);
      const post = await ApiService.getPost(postId);
      setTitle(post.title);
      setAuthor(post.author);
      setContent(post.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError('Title is required to save as a draft.');
      return;
    }

    setTitleError(null);

    try {
      setLoading(true);
      setError(null);

      const postData = {
  title: title.trim(),
  content: content.trim(),
  ...(author.trim() && { author: author.trim() }),
};

      if (isEditMode && id) {
        await ApiService.updatePost(parseInt(id), postData);
      } else {
        await ApiService.createPost(postData);
      }

      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (
      title ||
      content ||
      author ||
      confirm('You have unsaved changes. Are you sure you want to leave?')
    ) {
      navigate('/');
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
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
          Back to all posts
        </button>

        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            {isEditMode ? 'Edit Post' : 'Create New Post'}
          </h1>
          <p className="text-gray-600">
            {isEditMode
              ? 'Update your story and share your insights.'
              : 'Draft your next story for the world to read.'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-900">
                  POST TITLE <span className="text-red-500">*</span>
                </label>
                <span className="text-sm text-gray-400">
                  {title.length} / 100 characters
                </span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setTitleError(null);
                }}
                placeholder="Enter a catchy title..."
                maxLength={100}
                className={`w-full px-4 py-3 border ${
                  titleError ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 ${
                  titleError ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                } text-lg`}
              />
              {titleError && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    !
                  </span>
                  {titleError}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                AUTHOR NAME (OPTIONAL)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-900">
                  BODY CONTENT <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    title="Link"
                  >
                    <Link className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    title="Image"
                  >
                    <Image className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your story..."
                rows={16}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500 italic">
                  Markdown is supported
                </p>
                <p className="text-sm text-gray-400">{content.split(/\s+/).filter(Boolean).length} words</p>
              </div>
            </div>

            {!loading && (
              <div className="flex items-center gap-2 mb-6 text-sm text-green-600">
                <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  ✓
                </span>
                All changes saved to draft
              </div>
            )}

            <div className="flex justify-between items-center pt-6 border-t">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'SAVING...' : 'SAVE POST'}
                  {!loading && <span>→</span>}
                </button>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  STATUS: <span className="text-yellow-600 font-semibold">DRAFT</span>
                </span>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-8 flex justify-center gap-6 text-sm text-gray-500">
          <button className="hover:text-gray-700">
            Last edited: 2 mins ago
          </button>
          <button className="hover:text-gray-700">Preview Post</button>
          <button className="hover:text-gray-700">Version History</button>
        </div>
      </div>
    </div>
  );
}
