import { verifyLogin } from '@/api-client/auth';
import { useQuery } from '@tanstack/react-query';

export default function useVerifyLogin() {
  const {
    isError,
    isLoading: isVerifying,
    data: userId,
  } = useQuery({
    queryKey: ['verifyLogin'],
    queryFn: verifyLogin,
    retry: false,
  });
  return { isLoggedIn: !isError, isVerifying, userId };
}
