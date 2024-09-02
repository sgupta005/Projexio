import { Navigate } from 'react-router-dom';
import { useAuthStore } from './authStore';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
