import { getAllTasks } from '@/api-client/task';
import { useQuery } from '@tanstack/react-query';

export default function useGetAllTasks(orgId: string, projectId: string) {
  const { data: tasks, isLoading: isGettingTasks } = useQuery({
    queryKey: ['allTasks', projectId],
    queryFn: () => getAllTasks(projectId, orgId),
    enabled: !!orgId && !!projectId,
    retry: false,
  });
  return { tasks, isGettingTasks };
}
