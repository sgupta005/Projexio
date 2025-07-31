import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrganisation } from '@/api-client/organisation';
import toast from 'react-hot-toast';

export const useUpdateOrganisation = () => {
  const queryClient = useQueryClient();

  const { mutate: updateOrg, isPending: isUpdating } = useMutation({
    mutationFn: ({
      organisationId,
      data,
    }: {
      organisationId: string;
      data: FormData;
    }) => updateOrganisation(organisationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['organisation'],
      });
      queryClient.invalidateQueries({
        queryKey: ['allOrganisations'],
      });
      toast.success('Organisation updated successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    updateOrganisation: updateOrg,
    isUpdating,
  };
};
