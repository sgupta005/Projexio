import { RootState } from '@/store';
import { AvatarFallback, AvatarImage } from '@/ui/Avatar';
import TruncatedText from '@/ui/TruncatedText';
import { useSelector } from 'react-redux';
import useGetAllProjects from './useGetAllProjects';
import { Project } from './types';
import Tooltip from '@/ui/Tooltip';

function ProjectList({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const currentOrg = useSelector(
    (state: RootState) => state.organisation.currentOrganisation
  );
  const { projects } = useGetAllProjects(currentOrg?._id as string);
  return (
    <div
      className={`overflow-scroll no-scrollbar mb-4 mt-2 space-y-2 tran ${
        isSidebarOpen ? 'px-4' : 'px-1'
      }  `}
    >
      {projects?.map((project: Project) => (
        <div className="flex items-center gap-4 cursor-pointer ">
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

          <TruncatedText
            className={`text-muted-foreground font-semibold tran w-full ${
              isSidebarOpen ? 'opacity-1' : 'opacity-0'
            }`}
          >
            {project.name}
          </TruncatedText>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
