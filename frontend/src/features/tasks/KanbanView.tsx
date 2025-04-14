import {
  DndContext,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { Status, statuses, Task } from './types';
import { StatusBadge } from './StatusBadge';
import { useParams } from 'react-router-dom';
import { TaskCard } from './TaskCard';
import useSaveTaskPosition from './useSaveTaskPosition';
const columns = statuses;

export default function KanbanView({ tasks }: { tasks: Task[] }) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [items, setItems] = useState(tasks);
  const { projectId, orgId } = useParams<{
    projectId: string;
    orgId: string;
  }>();
  const { saveTaskPosition, isUpdating, updatingTaskId } =
    useSaveTaskPosition();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    if (isUpdating) return;

    const { active } = event;
    const task = items.find((t) => t._id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    if (isUpdating) return;

    const { active, over } = event;
    if (!over) return;

    const activeTask = items.find((t) => t._id === active.id);
    const overTask = items.find((t) => t._id === over.id);

    if (!activeTask || !overTask) return;

    const activeIndex = items.indexOf(activeTask);
    const overIndex = items.indexOf(overTask);

    let newItems;
    let statusChanged = false;
    let newStatus = overTask.status;

    // Update status if dropped in different column
    if (activeTask.status !== overTask.status) {
      statusChanged = true;
      newItems = arrayMove(items, activeIndex, overIndex).map((item) =>
        item._id === activeTask._id
          ? { ...item, status: overTask.status as Status }
          : item
      );
    } else {
      newItems = arrayMove(items, activeIndex, overIndex);
    }

    // Calculate new position
    const tasksInSameColumn = newItems.filter((t) => t.status === newStatus);
    const newPosition = tasksInSameColumn.findIndex(
      (t) => t._id === activeTask._id
    );

    setItems(newItems);
    setActiveTask(null);

    // Save the changes to the backend using the hook
    if (orgId && projectId) {
      saveTaskPosition({
        orgId,
        projectId,
        taskId: activeTask._id,
        status: newStatus,
        position: newPosition,
      });
    }
  };

  function handleDragOver(event: DragOverEvent) {
    if (isUpdating) return;

    const { active, over } = event;

    if (!over) return;

    const activeTask = items.find((t) => t._id === active.id);
    if (!activeTask) return;

    const isOverColumn = over?.data?.current?.type === 'Column';

    // Task is moved over a column (empty space)
    if (isOverColumn && over.data?.current?.status) {
      const overStatus = over.data.current.status as Status;

      if (activeTask.status !== overStatus) {
        setItems((items) => {
          const activeIndex = items.findIndex((t) => t._id === active.id);
          const newItems = [...items];
          newItems[activeIndex] = {
            ...newItems[activeIndex],
            status: overStatus,
          };
          return newItems;
        });
      }
    }
  }

  if (tasks.length > 0)
    return (
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div
          className={`m-auto flex w-full overflow-x-auto overflow-y-hidden gap-4 no-scrollbar ${
            isUpdating ? 'pointer-events-none opacity-70' : ''
          }`}
        >
          {columns.map((status: Status) => (
            <SortableContext items={columns} key={status}>
              <Column
                status={status}
                tasks={items.filter((t) => t.status === status)}
                updatingTaskId={updatingTaskId}
              />
            </SortableContext>
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
        </DragOverlay>
      </DndContext>
    );
}

function Column({
  status,
  tasks,
  updatingTaskId,
}: {
  status: Status;
  tasks: Task[];
  updatingTaskId: string | null;
}) {
  const taskIds = tasks.map((task) => task._id);
  const { setNodeRef } = useSortable({
    id: status,
    data: {
      type: 'Column',
      status,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col p-4 bg-muted rounded-lg h-[650px] min-w-[300px] "
    >
      <div className="flex h-[40px] gap-2">
        <StatusBadge status={status} className="text-base font-semibold" />
        <div className="rounded-full bg-background px-2 h-max font-semibold">
          {tasks.length}
        </div>
      </div>
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar">
          {tasks.map((task) => (
            <SortableTask
              key={task._id}
              task={task}
              isUpdating={updatingTaskId === task._id}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

function SortableTask({
  task,
  isUpdating,
}: {
  task: Task;
  isUpdating?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: {
      type: 'Task',
      task,
    },
    disabled: isUpdating,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={isUpdating ? 'relative' : ''}
    >
      {isUpdating && (
        <div className="absolute inset-0 bg-blue-100 bg-opacity-30 flex items-center justify-center z-10 rounded-lg">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <TaskCard
        task={task}
        isDragging={isDragging}
        dragHandleProps={isUpdating ? undefined : listeners}
      />
    </div>
  );
}
