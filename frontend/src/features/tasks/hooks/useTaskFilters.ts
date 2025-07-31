import { useState, useMemo } from 'react';
import { SortDirection, Task, FilterState } from '../types';
import { format } from 'date-fns';

export default function useTaskFilters(tasks: Task[]) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    project: null,
    assignee: null,
    dueDate: null,
  });

  const [sortByDate, setSortByDate] = useState<SortDirection>('desc');

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
        const filterDate = format(new Date(filters.dueDate), 'yyyy-MM-dd');
        if (taskDate !== filterDate) {
          return false;
        }
      }

      return true;
    });

    // Always sort the filtered tasks
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortByDate === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [tasks, filters, sortByDate]);

  return {
    filters,
    setFilters,
    filteredTasks,
    sortByDate,
    setSortByDate,
  };
}
