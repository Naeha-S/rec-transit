
import React, { useState, useEffect, ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ProgressiveLoaderProps {
  loadingStates: {
    skeleton: ReactNode;
    delay: number;
  }[];
  finalContent: ReactNode;
  isLoading: boolean;
}

export const ProgressiveLoader: React.FC<ProgressiveLoaderProps> = ({
  loadingStates,
  finalContent,
  isLoading
}) => {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setCurrentStateIndex(0);
      return;
    }

    const timers: NodeJS.Timeout[] = [];
    
    loadingStates.forEach((state, index) => {
      const timer = setTimeout(() => {
        setCurrentStateIndex(index + 1);
      }, state.delay);
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isLoading, loadingStates]);

  if (!isLoading) {
    return <>{finalContent}</>;
  }

  if (currentStateIndex === 0) {
    return <>{loadingStates[0]?.skeleton}</>;
  }

  if (currentStateIndex <= loadingStates.length) {
    return <>{loadingStates[currentStateIndex - 1]?.skeleton}</>;
  }

  return <>{finalContent}</>;
};
