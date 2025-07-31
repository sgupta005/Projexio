import React from 'react';
import useResize from '@/hooks/useResize';
import { useNavigate } from 'react-router-dom';
import SidebarLink from './SidebarLink';
import {
  ChevronsUpDown,
  CirclePlus,
  ClipboardList,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Users,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Logo from './Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CreateProject from '@/features/projects/components/CreateProject';
import ProjectList from '@/features/projects/components/ProjectList';
import useCurrentOrganisaiton from '@/features/organisations/hooks/useCurrentOrganisaiton';
import useGetAllProjects from '@/features/projects/hooks/useGetAllProjects';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PropTypes {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const routes = [
  { path: 'dashboard', name: 'Dashboard', icon: <Home /> },
  { path: 'my-tasks', name: 'My Tasks', icon: <ClipboardList /> },
  { path: 'team', name: 'Team', icon: <Users /> },
  { path: 'settings', name: 'Settings', icon: <Settings /> },
];

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: PropTypes) {
  const { isMobile } = useResize();
  if (isMobile)
    return (
      <div
        className={`relative z-20 h-screen bg-primary/70 ${
          isSidebarOpen ? 'w-screen' : 'w-0'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <SidebarContent
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    );
  else
    return (
      <SidebarContent
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    );
}

export function SidebarContent({ isSidebarOpen, setIsSidebarOpen }: PropTypes) {
  const { currentOrg, isGettingCurrentOrg } = useCurrentOrganisaiton();
  const { projects, isGettingProjects } = useGetAllProjects(
    currentOrg?._id as string
  );
  const navigate = useNavigate();

  if (isGettingCurrentOrg || isGettingProjects)
    return <SidebarContentSkeleton />;

  return (
    <div
      className={`tran md:fixed h-screen flex flex-col gap-2 p-4 md:pt-6 bg-muted ${
        isSidebarOpen
          ? 'w-[300px]'
          : 'md:w-[75px] w-0 overflow-hidden translate-x-[-40px] md:translate-x-0 '
      }`}
    >
      <>
        <div className="flex items-center gap-3 w-full min-h-10 relative">
          <Logo
            className={`tran ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          />
          <p
            className={`text-xl font-bold tran ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Projexio
          </p>
          <Button
            variant="ghost"
            size="icon"
            className={`hidden md:block md:absolute size-4 hover:bg-muted-foreground/15 cursor-pointer ${
              isSidebarOpen ? 'right-0' : 'right-3'
            }
            `}
            onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
          >
            {isSidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
          </Button>
        </div>

        <Separator />
        <div
          onClick={() => navigate('/organisation')}
          className={`flex items-center gap-4 py-2 rounded-md tran cursor-pointer px-2  ${
            isSidebarOpen ? 'mx-2' : ''
          }`}
        >
          {!isSidebarOpen ? (
            <Tooltip>
              <TooltipTrigger className="cursor-pointer">
                <Avatar>
                  <AvatarImage src={currentOrg?.avatar as string} />
                  <AvatarFallback>
                    {currentOrg?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right">{currentOrg?.name}</TooltipContent>
            </Tooltip>
          ) : (
            <Avatar>
              <AvatarImage src={currentOrg?.avatar as string} />
              <AvatarFallback>
                {currentOrg?.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
          <div
            className={`w-[65%] font-semibold text-md tran truncate ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {currentOrg?.name}
          </div>
          <ChevronsUpDown className="mr-0 ml-auto size-4  " />
        </div>

        <Separator />
        <div className={`space-y-2 tran h-max ${isSidebarOpen && 'mx-2'}`}>
          {routes.map((route) => (
            <SidebarLink to={route.path} key={route.name}>
              {!isSidebarOpen ? (
                <Tooltip>
                  <TooltipTrigger>
                    <span className="cursor-pointer">{route.icon}</span>
                  </TooltipTrigger>
                  <TooltipContent side="right">{route.name}</TooltipContent>
                </Tooltip>
              ) : (
                <span>{route.icon}</span>
              )}

              <div
                className={` tran w-full truncate ${
                  isSidebarOpen ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {route.name}
              </div>
            </SidebarLink>
          ))}
        </div>

        <Separator />
        <div className="flex items-center relative">
          <p
            className={`uppercase text-sm font-semibold  tran ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Projects
          </p>

          <CreateProject>
            <Button
              className={`md:absolute size-4 mr-0 ml-auto cursor-pointer ${
                isSidebarOpen ? 'right-0' : 'right-[calc((100%-16px)/2)]'
              }`}
              variant="ghost"
              size="icon"
            >
              <CirclePlus className="size-4" />
            </Button>
          </CreateProject>
        </div>

        <ProjectList isSidebarOpen={isSidebarOpen} projects={projects} />
      </>
    </div>
  );
}

const SidebarContentSkeleton = () => {
  return (
    <div
      className={`hidden md:flex bg-muted h-screen flex-col gap-8 p-4 w-[300px] pt-6 animate-pulse `}
    >
      <div className="flex items-center gap-3 ">
        {/* Logo */}
        <div className="size-10 rounded bg-muted-foreground/15" />
        {/* Title */}
        <div className="rounded bg-muted-foreground/15 h-6 w-28" />
      </div>

      {/* Change Organisation */}
      <div className="bg-muted-foreground/15 rounded h-12 " />

      {/* Routes */}
      <div className="h-max space-y-4 px-6 my-2">
        {[1, 2, 3, 4].map((i) => (
          <div className="bg-muted-foreground/15 h-8 rounded" key={i} />
        ))}
      </div>

      {/* Projects */}
      <div className="flex flex-col gap-2 ">
        {/* Title */}
        <div className="bg-muted-foreground/15 h-6 w-16 rounded" />
        {/* Projects List */}
        <div className="space-y-2 p-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2 rounded-lg animate-pulse"
            >
              <div className="size-8 rounded-sm bg-muted-foreground/15" />
              <div className="h-4 bg-muted-foreground/15 rounded w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
