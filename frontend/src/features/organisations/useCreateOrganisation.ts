import { createOrganisation as createOrganisationApi } from '@/api-client/organisation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Organisation } from './SelectOrganisation';

export default function useCreateOrganisation() {
  const queryClient = useQueryClient();
  const { mutate: createOrganisation, isPending: isCreatingOrganisation } =
    useMutation({
      mutationFn: (data: Organisation) => createOrganisationApi(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['allOrganisations'] });
        toast.success('Organisation created successfully');
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { createOrganisation, isCreatingOrganisation };
}
