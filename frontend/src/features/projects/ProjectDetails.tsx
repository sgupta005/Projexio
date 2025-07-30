import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useCurrentProject from './useCurrentProject.ts';
import { LoadingSpinner } from '@/ui/LoadingSpinner.tsx';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useGetProjectAnalytics from './useGetProjectAnalytics';
import Analytics from '../dashboard/Analytics';
import useGetAllTasks from '../tasks/useGetAllTasks.ts';
import TaskTabs from '../tasks/TaskTabs.tsx';

function ProjectDetails() {
  const { currentProject, isGettingCurrentProject } = useCurrentProject();
  const navigate = useNavigate();
  const { analytics, isGettingAnalytics } = useGetProjectAnalytics(
    currentProject?.organisationId,
    currentProject?._id
  );
  const { tasks, isGettingTasks } = useGetAllTasks(
    currentProject?.organisationId,
    currentProject?._id
  );

  if (isGettingCurrentProject || isGettingAnalytics || isGettingTasks)
    return <LoadingSpinner />;
  return (
    <div className="px-6 space-y-6">
      <Analytics analytics={analytics} />
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={currentProject?.avatar as string} />
          <AvatarFallback>
            {currentProject?.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="truncate sm:not-truncate">{currentProject?.name}</div>
        <Button
          variant="outline"
          className="flex gap-1 items-center justify-center mr-0 ml-auto"
          onClick={() => navigate('settings')}
        >
          <Pencil className="size-4" />
          Edit Project
        </Button>
      </div>
      <TaskTabs tasks={tasks} />
    </div>
  );
}

export default ProjectDetails;
