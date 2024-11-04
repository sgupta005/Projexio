import React from 'react';
import useResize from '@/hooks/useResize';
import { SidebarContent } from './SidebarContent';

interface PropTypes {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: PropTypes) {
  const { isMobile } = useResize();
  if (isMobile)
    return (
      <div
        className={`relative z-20 h-screen bg-muted-foreground/90 ${
          isSidebarOpen ? 'w-screen' : 'w-0'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <SidebarContent
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    );
  else
    return (
      <SidebarContent
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    );
}
