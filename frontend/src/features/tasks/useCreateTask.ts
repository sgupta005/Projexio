import { CreateTaskFormFields } from '@/features/tasks/types';
import { createTask as createTaskApi } from '@/api-client/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateTask() {
  const queryClient = useQueryClient();

  const { mutate: createTask, isPending: isCreatingTask } = useMutation({
    mutationFn: (data: CreateTaskFormFields) => createTaskApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allTasks'] });
      toast.success('Task created successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createTask, isCreatingTask };
}
