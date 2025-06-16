
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

// Bus card loading skeleton for grid layouts
export const BusCardSkeleton: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex flex-col items-center mb-3">
        <Skeleton className="h-10 w-10 rounded-full mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-24 mx-auto" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
};

// Bus list loading skeleton for table layouts
export const BusListSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Quick stats skeleton for home page
export const QuickStatsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-2 sm:p-6">
          <div className="flex flex-col items-center justify-center text-center min-h-[100px] sm:min-h-[140px]">
            <Skeleton className="w-8 h-8 sm:w-14 sm:h-14 rounded-full mb-2 sm:mb-4" />
            <div className="space-y-1 w-full">
              <Skeleton className="h-3 w-16 mx-auto" />
              <Skeleton className="h-6 w-12 mx-auto" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Map loading skeleton
export const MapSkeleton: React.FC = () => {
  return (
    <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
      <div className="flex flex-col items-center space-y-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
};
