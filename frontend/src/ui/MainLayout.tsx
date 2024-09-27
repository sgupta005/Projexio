import { ReactNode } from 'react';

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="absolute h-full top-20 -z-50 left-0 md:relative md:top-0 md:left-0 w-full">
      {children}
    </div>
  );
}

export default MainLayout;
