import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';
import Organisations from './pages/Organisations';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './features/auth/ProtectedRoute';
import DisplayOrganisation from './features/organisations/DisplayOrganisation';
import 'react-image-crop/dist/ReactCrop.css';
import Team from './pages/Team';
import Settings from './pages/Settings';
import Project from './pages/Project';
import ProjectSettings from './features/projects/ProjectSettings';

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          className: 'bg-primary text-background font-semibold',
        }}
      />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/organisation" replace={true} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/organisation"
          element={
            <ProtectedRoute>
              <Organisations />
            </ProtectedRoute>
          }
        >
          <Route index element={<DisplayOrganisation />} />
          <Route
            path=":orgId"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace={true} />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="team" element={<Team />} />
            <Route path="reports" element={<h1>Reports</h1>} />
            <Route path="settings" element={<Settings />} />
            <Route path="project/:projectId" element={<Project />} />
            <Route
              path="project/:projectId/settings"
              element={<ProjectSettings />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
