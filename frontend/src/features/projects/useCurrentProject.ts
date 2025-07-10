import { getCurrentProject } from '@/api-client/project';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function useCurrentProject() {
  const { orgId, projectId } = useParams();
  const { data: currentProject, isLoading: isGettingCurrentProject } = useQuery(
    {
      queryKey: ['Project', projectId],
      queryFn: () => getCurrentProject(orgId as string, projectId as string),
      retry: false,
      staleTime: Infinity,
    }
  );
  return { currentProject, isGettingCurrentProject };
}
