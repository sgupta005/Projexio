import { cn } from '@/utils/helper';
import { LoaderCircle } from 'lucide-react';

export function LoadingSpinner({
  className,
  variant = 'default',
}: {
  className?: string;
  variant?: 'default' | 'small';
}) {
  if (variant === 'small')
    return (
      <LoaderCircle
        className={cn(
          'mx-auto flex animate-spin items-center justify-center',
          className
        )}
      />
    );
  return (
    <LoaderCircle
      className={cn(
        'mx-auto my-20 flex h-32 w-32 animate-spin items-center justify-center',
        className
      )}
    />
  );
}
