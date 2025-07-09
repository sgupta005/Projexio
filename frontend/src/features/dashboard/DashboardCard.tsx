import { cn } from '@/utils/helper';
import { DashboardCardProps } from './types';

export default function DashboardCard({
  title,
  children,
  className,
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        'bg-background border border-gray-200 rounded-lg p-6 shadow-sm',
        className
      )}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}
