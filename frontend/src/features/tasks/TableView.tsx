import { AvatarFallback, AvatarImage } from '@/ui/Avatar';
import { format } from 'date-fns';
import { StatusBadge } from './StatusBadge';
import { Task } from './types';
import TaskFilters from './TaskFilters';
import useTaskFilters from './useTaskFilters';
import { ArrowDownIcon, ArrowUpIcon, Ellipsis, Trash2 } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';
import Dropdown from '@/ui/Dropdown';
import { useDeleteTask } from './useDeleteTask';
import ConfirmationModal from '@/ui/ConfirmationModal';
import { useNavigate, useParams } from 'react-router-dom';

export default function TableView({ tasks }: { tasks: Task[] }) {
  const navigate = useNavigate();
  const { orgId } = useParams();
  const { setFilters, filteredTasks, sortByDate, setSortByDate } =
    useTaskFilters(tasks || []);

  const handleSortClick = () => {
    setSortByDate((current) => (current === 'asc' ? 'desc' : 'asc'));
  };

  if (!tasks || tasks.length === 0) return null;

  return (
    <div className="space-y-6 mb-6 sm:mb-0">
      <TaskFilters
        tasks={tasks}
        onFilterChange={setFilters}
        sortByDate={sortByDate}
        onSortChange={setSortByDate}
      />

      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="py-16 text-center">
            <h3 className="mt-4 text-lg font-medium text-gray-700">
              No tasks found
            </h3>
            <p className="mt-1 text-gray-500">
              No tasks match your filter criteria
            </p>
          </div>
        ) : (
          <div className="overflow-x-hidden md:overflow-x-auto sm:max-h-[calc(100vh-465px)] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead>
                <tr className="bg-gray-50">
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Task
                  </th>
                  {/* <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell"
                  >
                    Project
                  </th> */}
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell"
                  >
                    Assignee
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell cursor-pointer hover:bg-gray-100"
                    onClick={handleSortClick}
                  >
                    <div className="flex items-center">
                      Due Date
                      <span className="ml-2">
                        {sortByDate === 'asc' ? (
                          <ArrowUpIcon className="w-4 h-4 text-blue-500" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 text-blue-500" />
                        )}
                      </span>
                    </div>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 ">
                {filteredTasks.map((task: Task, index) => (
                  <tr
                    key={task._id}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                    }`}
                    onClick={() =>
                      navigate(`/organisation/${orgId}/task/${task._id}`)
                    }
                  >
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-[100px]">
                        {task.name}
                      </div>
                    </td>
                    {/* <td className="px-6 py-2 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm text-gray-500 font-medium">
                        {task.projectName}
                      </div>
                    </td> */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap hidden sm:table-cell">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          {task.assignee.avatar ? (
                            <AvatarImage
                              src={task.assignee.avatar}
                              className="h-8 w-8 rounded-full"
                            />
                          ) : (
                            <AvatarFallback className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-600">
                                {task.assignee.name.charAt(0)}
                              </span>
                            </AvatarFallback>
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {task.assignee.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-500">
                        {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                      </div>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm text-gray-500 font-medium">
                        <TaskActions taskId={task._id} taskName={task.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function TaskActions({
  taskId,
  taskName,
}: {
  taskId: string;
  taskName: string;
}) {
  const { deleteTask, isDeletingTask } = useDeleteTask();

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling to table row
  };

  return (
    <div onClick={handleDropdownClick}>
      <Dropdown>
        <Dropdown.Trigger>
          <Ellipsis className="size-6 md:hidden" />
          <EllipsisVertical className="size-4 hidden md:block" />
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Title>Actions</Dropdown.Title>
          <ConfirmationModal
            isLoading={isDeletingTask}
            resourceType="task"
            resourceName={taskName}
            onConfirm={() => {
              deleteTask(taskId);
            }}
          >
            <Dropdown.Item className="text-red-500 text-sm">
              <span>
                <Trash2 className="size-4" />
              </span>
              <span>Remove Task</span>
            </Dropdown.Item>
          </ConfirmationModal>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
