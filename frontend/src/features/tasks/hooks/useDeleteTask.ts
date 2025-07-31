import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask as deleteTaskApi } from '@/api-client/task';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const { orgId } = useParams();

  const { mutate: deleteTask, isPending: isDeletingTask } = useMutation({
    mutationFn: (TaskId: string) => deleteTaskApi(TaskId, orgId as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allTasks'],
      });
      queryClient.invalidateQueries({
        queryKey: ['projectAnalytics'],
      });
      toast.success('Task deleted successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    deleteTask,
    isDeletingTask,
  };
}
