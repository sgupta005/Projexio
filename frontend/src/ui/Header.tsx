import { Dispatch, SetStateAction } from 'react';
import { LogOut, PanelLeftOpen } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import useCurrentUser from '@/features/auth/useCurrentUser';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useLogoutUser } from '@/features/auth/useLogoutUser';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from './LoadingSpinner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
      <Button
        className="md:hidden crusor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsSidebarOpen(true);
        }}
        variant="ghost"
        size="icon"
      >
        <PanelLeftOpen />
      </Button>
      <div className="md:hidden h-6 mx-4 mt-1 w-px bg-primary/20"></div>
      <div className={`md:px-0 ${!showOnDesktop && 'md:hidden'}`}>
        {title && <p className="text-2xl font-bold ">{title}</p>}
        {subTitle && (
          <p className="text-primary/60 hidden md:block ">{subTitle}</p>
        )}
      </div>
      <div className="ml-auto">
        {isGettingUser ? (
          <LoadingSpinner variant="small" />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>
                  {user?.firstName?.charAt(0).toUpperCase()}
                  {user?.lastName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="text-red-400 "
                  onClick={() => logoutUser()}
                >
                  {isLoggingOut ? (
                    <LoadingSpinner variant="small" />
                  ) : (
                    <>
                      <LogOut className="size-4" />
                      Logout
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default Header;
