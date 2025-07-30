import DashboardCard from './DashboardCard';
import { Task } from '@/features/tasks/types';
import { StatusBadge } from '@/features/tasks/StatusBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Calendar, ClipboardList, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UpcomingTasksProps } from './types';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '@/utils/helper';
import { Status } from '@/features/tasks/types';

const colors: Record<Status, { border: string; hover: string }> = {
  BACKLOG: {
    border: 'border-orange-200 ',
    hover: 'hover:border-orange-600',
  },
  TODO: { border: 'border-blue-200 ', hover: 'hover:border-blue-600' },
  IN_PROGRESS: {
    border: 'border-yellow-200 ',
    hover: 'hover:border-yellow-600',
  },
  IN_REVIEW: { border: 'border-purple-200 ', hover: 'hover:border-purple-600' },
};

export default function UpcomingTasks({ tasks }: UpcomingTasksProps) {
  const navigate = useNavigate();
  const { orgId } = useParams();

  // Filter and sort upcoming tasks
  const upcomingTasks =
    tasks
      ?.filter((task: Task) => task.status !== 'DONE')
      ?.sort(
        (a: Task, b: Task) =>
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      ) || [];

  return (
    <DashboardCard title={`Upcoming Tasks (${upcomingTasks.length})`}>
      {upcomingTasks.length === 0 ? (
        <div className="text-center py-6">
          <ClipboardList className="size-12 mx-auto mb-3 text-gray-800" />
          <p className="text-gray-500">No upcoming tasks</p>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingTasks.slice(0, 3).map((task: Task) => {
            const isOverdue = new Date(task.dueDate) < new Date();
            return (
              <div
                key={task._id}
                onClick={() => {
                  navigate(`/organisation/${orgId}/task/${task._id}`);
                }}
                className={cn(
                  'p-4 rounded-lg border cursor-pointer',
                  isOverdue
                    ? 'border-red-200 bg-red-50 hover:border-red-500'
                    : colors[task.status].border,
                  !isOverdue && colors[task.status].hover
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 truncate">
                    {task.name}
                  </h4>
                  <StatusBadge status={task.status} className="ml-2" />
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span
                      className={isOverdue ? 'text-red-600 font-medium' : ''}
                    >
                      {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <div className="flex items-center gap-1">
                      <Avatar>
                        <AvatarImage src={task.assignee.avatar as string} />
                        <AvatarFallback>
                          {task.assignee.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{task.assignee.name}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">Project:</span>{' '}
                  {task.projectName}
                </div>
              </div>
            );
          })}

          <div className="">
            {upcomingTasks.length > 3 && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  /* TODO: Navigate to all tasks view */
                }}
              >
                View All Tasks
              </Button>
            )}
          </div>
        </div>
      )}
    </DashboardCard>
  );
}
