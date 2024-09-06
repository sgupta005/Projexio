import { Button } from '@/ui/shadcn/ui/button';
import { LogOutIcon } from 'lucide-react';
import { useLogoutUser } from './useLogoutUser';
import SpinnerMini from '@/ui/SpinnerMini';

function LogoutButton() {
  const { logoutUser, isLoggingOut } = useLogoutUser();
  return (
    <Button size="icon" variant="outline" onClick={() => logoutUser()}>
      {isLoggingOut ? <SpinnerMini /> : <LogOutIcon />}
    </Button>
  );
}

export default LogoutButton;
