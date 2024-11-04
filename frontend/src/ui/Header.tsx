import { Dispatch, SetStateAction } from 'react';
import { Button } from './shadcn/ui/button';
import { MenuIcon, PanelLeftOpen, X } from 'lucide-react';

function Header({
  title,
  subTitle,
  setIsSidebarOpen,
}: {
  title: string;
  subTitle: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center w-full py-4 px-6 sticky top-0 bg-background z-10">
      {/* button to open sidebar on mobile */}
      <button
        className="md:hidden crusor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsSidebarOpen(true);
        }}
      >
        <PanelLeftOpen />
      </button>
      <div className="md:hidden h-6 mx-4 mt-1 w-[1px] bg-primary/20"></div>
      <div className="md:px-0 ">
        <p className="text-2xl md:text-xl font-semibold ">{title}</p>
        <p className="text-primary/60 hidden md:block">{subTitle}</p>
      </div>
    </div>
  );
}

export default Header;
