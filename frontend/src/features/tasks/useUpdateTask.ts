import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '@/api-client/task';
import toast from 'react-hot-toast';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: updateTaskMutation, isPending: isUpdating } = useMutation({
    mutationFn: ({
      orgId,
      projectId,
      taskId,
      data,
    }: {
      orgId: string;
      projectId: string;
      taskId: string;
      data: {
        name: string;
        description?: string;
        dueDate: string;
        assigneeId: string;
        status: string;
      };
    }) => updateTask(orgId, projectId, taskId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['task', variables.taskId],
      });
      queryClient.invalidateQueries({
        queryKey: ['allTasks', variables.projectId],
      });
      toast.success('Task updated successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    updateTask: updateTaskMutation,
    isUpdating,
  };
};
