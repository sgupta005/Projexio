import { getMembers } from '@/api-client/organisation';
import { useQuery } from '@tanstack/react-query';

export default function useGetMembers(orgId: string) {
  const { data: members, isLoading: isGettingMembers } = useQuery({
    queryKey: ['members', orgId],
    queryFn: () => getMembers(orgId),
    retry: false,
    enabled: !!orgId, // Only run query if orgId is truthy
  });

  return { members, isGettingMembers };
}
