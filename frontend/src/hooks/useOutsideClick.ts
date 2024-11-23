import { useEffect, useRef } from 'react';

export function useOutsideClick(handler: () => void, useCapture = true) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(
    function () {
      function handleClick(e: Event) {
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
