import DashboardCard from './DashboardCard';
import { Task } from '@/features/tasks/types';
import { StatusBadge } from '@/features/tasks/StatusBadge';
import { AvatarFallback, AvatarImage } from '@/ui/Avatar';
import { format } from 'date-fns';
import { Calendar, User } from 'lucide-react';
import Button from '@/ui/Button';
import { UpcomingTasksProps } from './types';
import { useNavigate, useParams } from 'react-router-dom';

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
                className={`p-4 rounded-lg border-2 cursor-pointer ${
                  isOverdue
                    ? 'border-red-200 bg-red-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
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
                      {task.assignee.avatar ? (
                        <AvatarImage
                          src={task.assignee.avatar}
                          className="h-5 w-5"
                        />
                      ) : (
                        <AvatarFallback className="h-5 w-5 text-xs">
                          {task.assignee.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
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
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                /* TODO: Navigate to all tasks view */
              }}
            >
              View All Tasks
            </Button>
          </div>
        </div>
      )}
    </DashboardCard>
  );
}
