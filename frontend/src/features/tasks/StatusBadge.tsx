import { cn } from '@/utils/helper';
import { Status } from './types';

export const colors: Record<Status, string> = {
  BACKLOG: 'bg-orange-100 text-yellow-900',
  TODO: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
  IN_REVIEW: 'bg-purple-100 text-purple-800',
  DONE: 'bg-green-100 text-green-800',
};

export const StatusBadge = ({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full h-max ',
        colors[status],
        className
      )}
    >
      {status.replace('_', ' ')}
    </span>
  );
};
