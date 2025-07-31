import { updateTaskStatus } from '@/api-client/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Status } from '../types';

export default function useSaveTaskPosition() {
  const queryClient = useQueryClient();
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      orgId,
      projectId,
      taskId,
      status,
      position,
    }: {
      orgId: string;
      projectId: string;
      taskId: string;
      status: Status;
      position: number;
    }) => {
      setUpdatingTaskId(taskId);
      return updateTaskStatus(orgId, projectId, taskId, status, position);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['allTasks', variables.projectId],
      });
      setUpdatingTaskId(null);
    },
    onError: (error) => {
      console.error('Failed to update task position:', error);
      setUpdatingTaskId(null);
    },
  });

  // Make sure we clear the updating task ID when the mutation is no longer pending
  if (!isPending && updatingTaskId) {
    setUpdatingTaskId(null);
  }

  const saveTaskPosition = (params: {
    orgId: string;
    projectId: string;
    taskId: string;
    status: Status;
    position: number;
  }) => {
    mutate(params);
  };

  return {
    saveTaskPosition,
    isUpdating: isPending,
    updatingTaskId,
  };
}
