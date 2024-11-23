import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

function Tooltip({
  children,
  content,
}: {
  children: ReactNode;
  content: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCoords({
      top: rect.top + window.scrollY + rect.height / 2, // Center vertically
      left: rect.left + window.scrollX + rect.width, // Position to the right
    });
    setIsVisible(true);
  };

  const handleMouseLeave = () => setIsVisible(false);

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}

      {isVisible &&
        createPortal(
          <div
            style={{
              position: 'absolute',
              top: coords.top,
              left: coords.left + 13, // Add some spacing to the right
              transform: 'translateY(-50%)', // Center vertically
              zIndex: 50,
            }}
            className="bg-primary opacity-85 px-2 py-1 rounded-sm text-background shadow-lg"
          >
            {content}
          </div>,
          document.body
        )}
    </div>
  );
}

export default Tooltip;
