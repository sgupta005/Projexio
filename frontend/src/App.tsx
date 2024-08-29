import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Tasks from './pages/Tasks';
import Organisations from './pages/Organisations';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/organisations" element={<Organisations />} />
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/tasks" replace={true} />} />
        <Route path="/tasks" element={<Tasks />} />
      </Route>
    </Routes>
  );
}
export default App;
