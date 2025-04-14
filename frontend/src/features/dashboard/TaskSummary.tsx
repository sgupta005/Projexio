import { CheckCircle2, Clock, Inbox } from 'lucide-react';
import { Task } from '../tasks/types';

interface TaskSummaryProps {
  tasks: Task[];
}

export default function TaskSummary({ tasks }: TaskSummaryProps) {
  const completedTasks =
    tasks?.filter((task) => task.status === 'DONE').length || 0;
  const inProgressTasks =
    tasks?.filter((task) => ['IN_PROGRESS', 'IN_REVIEW'].includes(task.status))
      .length || 0;
  const pendingTasks =
    tasks?.filter((task) => ['TODO', 'BACKLOG'].includes(task.status)).length ||
    0;
  const totalTasks = tasks?.length || 0;

  const today = new Date();
  const threeDaysFromNow = new Date(today);
  threeDaysFromNow.setDate(today.getDate() + 3);

  const upcomingTasks =
    tasks
      ?.filter(
        (task) =>
          task.status !== 'DONE' && new Date(task.dueDate) <= threeDaysFromNow
      )
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      )
      .slice(0, 5) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Task Statistics */}
      <div className="lg:col-span-1 bg-white rounded-lg shadow-md border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Task Overview
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <Inbox className="w-6 h-6 text-blue-500 mr-3" />
              <span className="font-medium text-gray-700">Total Tasks</span>
            </div>
            <span className="text-xl font-bold text-blue-600">
              {totalTasks}
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle2 className="w-6 h-6 text-green-500 mr-3" />
              <span className="font-medium text-gray-700">Completed</span>
            </div>
            <span className="text-xl font-bold text-green-600">
              {completedTasks}
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-yellow-500 mr-3" />
              <span className="font-medium text-gray-700">In Progress</span>
            </div>
            <span className="text-xl font-bold text-yellow-600">
              {inProgressTasks}
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center">
              <Inbox className="w-6 h-6 text-purple-500 mr-3" />
              <span className="font-medium text-gray-700">Pending</span>
            </div>
            <span className="text-xl font-bold text-purple-600">
              {pendingTasks}
            </span>
          </div>
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Upcoming Tasks
        </h2>

        {upcomingTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <CheckCircle2 className="w-12 h-12 text-green-400 mb-3" />
            <p className="text-lg">All caught up!</p>
            <p className="text-sm">No upcoming tasks due soon</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingTasks.map((task) => {
              const dueDate = new Date(task.dueDate);
              const isOverdue = dueDate < today;
              const isToday = dueDate.toDateString() === today.toDateString();

              return (
                <div
                  key={task._id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    isOverdue
                      ? 'border-red-200 bg-red-50'
                      : isToday
                      ? 'border-yellow-200 bg-yellow-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">
                      {task.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {task.projectName}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 mr-3">
                      {task.assignee.avatar ? (
                        <img
                          src={task.assignee.avatar}
                          alt={task.assignee.name}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {task.assignee.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        isOverdue
                          ? 'text-red-600'
                          : isToday
                          ? 'text-yellow-600'
                          : 'text-blue-600'
                      }`}
                    >
                      {isOverdue
                        ? 'Overdue'
                        : isToday
                        ? 'Today'
                        : `Due ${dueDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
