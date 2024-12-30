import { ReactNode } from 'react';

function Card({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`gap-2 flex-col shadow-sm bg-background rounded-lg border w-full flex justify-center items-center cursor-pointer hover:bg-gray-50 h-40 xl:w-96 xl:h-32 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Card;
