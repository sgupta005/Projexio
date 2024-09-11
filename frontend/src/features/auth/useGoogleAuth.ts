import { useGoogleLogin } from '@react-oauth/google';
import { useGoogleAuthQuery } from './useGoogleAuthQuery';
import toast from 'react-hot-toast';

export function useGoogleAuth() {
  const { googleLogin } = useGoogleAuthQuery();
  return useGoogleLogin({
    onSuccess: (authResult) => {
      googleLogin(authResult['code']);
    },
    onError: (error) => {
      console.error('Error while requesting google code.', error);
      toast.error('Error while requesting google code.');
    },
    flow: 'auth-code',
  });
}
