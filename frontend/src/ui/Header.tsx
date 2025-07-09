import { Dispatch, SetStateAction } from 'react';
import { PanelLeftOpen } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

function Header({
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { title, subTitle, showOnDesktop } = useSelector(
    (state: RootState) => state.header
  );
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
      <div className={`md:px-0 ${!showOnDesktop && 'md:hidden'}`}>
        {title && <p className="text-2xl font-bold ">{title}</p>}
        {subTitle && (
          <p className="text-primary/60 hidden md:block ">{subTitle}</p>
        )}
      </div>
    </div>
  );
}

export default Header;
