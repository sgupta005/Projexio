import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOrganisation } from '@/api-client/organisation';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useDeleteOrganisation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteOrg, isPending: isDeleting } = useMutation({
    mutationFn: (organisationId: string) => deleteOrganisation(organisationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allOrganisations'],
      });
      toast.success('Organisation deleted successfully');
      navigate('/organisation');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    deleteOrganisation: deleteOrg,
    isDeleting,
  };
};
