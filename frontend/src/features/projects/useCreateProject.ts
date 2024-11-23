import { createProject as createProjectApi } from '@/api-client/project';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useCreateProject() {
  const queryClient = useQueryClient();
  const { mutate: createProject, isPending: isCreatingProject } = useMutation({
    mutationFn: ({ data, orgId }: { data: FormData; orgId: string }) =>
      createProjectApi(data, orgId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allProjects'] });
      toast.success('Project created successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createProject, isCreatingProject };
}
