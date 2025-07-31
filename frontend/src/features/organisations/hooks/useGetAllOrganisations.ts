import { getAllOrganisations } from '@/api-client/organisation';
import { useQuery } from '@tanstack/react-query';

export default function useGetAllOrganisations() {
  const { data: organisations, isLoading: isGettingOrganisations } = useQuery({
    queryKey: ['allOrganisations'],
    queryFn: getAllOrganisations,
    retry: false,
  });
  return { organisations, isGettingOrganisations };
}
