import { useState, useMemo } from 'react';
import { Task, FilterState } from './types';
import { format } from 'date-fns';

export default function useTaskFilters(tasks: Task[]) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    project: null,
    assignee: null,
    dueDate: null,
  });

  const filteredTasks = useMemo(() => {
    // First filter the tasks
    const filtered = tasks.filter((task) => {
      // Search filter (case insensitive)
      if (
        filters.search &&
        !task.name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Status filter
      if (filters.status && task.status !== filters.status) {
        return false;
      }

      // Project filter
      if (filters.project && task.projectName !== filters.project) {
        return false;
      }

      // Assignee filter
      if (filters.assignee && task.assignee.name !== filters.assignee) {
        return false;
      }

      // Date filter
      if (filters.dueDate) {
        const taskDate = format(new Date(task.dueDate), 'yyyy-MM-dd');
        if (taskDate !== filters.dueDate) {
          return false;
        }
      }

      return true;
    });

    return filtered;
  }, [tasks, filters]);

  return {
    filters,
    setFilters,
    filteredTasks,
  };
}
