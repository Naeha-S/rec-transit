
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

// Enhanced loading skeleton for the home page
export const HomePageSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
        <div className="text-center mb-6">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto mb-2" />
          <Skeleton className="h-4 w-80 mx-auto" />
        </div>
        
        {/* Search bar skeleton */}
        <div className="flex justify-center mb-6">
          <Skeleton className="h-12 w-full max-w-md" />
        </div>
        
        {/* Quick stats skeleton */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-2 sm:p-6">
              <div className="flex flex-col items-center justify-center text-center min-h-[100px] sm:min-h-[140px]">
                <Skeleton className="w-8 h-8 sm:w-14 sm:h-14 rounded-full mb-2 sm:mb-4" />
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-6 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Map skeleton */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="mb-4">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="w-full h-64 rounded-lg" />
      </div>
      
      {/* Notifications skeleton */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded p-3">
              <div className="flex items-start space-x-3">
                <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Admin panel loading skeleton
export const AdminPanelSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="mb-6">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>
      
      {/* Tabs skeleton */}
      <div className="space-y-4">
        <div className="flex space-x-4 border-b pb-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>
        
        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <Skeleton className="h-6 w-32 mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-8 w-24 mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Bus list loading skeleton
export const BusListSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Error state component with retry functionality
export const ErrorState: React.FC<{ 
  title?: string; 
  description?: string; 
  onRetry?: () => void;
}> = ({ 
  title = "Something went wrong", 
  description = "Please try again later", 
  onRetry 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-red-600 text-2xl">⚠️</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-college-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
