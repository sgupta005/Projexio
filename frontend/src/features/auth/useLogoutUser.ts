import { logoutUser as logoutUserApi } from '@/api-client/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useLogoutUser() {
  const queryClient = useQueryClient();
  const { mutate: logoutUser, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verifyLogin'] });
      toast.success('User logged out successfully.');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { logoutUser, isLoggingOut };
}
