import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Tasks from './pages/Tasks';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/tasks" replace={true} />} />
        <Route path="/tasks" element={<Tasks />} />
      </Route>
    </Routes>
  );
}
export default App;
