import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProject } from '@/api-client/project';
import toast from 'react-hot-toast';

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProj, isPending: isUpdating } = useMutation({
    mutationFn: ({
      projectId,
      orgId,
      data,
    }: {
      projectId: string;
      orgId: string;
      data: FormData;
    }) => updateProject(projectId, orgId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['project'],
      });
      queryClient.invalidateQueries({
        queryKey: ['allProjects'],
      });
      toast.success('Project updated successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    updateProject: updateProj,
    isUpdating,
  };
};
