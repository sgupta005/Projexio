import { useOutsideClick } from '@/hooks/useOutsideClick';
import { cn } from '@/utils/helper';
import { ReactNode, useContext, useState, useEffect } from 'react';
import { createContext } from 'react';

interface DropdownContextType {
  isOpen: boolean;
  toggleDropdown: () => void;
  position: 'top' | 'bottom';
  setTriggerElement: (element: HTMLElement | null) => void;
  dropdownCoords: { top: number; left: number };
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

function Dropdown({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');
  const [dropdownCoords, setDropdownCoords] = useState({ top: 0, left: 0 });
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(
    null
  );

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const dropdownRef = useOutsideClick(() => setIsOpen(false));

  // Calculate position and coordinates when dropdown opens
  useEffect(() => {
    if (isOpen && triggerElement) {
      const triggerRect = triggerElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - triggerRect.bottom;
      // const spaceAbove = triggerRect.top;

      // Estimate dropdown height (you can adjust this value)
      const estimatedDropdownHeight = 200;

      // Use bottom position if there's enough space, otherwise use top
      const useBottomPosition = spaceBelow >= estimatedDropdownHeight;
      setPosition(useBottomPosition ? 'bottom' : 'top');

      // Calculate fixed positioning coordinates
      const top = useBottomPosition
        ? triggerRect.bottom + 4 // 4px margin below trigger
        : triggerRect.top - 4; // 4px margin above trigger (dropdown will grow upward)

      const left = triggerRect.right - 100; // Move 20px closer to trigger

      setDropdownCoords({ top, left });
    }
  }, [isOpen, triggerElement]);

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        toggleDropdown,
        position,
        setTriggerElement,
        dropdownCoords,
      }}
    >
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

  const { toggleDropdown, setTriggerElement } = context;

  return (
    <button
      className=""
      onClick={toggleDropdown}
      ref={(element) => setTriggerElement(element)}
    >
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

  const { isOpen, position, dropdownCoords } = context;

  if (isOpen) {
    return (
      <div
        className={cn(
          'bg-background border cursor-pointer rounded-md shadow-lg fixed z-50 w-max',
          position === 'top' ? 'origin-bottom' : 'origin-top',
          className
        )}
        style={{
          top: dropdownCoords.top,
          left: dropdownCoords.left,
          transform: position === 'top' ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        {children}
      </div>
    );
  }
}

function Title({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn('font-semibold px-3 py-2 border-b ', className)}>
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
      className={cn(
        'flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-muted transition-colors',
        className
      )}
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
