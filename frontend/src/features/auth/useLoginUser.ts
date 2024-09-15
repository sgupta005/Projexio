import { loginUser as loginUserApi } from '@/api-client/auth';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useLoginUser() {
  const navigate = useNavigate();
  const { mutate: loginUser, isPending: islogging } = useMutation({
    mutationFn: loginUserApi,
    onError: (err: Error) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      navigate('/organisations');
    },
  });
  return { loginUser, islogging };
}
