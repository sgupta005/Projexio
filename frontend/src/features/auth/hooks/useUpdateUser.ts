import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@/api-client/auth';
import toast from 'react-hot-toast';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUserMutation, isPending: isUpdating } = useMutation({
    mutationFn: (data: FormData) => updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      queryClient.invalidateQueries({
        queryKey: ['members'],
      });
      toast.success('Profile updated successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    updateUser: updateUserMutation,
    isUpdating,
  };
};
