import { Dispatch, SetStateAction } from 'react';
import { LogOut, PanelLeftOpen } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import useCurrentUser from '@/features/auth/useCurrentUser';
import SpinnerMini from './SpinnerMini';
import { AvatarFallback } from './Avatar';
import Dropdown from './Dropdown';
import { useLogoutUser } from '@/features/auth/useLogoutUser';

function Header({
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { title, subTitle, showOnDesktop } = useSelector(
    (state: RootState) => state.header
  );
  const { user, isGettingUser } = useCurrentUser();
  const { logoutUser, isLoggingOut } = useLogoutUser();
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
      <div className="ml-auto">
        {isGettingUser ? (
          <SpinnerMini />
        ) : (
          <Dropdown>
            <Dropdown.Trigger>
              <AvatarFallback className="rounded-md size-10 font-semibold bg-muted cursor-pointer hover:opacity-80 transition-opacity">
                {user?.firstName?.charAt(0).toUpperCase()}
                {user?.lastName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item
                className="text-red-400"
                onClick={() => logoutUser()}
              >
                {isLoggingOut ? (
                  <SpinnerMini />
                ) : (
                  <>
                    <LogOut className="size-4" />
                    Logout
                  </>
                )}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
}

export default Header;
