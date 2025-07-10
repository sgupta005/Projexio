import { getProjectAnalytics } from '@/api-client/project';
import { useQuery } from '@tanstack/react-query';

export default function useGetProjectAnalytics(
  orgId: string,
  projectId: string
) {
  const {
    data: analytics,
    isLoading: isGettingAnalytics,
    error,
    refetch,
  } = useQuery({
    queryKey: ['ProjectAnalytics', orgId, projectId],
    queryFn: () => getProjectAnalytics(orgId, projectId),
    enabled: !!orgId && !!projectId,
    retry: false,
  });

  return { analytics, isGettingAnalytics, error, refetch };
}
