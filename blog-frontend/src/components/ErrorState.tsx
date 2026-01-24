import { CloudOff, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <CloudOff className="w-10 h-10 text-red-500" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
        Failed to fetch data
      </h3>
      <p className="text-gray-600 text-center max-w-md mb-6">
        We encountered a network error while retrieving the blog feed. Check
        your connection and try again.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Retry Connection
        </button>
      </div>
      {error && (
        <p className="mt-4 text-sm text-red-600">Error ID: {error}</p>
      )}
    </div>
  );
}
