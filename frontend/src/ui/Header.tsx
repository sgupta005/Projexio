import { Dispatch, SetStateAction } from 'react';
import { LogOut, PanelLeftOpen, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import useCurrentUser from '@/features/auth/hooks/useCurrentUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLogoutUser } from '@/features/auth/hooks/useLogoutUser';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from './LoadingSpinner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate, useParams } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { orgId } = useParams();
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
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>
                  {user?.firstName?.charAt(0).toUpperCase()}
                  {user?.lastName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-6 md:mr-10 w-52">
              <DropdownMenuGroup className="px-10 flex flex-col items-center py-4">
                <Avatar>
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>
                    {user?.firstName?.charAt(0).toUpperCase()}
                    {user?.lastName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {user.firstName} {user.lastName}
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate(`/organisation/${orgId}/profile`)}
                >
                  <User className="size-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => logoutUser()}
                >
                  {isLoggingOut ? (
                    <LoadingSpinner variant="small" />
                  ) : (
                    <>
                      <LogOut className="size-4 text-red-400" />
                      <span className="text-red-400">Logout</span>
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
