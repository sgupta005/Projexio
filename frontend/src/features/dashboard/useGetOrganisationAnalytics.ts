import { getOrganisationAnalytics } from '@/api-client/organisation';
import { useQuery } from '@tanstack/react-query';

export default function useGetOrganisationAnalytics(orgId: string) {
  const {
    data: analytics,
    isLoading: isGettingAnalytics,
    error,
    refetch,
  } = useQuery({
    queryKey: ['organisationAnalytics', orgId],
    queryFn: () => getOrganisationAnalytics(orgId),
    enabled: !!orgId,
    retry: false,
  });

  return { analytics, isGettingAnalytics, error, refetch };
}
