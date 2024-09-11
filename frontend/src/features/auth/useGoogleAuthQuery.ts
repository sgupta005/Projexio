import { googleAuth as googleAuthApi } from '@/api-client/auth';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useGoogleAuthQuery() {
  const navigate = useNavigate();
  const { mutate: googleLogin, isPending: isLoggingGoogle } = useMutation({
    mutationFn: googleAuthApi,
    onError: (err: Error) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      navigate('/organisations');
    },
  });
  return { googleLogin, isLoggingGoogle };
}
