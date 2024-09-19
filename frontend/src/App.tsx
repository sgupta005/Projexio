import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Tasks from './pages/Tasks';
import Organisations from './pages/Organisations';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './features/auth/ProtectedRoute';
import DisplayOrganisation from './features/organisations/DisplayOrganisation';
import CreateOrganisation from './features/organisations/CreateOrganisation';

function App() {
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
        >
          <Route index element={<DisplayOrganisation />} />
          <Route path="create" element={<CreateOrganisation />} />
        </Route>
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
