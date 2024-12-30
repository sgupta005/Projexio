import { cn } from '@/utils/helper';

function TruncatedText({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'overflow-hidden text-ellipsis whitespace-nowrap',
        className
      )}
    >
      {children}
    </span>
  );
}

export default TruncatedText;
