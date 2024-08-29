import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function AppLayout() {
  return (
    <div className="grid h-screen [grid-template-rows:60px_1fr] [grid-template-columns:auto_1fr]">
      <Sidebar />
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayout;
