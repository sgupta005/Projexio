import { AvatarFallback, AvatarImage } from '@/ui/Avatar';
import { Project } from './types';
import Tooltip from '@/ui/Tooltip';
import { useNavigate, useParams } from 'react-router-dom';

function ProjectList({
  isSidebarOpen,
  projects,
}: {
  isSidebarOpen: boolean;
  projects: [Project];
}) {
  const { projectId } = useParams();
  const navigate = useNavigate();

  return (
    <div
      className={`overflow-scroll no-scrollbar mb-4 mt-2 space-y-2 tran ${
        isSidebarOpen ? 'px-4' : 'px-1'
      }  `}
    >
      {projects?.map((project: Project) => (
        <div
          className={`flex items-center gap-4 cursor-pointer border border-muted p-1 hover:bg-background hover:shadow-sm hover:rounded-md ${
            projectId === project._id && 'bg-background shadow-sm rounded-md'
          }`}
          onClick={() => {
            navigate(`project/${project._id}`);
          }}
          key={project._id}
        >
          {!isSidebarOpen ? (
            <Tooltip content={project.name}>
              {project.avatar ? (
                <AvatarImage className="size-8 min-w-8" src={project.avatar} />
              ) : (
                <AvatarFallback className="bg-primary size-8 text-background rounded-sm">
                  {project.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Tooltip>
          ) : project.avatar ? (
            <AvatarImage className="size-8 min-w-8" src={project.avatar} />
          ) : (
            <AvatarFallback className="bg-primary size-8 text-background rounded-sm">
              {project.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}

          <div
            className={`text-muted-foreground font-semibold tran w-full truncate ${
              isSidebarOpen ? 'opacity-1' : 'opacity-0'
            }`}
          >
            {project.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
