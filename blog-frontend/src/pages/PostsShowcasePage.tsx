import { SkeletonCard } from '../components/SkeletonCard';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';

export function PostsShowcasePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold mb-4">API Response States</h1>
      <p className="text-gray-600 mb-10">
        A developer-focused preview showcasing how the Blog Platform handles
        Loading, Empty, and Error states.
      </p>

      {/* Loading */}
      <h2 className="text-xl font-semibold mb-4">1. Loading State</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
      </div>

      {/* Empty */}
      <h2 className="text-xl font-semibold mb-4">2. Empty State</h2>
      <div className="border rounded-xl p-12 mb-12">
        <EmptyState />
      </div>

      {/* Error */}
      <h2 className="text-xl font-semibold mb-4">3. Error State</h2>
      <ErrorState
        error="Failed to fetch data"
        onRetry={() => alert('Retry clicked')}
      />
    </div>
  );
}
