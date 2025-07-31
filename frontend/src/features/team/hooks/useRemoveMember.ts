import { removeMember as removeMemberApi } from '@/api-client/organisation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useRemoveMember() {
  const queryClient = useQueryClient();
  const { mutate: removeMember, isPending: isRemovingMember } = useMutation({
    mutationFn: ({
      organisationId,
      memberId,
    }: {
      organisationId: string;
      memberId: string;
    }) => removeMemberApi(organisationId, memberId),
    onSuccess: () => {
      toast.success('Member removed successfully');
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { removeMember, isRemovingMember };
}
