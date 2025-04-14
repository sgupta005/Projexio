import { useState } from 'react';
import { Status, statuses, Task } from './types';
import { SortDirection } from './useTaskFilters';
import { ChevronDownIcon, RefreshCcwIcon, SearchIcon } from 'lucide-react';

export type FilterState = {
  search: string;
  status: Status | 'ALL';
  project: string | null;
  assignee: string | null;
};

type TaskFiltersProps = {
  tasks: Task[];
  onFilterChange: (filters: FilterState) => void;
  sortByDate: SortDirection;
  onSortChange: (direction: SortDirection) => void;
};

export default function TaskFilters({
  tasks,
  onFilterChange,
  sortByDate,
  onSortChange,
}: TaskFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'ALL',
    project: null,
    assignee: null,
  });

  // Extract unique projects and assignees from tasks
  const projects = [...new Set(tasks.map((task) => task.projectName))];
  const assignees = [...new Set(tasks.map((task) => task.assignee.name))];

  const handleFilterChange = (field: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      search: '',
      status: 'ALL',
      project: null,
      assignee: null,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
    onSortChange('none');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end ">
        <button
          onClick={handleReset}
          className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 border border-gray-300 transition-colors flex items-center"
        >
          <RefreshCcwIcon className="w-4 h-4 mr-2" />
          Reset Filters
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Status filter */}
        <div>
          <div className="relative">
            <select
              id="status"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.replace('_', ' ')}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Assignee filter */}
        <div>
          <div className="relative">
            <select
              id="assignee"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
              value={filters.assignee || ''}
              onChange={(e) =>
                handleFilterChange('assignee', e.target.value || null)
              }
            >
              <option value="">All Assignees</option>
              {assignees.map((assignee) => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        {/* Search filter */}
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="search"
              placeholder="Search tasks..."
              className="w-full pl-10 px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
        </div>

        {/* Sort by due date */}
        <div>
          <div className="relative">
            <select
              id="sortByDate"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
              value={sortByDate}
              onChange={(e) => onSortChange(e.target.value as SortDirection)}
            >
              <option value="none">Default</option>
              <option value="asc">Earliest First</option>
              <option value="desc">Latest First</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
