import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject as deleteProjectApi } from '@/api-client/project';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { orgId } = useParams();

  const { mutate: deleteProject, isPending: isDeleting } = useMutation({
    mutationFn: (projectId: string) =>
      deleteProjectApi(projectId, orgId as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allProjects'],
      });
      toast.success('Project deleted successfully');
      navigate(`/organisation/${orgId}`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    deleteProject,
    isDeleting,
  };
}
