import { getUserTasksByOrganisation } from '@/api-client/task';
import { useQuery } from '@tanstack/react-query';

export default function useGetUserTasks(orgId: string, userId: string) {
  const {
    data: tasks,
    isLoading: isGettingTasks,
    error,
    refetch,
  } = useQuery({
    queryKey: ['userTasks', orgId, userId],
    queryFn: () => getUserTasksByOrganisation(orgId, userId),
    enabled: !!orgId && !!userId,
    retry: false,
  });

  return { tasks, isGettingTasks, error, refetch };
}
