import { Navigate, Outlet } from 'react-router-dom';
import Header from './Header';
import { useOrganisationStore } from '@/features/organisations/store';
import { useState } from 'react';
import Sidebar from './Sidebar';

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const currentOrganisation = useOrganisationStore(
    (state) => state.currentOrganisation
  );
  if (!currentOrganisation) return <Navigate to={'/organisations'} replace />;
  return (
    <div className="flex h-screen w-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <main className="flex flex-col h-screen flex-1">
        <Header
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="absolute -z-10 top-[75px] left-0 md:relative md:top-0 md:left-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
