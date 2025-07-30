import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import { Task } from './types';
import CreateTask from './CreateTask';
import TableView from './TableView';
import KanbanView from './KanbanView';

function TaskTabs({
  tasks,
  showProject = false,
  showAssigne = true,
  itemsPerPage = 6,
}: {
  tasks: Task[];
  showProject?: boolean;
  showAssigne?: boolean;
  itemsPerPage?: number;
}) {
  return (
    <Tabs defaultValue="table">
      <div className="flex items-center justify-between w-full">
        {tasks.length > 0 && (
          <TabsList>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
          </TabsList>
        )}
        <CreateTask className="ml-auto" />
      </div>
      {tasks.length > 0 ? (
        <>
          <TabsContent value="table">
            <TableView
              tasks={tasks}
              showAssigne={showAssigne}
              showProjectName={showProject}
              itemsPerPage={itemsPerPage}
            />
          </TabsContent>
          <TabsContent value="kanban">
            <KanbanView tasks={tasks} />
          </TabsContent>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-500 text-lg">No tasks available</p>
          <p className="text-gray-400 text-sm mt-1">
            Create a new task to get started
          </p>
        </div>
      )}
    </Tabs>
  );
}

export default TaskTabs;
