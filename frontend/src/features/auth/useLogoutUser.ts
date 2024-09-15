import { logoutUser as logoutUserApi } from '@/api-client/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogoutUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logoutUser, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/login');
      toast.success('User logged out successfully.');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { logoutUser, isLoggingOut };
}
