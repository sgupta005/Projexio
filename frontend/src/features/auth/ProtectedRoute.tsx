import { Navigate } from 'react-router-dom';
import useVerifyLogin from './useVerifyLogin';
import { LoadingSpinner } from '@/ui/Spinner';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isVerifying } = useVerifyLogin();
  console.log(isLoggedIn, isVerifying);
  if (isVerifying) return <LoadingSpinner />;
  if (!isVerifying && !isLoggedIn) return <Navigate to="/login" />;
  return children;
}

export default ProtectedRoute;
