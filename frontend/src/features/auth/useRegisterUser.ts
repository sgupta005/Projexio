import { registerUser as registerUserApi } from '@/api-client/auth';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useRegisterUsers() {
  const navigate = useNavigate();
  const { mutate: registerUser, isPending: isRegistering } = useMutation({
    mutationFn: registerUserApi,
    onError: (err: Error) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      navigate('/organisation');
    },
  });
  return { registerUser, isRegistering };
}
