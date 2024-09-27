import { Dispatch, SetStateAction } from 'react';
import { Button } from './shadcn/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

function Header({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const className = isSidebarOpen
    ? 'flex border py-4 [grid-column:2/3] [grid-row:1/2] px-4'
    : 'flex border py-4 [grid-column:1/3] [grid-row:1/2] px-4';
  return (
    <div className={className}>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
      >
        {isSidebarOpen ? <ArrowLeft /> : <ArrowRight />}
      </Button>
    </div>
  );
}

export default Header;
