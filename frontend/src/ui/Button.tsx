import { cn } from '@/utils/helper';

function Button({
  children,
  variant = 'primary',
  onClick,
  type,
  className,
  disabled,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 hover:opacity-90',
        {
          'text-primary bg-muted': variant === 'secondary',
          'text-background bg-primary ': variant === 'primary',
          'bg-background text-primary border hover:bg-muted':
            variant === 'outline',
          'bg-orange-600/90 text-yellow-50': variant === 'danger',
        },
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
