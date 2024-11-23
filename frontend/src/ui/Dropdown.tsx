import { useOutsideClick } from '@/hooks/useOutsideClick';
import { ReactNode, useContext, useState } from 'react';
import { createContext } from 'react';

interface DropdownContextType {
  isOpen: boolean;
  toggleDropdown: () => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

function Dropdown({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const dropdownRef = useOutsideClick(() => setIsOpen(false));

  return (
    <DropdownContext.Provider value={{ isOpen, toggleDropdown }}>
      <div className="relative" ref={dropdownRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

function Trigger({ children }: { children: ReactNode }) {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('DropdownTrigger must be used within a Dropdown');
  }

  const { toggleDropdown } = context;

  return (
    <button className="" onClick={toggleDropdown}>
      {children}
    </button>
  );
}

function Menu({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('DropdownMenu must be used within a Dropdown');
  }

  const { isOpen } = context;

  if (isOpen)
    return (
      <div
        className={`bg-background border cursor-pointer rounded-md shadow-lg absolute z-20 w-max ${className}`}
      >
        {children}
      </div>
    );
}

function Title({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`font-semibold px-2 py-1 border-b ${className}`}>
      {children}
    </p>
  );
}

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

function Item({ children, onClick, className }: DropdownItemProps) {
  return (
    <div
      className={`flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-muted ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Title = Title;
Dropdown.Item = Item;

export default Dropdown;
