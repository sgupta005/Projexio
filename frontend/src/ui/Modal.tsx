import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import React, {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
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

interface WindowPropTypes {
  children: ReactElement;
  name: string;
  heading?: string;
  subheading?: string;
}
function Window({ children, name, heading, subheading }: WindowPropTypes) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('Window must be used within a ModalContext provider');
  }
  const { close, openName } = context;
  const ref = useOutsideClick(close);

  const isOpen = openName === name;

  useEffect(() => {
    if (isOpen) {
      //disable scrolling
      document.body.style.overflow = 'hidden';
      //focus on first input
      // const firstInput = ref.current?.querySelector('input');
      // if (firstInput) {
      //   firstInput.focus();
      // }
    } else {
      //enable scrolling
      document.body.style.overflow = '';
    }
    //cleanup
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, ref]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/80">
      <div
        ref={ref}
        className="bg-background relative py-6 px-8 rounded-lg w-[90%] sm:w-max sm:min-w-[500px] max-h-[90%] overflow-auto no-scrollbar"
      >
        <div>
          {heading && <h1 className="text-xl font-bold">{heading}</h1>}
          {subheading && (
            <p className="text-sm text-muted-foreground ">{subheading}</p>
          )}
        </div>
        <button className="absolute right-4 top-4" onClick={close}>
          <X className="size-4 text-muted-foreground" />
        </button>

        <div className="mt-4">{cloneElement(children, { onClose: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
