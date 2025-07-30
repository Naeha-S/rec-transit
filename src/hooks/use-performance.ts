
import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
}

export const usePerformance = () => {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for page to load completely
    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        
        setMetrics(prev => ({
          ...prev,
          loadTime: Math.round(loadTime)
        }));
      }

      // Measure Core Web Vitals
      if ('web-vital' in window) {
        // This would integrate with actual web vitals library in production
        console.log('Performance metrics ready for Core Web Vitals integration');
      }

      setIsLoading(false);
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, []);

  // Performance optimization tips
  const getOptimizationTips = () => {
    const tips = [];
    
    if (metrics.loadTime && metrics.loadTime > 3000) {
      tips.push('Consider optimizing images and reducing bundle size');
    }
    
    // Check connection if available (non-standard API)
    if ('connection' in navigator && (navigator as any).connection?.effectiveType === 'slow-2g') {
      tips.push('User on slow connection - prioritize critical content');
    }
    
    return tips;
  };

  return {
    metrics,
    isLoading,
    optimizationTips: getOptimizationTips()
  };
};

// Hook for monitoring component render performance
export const useRenderPerformance = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Log slow renders in development
      if (process.env.NODE_ENV === 'development' && renderTime > 16) {
        console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    };
  });
};
