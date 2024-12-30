import { cn } from '@/utils/helper';

function DashedLine({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'border-b-2 border-dashed border-muted-foreground/20 w-full my-2',
        className
      )}
    />
  );
}

export default DashedLine;
