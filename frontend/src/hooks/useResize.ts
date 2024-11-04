import { useEffect, useState } from 'react';

export default function useResize() {
  const [size, setSize] = useState(window.innerWidth);

  const handleResize = () => {
    setSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const isMobile = size < 768;
  const isTablet = size < 1024;
  return { isMobile, isTablet };
}
