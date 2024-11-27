import { AvatarFallback, AvatarImage } from '@/ui/Avatar';
import { format } from 'date-fns';
import { Task } from './TaskTabs';

export default function KanbanView({ tasks }: { tasks: Task[] }) {}

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
      <div className="font-medium mb-2">{task.name}</div>
      <div className="text-sm text-gray-500 mb-2">{task.projectName}</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {task.assignee.avatar ? (
            <AvatarImage src={task.assignee.avatar} className="size-6" />
          ) : (
            <AvatarFallback className="size-6">
              {task.assignee.name.charAt(0)}
            </AvatarFallback>
          )}
          <span className="ml-2 text-sm">{task.assignee.name}</span>
        </div>
        <div className="text-sm text-gray-500">
          {format(task.dueDate, 'MMM dd')}
        </div>
      </div>
    </div>
  );
}
