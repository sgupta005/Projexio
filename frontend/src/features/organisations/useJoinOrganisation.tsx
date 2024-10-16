import { joinOrganisation as joinOrganisationApi } from '@/api-client/organisation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useJoinOrganisation() {
  const queryClient = useQueryClient();
  const { mutate: joinOrganisation, isPending: isJoiningOrganisation } =
    useMutation({
      mutationFn: (inviteCode: string) => joinOrganisationApi(inviteCode),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['allOrganisations'] });
        toast.success('Organisation joind successfully');
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { joinOrganisation, isJoiningOrganisation };
}
