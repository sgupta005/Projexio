import { registerUser as registerUserApi } from '@/api-client/auth';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './authStore';

export function useRegisterUsers() {
  const navigate = useNavigate();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const { mutate: registerUser, isPending: isRegistering } = useMutation({
    mutationFn: registerUserApi,
    onError: (err: Error) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      setLoggedIn(true);
      navigate('/organisations');
    },
  });
  return { registerUser, isRegistering };
}
