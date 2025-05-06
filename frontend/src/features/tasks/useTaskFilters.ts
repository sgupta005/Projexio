import { useState, useMemo } from 'react';
import { SortDirection, Task, FilterState } from './types';

export default function useTaskFilters(tasks: Task[]) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'ALL',
    project: null,
    assignee: null,
  });

  const [sortByDate, setSortByDate] = useState<SortDirection>('none');

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
      if (filters.status !== 'ALL' && task.status !== filters.status) {
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

      return true;
    });

    // Then sort the filtered tasks
    if (sortByDate !== 'none') {
      return [...filtered].sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return sortByDate === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }

    return filtered;
  }, [tasks, filters, sortByDate]);

  return {
    filters,
    setFilters,
    filteredTasks,
    sortByDate,
    setSortByDate,
  };
}
