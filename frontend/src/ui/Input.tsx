import { cn } from '@/utils/helper';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="text-muted-foreground font-semibold">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary',
            {
              'border-red-400': error,
              'border-gray-300': !error,
            },
            className
          )}
          {...props}
        />
        {error && <div className="text-red-400 text-sm">{error}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
