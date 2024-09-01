import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Tasks from './pages/Tasks';
import Organisations from './pages/Organisations';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from './features/theme/ThemeProvider';

function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/organisations" element={<Organisations />} />
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="/tasks" replace={true} />} />
              <Route path="/tasks" element={<Tasks />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
export default App;
