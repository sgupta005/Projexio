import { useEffect, useRef } from 'react';

export function useOutsideClick(handler: () => void, useCapture = true) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(
    function () {
      function handleClick(e: Event) {
        // Check if click is inside any modal
        const modal = document.getElementById('modal-window');
        const isClickInsideModal = modal && modal.contains(e.target as Node);

        // If click is inside modal, ignore it
        if (isClickInsideModal) {
          return;
        }

        if (ref.current && !ref.current.contains(e.target as Node)) {
          handler();
        }
      }
      document.addEventListener('click', handleClick, useCapture);
      return () =>
        document.removeEventListener('click', handleClick, useCapture);
    },
    [handler, useCapture]
  );
  return ref;
}
