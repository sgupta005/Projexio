import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Tasks from './pages/Tasks';
import Organisations from './pages/Organisations';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './features/auth/ProtectedRoute';
import useVerifyLogin from './features/auth/useVerifyLogin';
import { LoadingSpinner } from './ui/Spinner';
import { useEffect } from 'react';
import { useAuthStore } from './features/auth/authStore';

function App() {
  const { isVerifying, isError } = useVerifyLogin();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  useEffect(
    function () {
      if (!isError) setLoggedIn(true);
      else setLoggedIn(false);
    },
    [setLoggedIn, isError]
  );
  if (isVerifying) return <LoadingSpinner />;
  return (
    <>
      <Toaster
        toastOptions={{
          className: 'bg-primary text-background font-semibold',
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/organisations"
          element={
            <ProtectedRoute>
              <Organisations />
            </ProtectedRoute>
          }
        />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/tasks" replace={true} />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
