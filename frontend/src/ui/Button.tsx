function Button({
  children,
  variant = 'primary',
  onClick,
  type,
  className,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 hover:opacity-90 ${
        variant === 'secondary' && 'text-primary bg-muted'
      } ${variant === 'primary' && 'text-background bg-primary '} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
