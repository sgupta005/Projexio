import { useState } from 'react';
import { FilterState, statuses, TaskFiltersProps } from '../types';
import { RefreshCcwIcon, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';

export default function TaskFilters({
  tasks,
  onFilterChange,
  onSortChange,
}: TaskFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    project: null,
    assignee: null,
    dueDate: null,
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
      status: '',
      project: null,
      assignee: null,
      dueDate: null,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
    onSortChange('desc');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        {/* Search filter */}
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="search"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Date filter */}
        <div>
          <DatePicker
            date={filters.dueDate || null}
            onChange={(value) => handleFilterChange('dueDate', value)}
          />
        </div>
        {/* Status filter */}
        <div>
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Assignee filter */}
        <div>
          <Select
            value={filters.assignee || ''}
            onValueChange={(value) => handleFilterChange('assignee', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Assignee" />
            </SelectTrigger>
            <SelectContent>
              {assignees.map((assignee) => (
                <SelectItem key={assignee} value={assignee}>
                  {assignee}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        <Button variant="outline" onClick={handleReset}>
          <RefreshCcwIcon className="w-4 h-4 mr-2" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
