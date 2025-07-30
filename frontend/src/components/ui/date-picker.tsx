'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function DatePicker({
  className,
  date,
  onChange,
  modal,
}: {
  className?: string;
  date: Date | null;
  onChange: (date: Date) => void;
  modal?: boolean;
}) {
  return (
    <Popover modal={modal}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          data-empty={!date}
          className={cn(
            'data-[empty=true]:text-muted-foreground justify-start text-left font-normal',
            className
          )}
        >
          <CalendarIcon />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date as unknown as Date}
          onSelect={onChange}
          required
        />
      </PopoverContent>
    </Popover>
  );
}
