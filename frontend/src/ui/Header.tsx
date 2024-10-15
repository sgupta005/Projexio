import { Dispatch, SetStateAction } from 'react';
import { Button } from './shadcn/ui/button';
import { MenuIcon, X } from 'lucide-react';

function Header({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex p-4 border">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
      >
        {isSidebarOpen ? <X /> : <MenuIcon />}
      </Button>
    </div>
  );
}

export default Header;
