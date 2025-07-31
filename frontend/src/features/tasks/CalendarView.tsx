import { Calendar, dateFnsLocalizer, Views, View } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { enUS } from 'date-fns/locale/en-US';
import { Status } from './types';
import { useState } from 'react';
import { cn } from '@/utils/helper';
import { CalendarViewProps, EventCardProps } from './types';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar-view.css';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate, useParams } from 'react-router-dom';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const colors: Record<Status, { border: string; hover: string }> = {
  BACKLOG: {
    border: 'border-orange-200 ',
    hover: 'hover:border-orange-600',
  },
  TODO: { border: 'border-blue-200 ', hover: 'hover:border-blue-600' },
  IN_PROGRESS: {
    border: 'border-yellow-200 ',
    hover: 'hover:border-yellow-600',
  },
  IN_REVIEW: { border: 'border-purple-200 ', hover: 'hover:border-purple-600' },
};

export default function CalendarView({ tasks }: CalendarViewProps) {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>(Views.MONTH);

  // Convert tasks to calendar events format
  const events = tasks.map((task) => ({
    id: task._id,
    title: task.name,
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    assignee: task.assignee,
    status: task.status,
    resource: task,
    project: task.projectName,
  }));

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={date}
        view={view}
        views={{ month: true }}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        components={{
          eventWrapper: ({ event }) => (
            <EventCard
              id={event.id}
              title={event.title}
              status={event.status}
              assignee={event.assignee}
              project={event.project}
            />
          ),
        }}
      />
    </div>
  );
}

function EventCard({ id, title, status, assignee, project }: EventCardProps) {
  const navigate = useNavigate();
  const { orgId } = useParams<{ orgId: string }>();

  function handleClick() {
    navigate(`/organisation/${orgId}/task/${id}`);
    console.log(id);
  }
  return (
    <div className="px-2 ">
      <div
        className={cn(
          'p-1.5  text-xs border border-l-4 rounded-md flex flex-wrap gap-x-1.5 cursor-pointer hover:opacity-75 transition',
          colors[status].border
        )}
        onClick={handleClick}
      >
        <p className="truncate">{title}</p>
        <Avatar className="size-4">
          <AvatarImage src={assignee.avatar} alt={assignee.name} />
          <AvatarFallback className="bg-primary/20">
            {assignee.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <Avatar className="size-4 ">
          <AvatarFallback className="bg-blue-400 font-medium">
            {project.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
