
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { cacheService } from '@/services/cacheService';
import { performanceService } from '@/services/performanceService';

interface UseCachedQueryOptions<T> extends Omit<UseQueryOptions<T>, 'queryFn'> {
  cacheKey: string;
  queryFn: () => Promise<T>;
  cacheTtl?: number;
  version?: string;
  enablePerformanceTracking?: boolean;
}

export function useCachedQuery<T>({
  cacheKey,
  queryFn,
  cacheTtl,
  version = '1.0',
  enablePerformanceTracking = true,
  ...queryOptions
}: UseCachedQueryOptions<T>) {
  
  const enhancedQueryFn = async (): Promise<T> => {
    // Check cache first
    const cachedData = cacheService.get<T>(cacheKey, version);
    if (cachedData) {
      if (enablePerformanceTracking) {
        performanceService.recordMetric('cache_hit', 1, { key: cacheKey });
      }
      return cachedData;
    }

    // Fetch data with performance tracking
    const fetchData = async () => {
      const data = await queryFn();
      cacheService.set(cacheKey, data, cacheTtl, version);
      return data;
    };

    if (enablePerformanceTracking) {
      performanceService.recordMetric('cache_miss', 1, { key: cacheKey });
      return await performanceService.measureAsync(`fetch_${cacheKey}`, fetchData);
    }

    return await fetchData();
  };

  return useQuery({
    queryKey: [cacheKey, version],
    queryFn: enhancedQueryFn,
    staleTime: cacheTtl || 5 * 60 * 1000, // 5 minutes default
    ...queryOptions
  });
}
