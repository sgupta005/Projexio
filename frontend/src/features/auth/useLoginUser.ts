import { loginUser as loginUserApi } from '@/api-client/auth';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './authStore';

export function useLoginUser() {
  const navigate = useNavigate();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const { mutate: loginUser, isPending: islogging } = useMutation({
    mutationFn: loginUserApi,
    onError: (err: Error) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      setLoggedIn(true);
      navigate('/organisations');
    },
  });
  return { loginUser, islogging };
}
