import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resetInviteCode } from '@/api-client/organisation';
import toast from 'react-hot-toast';

export const useResetInviteCode = () => {
  const queryClient = useQueryClient();

  const { mutate: resetCode, isPending: isResetting } = useMutation({
    mutationFn: (organisationId: string) => resetInviteCode(organisationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['organisation'],
      });
      queryClient.invalidateQueries({
        queryKey: ['members'],
      });
      toast.success('Invite code reset successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    resetInviteCode: resetCode,
    isResetting,
  };
};
