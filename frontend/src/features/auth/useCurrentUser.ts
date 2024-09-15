import { getCurrentUser } from '@/api-client/auth';
import { useQuery } from '@tanstack/react-query';

export default function useCurrentUser() {
  const { data: user, isLoading: isGettingUser } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: Infinity,
  });
  return { user, isGettingUser };
}
