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
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`
            w-full rounded-md border border-input px-3 py-2 text-sm 
            focus:outline-none focus:ring-2 focus:ring-primary
            ${error ? 'border-red-400' : 'border-gray-300'}
            ${className}
          `}
          {...props}
        />
        {error && <div className="text-red-400 text-sm">{error}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
