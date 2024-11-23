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
import 'react-image-crop/dist/ReactCrop.css';
import Team from './pages/Team';
import ProjectSettings from './features/projects/ProjectSettings';
import Settings from './pages/Settings';

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
          <Route
            path=":orgId"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="tasks" replace={true} />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="team" element={<Team />} />
            <Route path="reports" element={<h1>Reports</h1>} />
            <Route path="settings" element={<Settings />} />
            <Route path="projects/:projectId" element={<ProjectSettings />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
