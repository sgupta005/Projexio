import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { StatusBadge } from './StatusBadge';
import { Task } from '../types';
import TaskFilters from './TaskFilters';
import useTaskFilters from '../hooks/useTaskFilters';
import { ArrowDownIcon, ArrowUpIcon, Ellipsis, Trash2 } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useDeleteTask } from '../hooks/useDeleteTask';
import ConfirmationDialog from '@/ui/ConfirmationDialog';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState, useMemo } from 'react';

export default function TableView({
  tasks,
  itemsPerPage = 6,
  showProjectName = false,
  showAssigne = true,
}: {
  tasks: Task[];
  itemsPerPage?: number;
  showProjectName?: boolean;
  showAssigne?: boolean;
}) {
  const navigate = useNavigate();
  const { orgId } = useParams();
  const { setFilters, filteredTasks, sortByDate, setSortByDate } =
    useTaskFilters(tasks || []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const handleSortClick = () => {
    setSortByDate((current) => (current === 'asc' ? 'desc' : 'asc'));
  };

  // Reset to first page when filters change
  const handleFilterChange = (filters: any) => {
    setCurrentPage(1);
    setFilters(filters);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = filteredTasks.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  if (!tasks || tasks.length === 0) return null;

  return (
    <div className="space-y-6 mb-6 sm:mb-0">
      <TaskFilters
        tasks={tasks}
        onFilterChange={handleFilterChange}
        sortByDate={sortByDate}
        onSortChange={setSortByDate}
      />

      <div className="rounded-lg shadow-md border overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="py-16 text-center">
            <h3 className="mt-4 text-lg font-medium">No tasks found</h3>
            <p className="mt-1">No tasks match your filter criteria</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  {showProjectName && <TableHead>Project</TableHead>}
                  <TableHead>Status</TableHead>
                  {showAssigne && <TableHead>Assignee</TableHead>}
                  <TableHead
                    className="flex items-center"
                    onClick={handleSortClick}
                  >
                    Due Date
                    <span className="ml-2">
                      {sortByDate === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 text-blue-500" />
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 text-blue-500" />
                      )}
                    </span>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTasks.map((task: Task) => (
                  <TableRow
                    key={task._id}
                    onClick={() =>
                      navigate(`/organisation/${orgId}/task/${task._id}`)
                    }
                    className="cursor-pointer"
                  >
                    <TableCell>{task.name}</TableCell>
                    {showProjectName && (
                      <TableCell>{task.projectName}</TableCell>
                    )}
                    <TableCell>
                      <StatusBadge status={task.status} />
                    </TableCell>
                    {showAssigne && (
                      <TableCell className="flex items-center">
                        <Avatar>
                          <AvatarImage src={task.assignee.avatar as string} />
                          <AvatarFallback>
                            {task.assignee.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{task.assignee.name}</span>
                      </TableCell>
                    )}
                    <TableCell>
                      {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      <TaskActions taskId={task._id} taskName={task.name} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to{' '}
                    {Math.min(endIndex, filteredTasks.length)} of{' '}
                    {filteredTasks.length} results
                  </div>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage(Math.max(1, currentPage - 1))
                          }
                          className={
                            currentPage === 1
                              ? 'pointer-events-none opacity-50'
                              : 'cursor-pointer'
                          }
                        />
                      </PaginationItem>

                      {pageNumbers.map((page, index) => (
                        <PaginationItem key={index}>
                          {page === '...' ? (
                            <span className="px-3 py-2 text-gray-500">...</span>
                          ) : (
                            <PaginationLink
                              onClick={() => setCurrentPage(page as number)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage(
                              Math.min(totalPages, currentPage + 1)
                            )
                          }
                          className={
                            currentPage === totalPages
                              ? 'pointer-events-none opacity-50'
                              : 'cursor-pointer'
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            )}
          </>
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis className="size-6 md:hidden cursor-pointer" />
        <EllipsisVertical className="size-4 hidden md:block cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <ConfirmationDialog
          isLoading={isDeletingTask}
          resourceType="task"
          resourceName={taskName}
          onConfirm={() => {
            deleteTask(taskId);
          }}
        >
          <DropdownMenuGroup>
            <DropdownMenuItem className="text-red-500 text-sm">
              <span>
                <Trash2 className="size-4" />
              </span>
              <span>Remove Task</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </ConfirmationDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
