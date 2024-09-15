import { Navigate } from 'react-router-dom';
import { LoadingSpinner } from '@/ui/Spinner';
import useCurrentUser from './useCurrentUser';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isGettingUser } = useCurrentUser();
  if (isGettingUser) return <LoadingSpinner />;
  if (!user)
    return (
      <Navigate
        to="/login"
        replace
        state={{ redirectUrl: window.location.pathname }}
      />
    );
  return children;
}

export default ProtectedRoute;
