function DashedLine({ className }: { className?: string }) {
  return (
    <div
      className={`border-b-2 border-dashed border-muted-foreground/20 w-full my-2 ${className}`}
    />
  );
}

export default DashedLine;
