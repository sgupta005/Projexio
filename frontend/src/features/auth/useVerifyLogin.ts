import { verifyLogin } from '@/api-client/auth';
import { useQuery } from '@tanstack/react-query';

export default function useVerifyLogin() {
  const { isError, isLoading: isVerifying } = useQuery({
    queryKey: ['verifyLogin'],
    queryFn: verifyLogin,
    retry: false,
  });
  return { isError, isVerifying };
}