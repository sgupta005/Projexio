import { getCurrentOrganisation } from '@/api-client/organisation';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function useCurrentOrganisation() {
  const { orgId } = useParams();
  const { data: currentOrg, isLoading: isGettingCurrentOrg } = useQuery({
    queryKey: ['organisation', orgId],
    queryFn: () => getCurrentOrganisation(orgId as string),
    retry: false,
    staleTime: Infinity,
  });
  return { currentOrg, isGettingCurrentOrg };
}
