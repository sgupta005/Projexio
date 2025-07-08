import { useState } from 'react';
import {
  FilterState,
  SortDirection,
  statuses,
  TaskFiltersProps,
} from './types';
import { RefreshCcwIcon, SearchIcon } from 'lucide-react';
import Button from '@/ui/Button';
import Select from 'react-select';

export default function TaskFilters({
  tasks,
  onFilterChange,
  sortByDate,
  onSortChange,
}: TaskFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    project: null,
    assignee: null,
  });

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
      <div className="flex flex-wrap gap-4">
        {/* Status filter */}
        <div>
          <Select
            options={statuses.map((status) => ({
              value: status,
              label: status.replace('_', ' '),
            }))}
            value={
              filters.status
                ? {
                    value: filters.status,
                    label: filters.status.replace('_', ' '),
                  }
                : null
            }
            onChange={(selectedOption) =>
              handleFilterChange('status', selectedOption?.value || '')
            }
            placeholder="Select Status"
            isClearable={false}
          />
        </div>

        {/* Assignee filter */}
        <div>
          <Select
            options={assignees.map((assignee) => ({
              value: assignee,
              label: assignee,
            }))}
            value={
              filters.assignee
                ? {
                    value: filters.assignee,
                    label: filters.assignee,
                  }
                : null
            }
            onChange={(selectedOption) =>
              handleFilterChange('assignee', selectedOption?.value || null)
            }
            placeholder="Select Assignee"
            isClearable={false}
          />
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
              className="w-full pl-10 px-2 py-1.5 border border-gray-300 rounded-sm"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
        </div>

        {/* Sort by due date */}
        <div>
          <Select
            options={[
              { value: 'none', label: 'Default' },
              { value: 'asc', label: 'Earliest First' },
              { value: 'desc', label: 'Latest First' },
            ]}
            value={{
              value: sortByDate,
              label:
                sortByDate === 'none'
                  ? 'Default'
                  : sortByDate === 'asc'
                  ? 'Earliest First'
                  : 'Latest First',
            }}
            onChange={(selectedOption) =>
              onSortChange((selectedOption?.value as SortDirection) || 'none')
            }
            placeholder="Sort by Date"
            isClearable={false}
          />
        </div>
        {/* Reset Button */}
        <Button variant="outline" onClick={handleReset} className=" h-full">
          <RefreshCcwIcon className="w-4 h-4 mr-2" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
