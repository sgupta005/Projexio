import { useState } from 'react';
import TableView from './TableView';
import KanbanView from './KanbanView';
import CreateTask from './CreateTask';
import useGetAllTasks from './useGetAllTasks';
import { useParams } from 'react-router-dom';

export type Task = {
  _id: string;
  name: string;
  projectName: string;
  status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
  assignee: {
    _id: string;
    name: string;
    avatar?: string;
  };
  dueDate: Date;
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <p className="text-gray-500 text-lg">No tasks available</p>
    <p className="text-gray-400 text-sm mt-1">
      Create a new task to get started
    </p>
  </div>
);

export default function TaskTabs() {
  const [activeTab, setActiveTab] = useState<'table' | 'kanban' | 'calendar'>(
    'table'
  );
  const { orgId, projectId } = useParams();
  const { tasks, isGettingTasks } = useGetAllTasks(
    orgId as string,
    projectId as string
  );

  return (
    <div className="mt-6">
      <div className="border-b border-gray-200 flex justify-between">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {['table', 'kanban'].map((tab) => (
            <button
              key={tab}
              className={`
                capitalize py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
              onClick={() => setActiveTab(tab as typeof activeTab)}
            >
              {tab}
            </button>
          ))}
        </nav>
        <CreateTask />
      </div>

      <div className="mt-4">
        {(!tasks || tasks?.length === 0) && <EmptyState />}
        {activeTab === 'table' && <TableView tasks={tasks} />}
        {/* {activeTab === 'kanban' && <KanbanView tasks={tasks} />} */}
        {/* {activeTab === 'calendar' && <CalendarView />} */}
      </div>
    </div>
  );
}
