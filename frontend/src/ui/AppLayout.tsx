import { Navigate, Outlet } from 'react-router-dom';
import Header from './Header';
import { useOrganisationStore } from '@/features/organisations/store';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import useResize from '@/hooks/useResize';
import { PanelLeftOpen } from 'lucide-react';

function AppLayout() {
  const [heading, setHeading] = useState({ title: '', subTitle: '' });

  const { isTablet } = useResize();
  const [isSidebarOpen, setIsSidebarOpen] = useState(isTablet ? false : true);

  const currentOrganisation = useOrganisationStore(
    (state) => state.currentOrganisation
  );

  useEffect(() => {
    setIsSidebarOpen(isTablet ? false : true);
  }, [isTablet]);
  if (!currentOrganisation) return <Navigate to={'/organisations'} replace />;
  return (
    <div className="h-screen bg-muted overflow-hidden">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main
        className={`tran absolute border md:top-4 top-0 md:shadow-md md:b-4 md:right-4 md:h-[calc(100vh-32px)] h-screen md:rounded-xl bg-background overflow-y-scroll no-scrollbar ${
          isSidebarOpen
            ? 'md:w-[calc(100%-316px)] md:left-[300px] w-screen'
            : 'md:w-[calc(100%-91px)] md:left-[75px] w-screen'
        }`}
      >
        <Header
          title={heading?.title}
          subTitle={heading?.subTitle}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <Outlet context={{ heading, setHeading }} />
      </main>
    </div>
  );
}

export default AppLayout;
