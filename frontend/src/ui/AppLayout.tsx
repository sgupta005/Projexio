import { Navigate, Outlet } from 'react-router-dom';
import Header from './Header';
import { useOrganisationStore } from '@/features/organisations/store';
import { useState } from 'react';
import Sidebar from './Sidebar';
import MainLayout from './MainLayout';

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const currentOrganisation = useOrganisationStore(
    (state) => state.currentOrganisation
  );
  const className = isSidebarOpen
    ? 'grid h-screen [grid-template-rows:75px_1fr] [grid-template-columns:auto_1fr]'
    : 'grid h-screen [grid-template-rows:75px_1fr] [grid-template-columns:1fr]';
  if (!currentOrganisation) return <Navigate to={'/organisations'} replace />;
  return (
    <div className={className}>
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <Header
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </div>
  );
}

export default AppLayout;
