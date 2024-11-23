import { getAllProjects } from '@/api-client/project';
import { useQuery } from '@tanstack/react-query';

export default function useGetAllProjects(orgId: string) {
  const { data: projects, isLoading: isGettingProjects } = useQuery({
    queryKey: ['allProjects', orgId],
    queryFn: () => getAllProjects(orgId),
    retry: false,
  });
  return { projects, isGettingProjects };
}
