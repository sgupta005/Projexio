import { registerUser as registerUserApi } from '@/api-client/auth';
import { useMutation } from 'react-query';

export function useRegisterUsers() {
  const { mutate: registerUser, isLoading: isRegistering } = useMutation({
    mutationFn: registerUserApi,
    onError: (err) => console.log(err),
  });
  return { registerUser, isRegistering };
}
