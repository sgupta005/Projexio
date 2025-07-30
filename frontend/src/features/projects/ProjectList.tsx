import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Project } from './types';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
      className={`overflow-scroll no-scrollbar mb-4 space-y-2 tran ${
        isSidebarOpen ? 'px-2' : ''
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
            <Tooltip>
              <TooltipTrigger className="cursor-pointer">
                <Avatar>
                  <AvatarImage src={project.avatar as string} />
                  <AvatarFallback className="bg-muted">
                    {project.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right">{project.name}</TooltipContent>
            </Tooltip>
          ) : (
            <Avatar>
              <AvatarImage src={project.avatar as string} />
              <AvatarFallback>
                {project.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}

          <div
            className={`text-muted-foreground font-semibold tran w-full truncate ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0'
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
