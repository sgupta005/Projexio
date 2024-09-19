import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useOrganisationStore } from '@/features/organisations/store';

function AppLayout() {
  const currentOrganisation = useOrganisationStore(
    (state) => state.currentOrganisation
  );
  if (!currentOrganisation) return <Navigate to={'/organisations'} replace />;
  return (
    <div className="grid h-screen [grid-template-rows:60px_1fr] [grid-template-columns:auto_1fr]">
      <Sidebar />
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayout;
