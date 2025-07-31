import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Task } from '../types';
import { useNavigate, useParams } from 'react-router-dom';

export function TaskCard({
  task,
  isDragging,
  dragHandleProps,
}: {
  task: Task;
  isDragging?: boolean;
  dragHandleProps?: any;
}) {
  const navigate = useNavigate();
  const { orgId } = useParams<{ orgId: string }>();

  function handleClick(e: React.MouseEvent) {
    // If we're dragging or if the click is on the drag handle area, don't navigate
    if (isDragging || (dragHandleProps && e.target === e.currentTarget)) return;

    navigate(`/organisation/${orgId}/task/${task._id}`);
  }

  return (
    <div
      className={`bg-background p-3 rounded-lg shadow-sm cursor-pointer ${
        isDragging && 'border-2 border-blue-500'
      }`}
      onClick={handleClick}
    >
      <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing">
        <div className="font-medium mb-2">{task.name}</div>
        <div className="text-sm text-gray-500 mb-2">{task.projectName}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={task.assignee.avatar as string} />
            <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="ml-2 text-sm">{task.assignee.name}</span>
        </div>
        <div className="text-sm text-gray-500">
          {format(new Date(task.dueDate), 'MMM dd')}
        </div>
      </div>
    </div>
  );
}
