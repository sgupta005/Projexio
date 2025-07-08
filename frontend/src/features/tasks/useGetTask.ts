import { getTaskById } from '@/api-client/task';
import { useQuery } from '@tanstack/react-query';

export default function useGetTask(
  orgId: string,
  projectId: string,
  taskId: string
) {
  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById(orgId, projectId, taskId),
    enabled: !!orgId && !!projectId && !!taskId,
  });

  return { task, isLoading, error };
}
