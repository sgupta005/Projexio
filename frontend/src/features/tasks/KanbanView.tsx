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
import { AvatarFallback, AvatarImage } from '@/ui/Avatar';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { Status, statuses, Task } from './types';
import { StatusBadge } from './StatusBadge';
const columns = statuses;

export default function KanbanView({ tasks }: { tasks: Task[] }) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [items, setItems] = useState(tasks);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = items.find((t) => t._id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = items.find((t) => t._id === active.id);
    const overTask = items.find((t) => t._id === over.id);

    if (!activeTask || !overTask) return;

    const activeIndex = items.indexOf(activeTask);
    const overIndex = items.indexOf(overTask);

    let newItems = arrayMove(items, activeIndex, overIndex);

    // Update status if dropped in different column
    if (activeTask.status !== overTask.status) {
      newItems = newItems.map((item) =>
        item._id === activeTask._id
          ? { ...item, status: overTask.status as Status }
          : item
      );
    }

    setItems(newItems);
    setActiveTask(null);
  };

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    const activeTask = items.find((t) => t._id === active.id);
    const overTask = items.find((t) => t._id === over?.id);

    if (!activeTask || !overTask) return;

    const activeIndex = items.indexOf(activeTask);
    const overIndex = items.indexOf(overTask);

    const isOverColumn = over?.data?.current?.type === 'Column';
    const isOverTask = over?.data?.current?.type === 'Task';
    const isActiveTask = active.id === activeTask?._id;

    // task is moved over another column(empty)
    if (isOverColumn && isActiveTask) {
      setItems((items) => {
        const activeIndex = items.findIndex((t) => t._id === active.id);
        items[activeIndex].status = over?.data?.current?.status;
        return arrayMove(items, activeIndex, activeIndex);
      });
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
        <div className="m-auto flex w-full overflow-x-auto overflow-y-hidden gap-4 no-scrollbar">
          {columns.map((status: Status) => (
            <SortableContext items={columns}>
              <Column
                key={status}
                status={status}
                tasks={items.filter((t) => t.status === status)}
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

function Column({ status, tasks }: { status: Status; tasks: Task[] }) {
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
      className="flex flex-col p-4 bg-muted rounded-lg h-[445px] min-w-[300px] "
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
            <SortableTask key={task._id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

function SortableTask({ task }: { task: Task }) {
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
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <TaskCard
        task={task}
        isDragging={isDragging}
        dragHandleProps={listeners}
      />
    </div>
  );
}

export function TaskCard({
  task,
  isDragging,
  dragHandleProps,
}: {
  task: Task;
  isDragging?: boolean;
  dragHandleProps?: any;
}) {
  return (
    <div
      className={`bg-white p-3 rounded-lg shadow-sm ${
        isDragging && 'border-2 border-blue-500'
      }`}
    >
      <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing">
        <div className="font-medium mb-2">{task.name}</div>
        <div className="text-sm text-gray-500 mb-2">{task.projectName}</div>
      </div>
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
