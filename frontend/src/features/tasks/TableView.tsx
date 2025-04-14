import { AvatarFallback, AvatarImage } from '@/ui/Avatar';
import { format } from 'date-fns';
import { StatusBadge } from './StatusBadge';
import { Task } from './types';

export default function TableView({ tasks }: { tasks: Task[] }) {
  if (!tasks || tasks?.length === 0) return;
  return (
    <div className="overflow-x-hidden md:overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Task
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
            >
              Project
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
            >
              Assignee
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
            >
              Due Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks?.map((task: Task) => (
            <tr key={task._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {task.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                {task.projectName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={task.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                <div className="flex items-center">
                  {task.assignee.avatar ? (
                    <AvatarImage src={task.assignee.avatar} />
                  ) : (
                    <AvatarFallback>
                      {task.assignee.name.charAt(0)}
                    </AvatarFallback>
                  )}
                  <span className="ml-2 text-sm text-gray-900">
                    {task.assignee.name}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                {format(task.dueDate, 'MMM dd, yyyy')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
