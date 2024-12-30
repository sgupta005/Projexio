import { LogOutIcon } from 'lucide-react';
import { useLogoutUser } from './useLogoutUser';
import SpinnerMini from '@/ui/SpinnerMini';
import Button from '@/ui/Button';

function LogoutButton() {
  const { logoutUser, isLoggingOut } = useLogoutUser();
  return (
    <Button variant="outline" onClick={() => logoutUser()}>
      {isLoggingOut ? <SpinnerMini /> : <LogOutIcon />}
    </Button>
  );
}

export default LogoutButton;
