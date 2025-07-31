import { makeAdmin as makeAdminApi } from '@/api-client/organisation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useMakeAdmin() {
  const queryClient = useQueryClient();
  const { mutate: makeAdmin, isPending: isMakingAdmin } = useMutation({
    mutationFn: ({
      organisationId,
      memberId,
    }: {
      organisationId: string;
      memberId: string;
    }) => makeAdminApi(organisationId, memberId),
    onSuccess: () => {
      toast.success('Member promoted to admin successfully');
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { makeAdmin, isMakingAdmin };
}
