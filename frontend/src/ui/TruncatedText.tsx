function TruncatedText({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`overflow-hidden text-ellipsis whitespace-nowrap ${className}`}
    >
      {children}
    </span>
  );
}

export default TruncatedText;
