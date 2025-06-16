
import React, { useState, useEffect } from 'react';
import { EnhancedLoading } from './enhanced-loading';

interface ProgressiveLoaderProps<T> {
  loadData: () => Promise<T>;
  renderData: (data: T) => React.ReactNode;
  renderError?: (error: Error) => React.ReactNode;
  loadingText?: string;
  retryable?: boolean;
}

export function ProgressiveLoader<T>({
  loadData,
  renderData,
  renderError,
  loadingText = "Loading...",
  retryable = true
}: ProgressiveLoaderProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await loadData();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 animate-fade-in">
        <EnhancedLoading variant="dots" text={loadingText} />
      </div>
    );
  }

  if (error) {
    if (renderError) {
      return <div className="animate-fade-in">{renderError(error)}</div>;
    }
    
    return (
      <div className="text-center p-8 animate-fade-in space-y-4">
        <p className="text-red-600">Failed to load data</p>
        {retryable && (
          <button 
            onClick={handleRetry}
            className="px-4 py-2 bg-college-blue text-white rounded hover:bg-college-blue/90 transition-all hover:scale-105"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return <div className="animate-fade-in">{data && renderData(data)}</div>;
}
