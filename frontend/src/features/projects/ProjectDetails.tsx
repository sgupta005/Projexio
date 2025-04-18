import { AvatarFallback, AvatarImage } from '@/ui/Avatar';
import useCurrentProject from './useCurrentProject';
import { LoadingSpinner } from '@/ui/Spinner';
import Button from '@/ui/Button';
import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TaskTabs from '../tasks/TaskTabs';

function ProjectDetails() {
  const { currentProject, isGettingCurrentProject } = useCurrentProject();
  const navigate = useNavigate();

  if (isGettingCurrentProject) return <LoadingSpinner />;
  return (
    <div className="px-6 my-1">
      <div className="flex items-center gap-2">
        {currentProject?.avatar ? (
          <AvatarImage src={currentProject?.avatar} className="size-10" />
        ) : (
          <AvatarFallback className="rounded-sm bg-primary text-muted">
            {currentProject?.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        )}
        <div>{currentProject?.name}</div>
        <Button
          variant="outline"
          className="flex gap-1 items-center justify-center mr-0 ml-auto"
          onClick={() => navigate('settings')}
        >
          <Pencil className="size-4" />
          Edit Project
        </Button>
      </div>
      <TaskTabs />
    </div>
  );
}

export default ProjectDetails;
