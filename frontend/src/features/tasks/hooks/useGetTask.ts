import { getTaskById } from '@/api-client/task';
import { useQuery } from '@tanstack/react-query';

export default function useGetTask(orgId: string, taskId: string) {
  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById(orgId, taskId),
    enabled: !!orgId && !!taskId,
  });

  return { task, isLoading, error };
}
