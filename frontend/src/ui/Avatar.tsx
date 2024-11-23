import { ReactNode } from 'react';

export function AvatarImage({
  src,
  className,
  fallbackSrc,
  altText,
}: {
  src?: string;
  className?: string;
  fallbackSrc?: string;
  altText?: string;
}) {
  return (
    <img
      className={`rounded ${className ? className : 'size-6'}`}
      src={src || fallbackSrc || 'https://github.com/shadcn.png'}
      alt={altText}
    />
  );
}

export function AvatarFallback({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center justify-center bg-muted py-2 px-4 rounded-full ${className}`}
    >
      {children}
    </div>
  );
}
