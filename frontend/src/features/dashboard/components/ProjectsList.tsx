import { useParams, useNavigate } from 'react-router-dom';
import useGetAllProjects from '@/features/projects/hooks/useGetAllProjects';
import DashboardCard from './DashboardCard';
import { Project } from '@/features/projects/types';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FolderIcon, ArrowRightIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateProject from '@/features/projects/components/CreateProject';

export default function ProjectsList() {
  const { orgId } = useParams<{ orgId: string }>();
  const navigate = useNavigate();
  const { projects, isGettingProjects } = useGetAllProjects(orgId || '');

  if (isGettingProjects) {
    return (
      <DashboardCard title="Projects">
        <LoadingSpinner className="h-8 w-8" />
      </DashboardCard>
    );
  }

  const handleProjectClick = (projectId: string) => {
    navigate(`/organisation/${orgId}/project/${projectId}`);
  };

  return (
    <DashboardCard title={`Projects (${projects.length})`} className="relative">
      <CreateProject>
        <Button className={`absolute top-6 right-8`}>
          <Plus className="size-4" />
        </Button>
      </CreateProject>
      {!projects || projects.length === 0 ? (
        <div className="text-center py-6">
          <FolderIcon className="size-12 text-gray-800 mx-auto mb-3" />
          <p className="text-gray-500">No projects found</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {projects.map((project: Project) => (
            <div
              key={project._id}
              className="flex items-center justify-between p-3 rounded-lg border hover:border-primary hover:bg-background transition-colors cursor-pointer"
              onClick={() => handleProjectClick(project._id)}
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={project.avatar as string} />
                  <AvatarFallback>
                    {project.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  <p className="text-sm text-gray-500">Click to view details</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="flex items-center gap-1 h-8 px-3 text-sm"
              >
                View
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </DashboardCard>
  );
}
