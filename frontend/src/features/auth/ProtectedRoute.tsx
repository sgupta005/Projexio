import { Navigate } from 'react-router-dom';
import useVerifyLogin from './useVerifyLogin';
import { LoadingSpinner } from '@/ui/Spinner';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isVerifying } = useVerifyLogin();
  if (isVerifying) return <LoadingSpinner />;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
