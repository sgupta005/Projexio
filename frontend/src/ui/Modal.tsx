import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import React, {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';

import { useOutsideClick } from '@/hooks/useOutsideClick';

interface ModalContextType {
  open: React.Dispatch<React.SetStateAction<string>>;
  close: () => void;
  openName: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }: { children: ReactElement; opens: string }) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('DropdownTrigger must be used within a Dropdown');
  }

  const { open } = context;
  return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ children, name }: { children: ReactElement; name: string }) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('Window must be used within a ModalContext provider');
  }
  const { close, openName } = context;
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-primary/60">
      <div
        ref={ref}
        className="fixed bottom-0 left-0 right-0 w-full rounded-t-lg bg-background p-4 shadow-lg
                     md:relative md:bottom-auto md:left-auto md:right-auto md:w-auto md:min-w-[300px]
                     md:rounded-md md:p-4 md:border"
      >
        {/* Close Button */}
        <div className="md:flex hidden">
          <button className="ml-auto" onClick={close}>
            <X className="size-4 text-muted-foreground" />
          </button>
        </div>

        {/* Drawer/Modal Content */}
        <div className="mt-4">
          {/* {children} */}
          {cloneElement(children, { onClose: close })}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
