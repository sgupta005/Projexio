import { useNavigate } from 'react-router-dom';
import SidebarLink from './SidebarLink';
import {
  ChevronsUpDown,
  CirclePlus,
  Folder,
  NotebookPen,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Users,
} from 'lucide-react';
import DashedLine from './DashedLine';
import Logo from './Logo';
import TruncatedText from './TruncatedText';
import { AvatarImage } from './Avatar';
import Modal from './Modal';
import CreateProject from '@/features/projects/CreateProject';
import ProjectList from '@/features/projects/ProjectList';
import Tooltip from './Tooltip';
import useCurrentOrganisaiton from '@/features/organisations/useCurrentOrganisaiton';
import { LoadingSpinner } from './Spinner';

const routes = [
  { path: 'tasks', name: 'My Work', icon: <Folder /> },
  { path: 'team', name: 'Team', icon: <Users /> },
  { path: 'reports', name: 'Reports', icon: <NotebookPen /> },
  { path: 'settings', name: 'Settings', icon: <Settings /> },
];

interface PropTypes {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SidebarContent({ isSidebarOpen, setIsSidebarOpen }: PropTypes) {
  const { currentOrg, isGettingCurrentOrg } = useCurrentOrganisaiton();
  const navigate = useNavigate();
  return (
    <div
      className={`tran bg-muted md:fixed h-screen flex flex-col gap-2 p-4 md:pt-6 ${
        isSidebarOpen
          ? 'w-[300px]'
          : 'md:w-[75px] w-0 overflow-hidden translate-x-[-40px] md:translate-x-0 '
      }`}
    >
      {isGettingCurrentOrg ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex items-center gap-3 w-full min-h-10 relative">
            <Logo
              className={`tran ${isSidebarOpen ? 'opacity-1' : 'opacity-0'}`}
            />
            <p
              className={`text-xl font-bold tran ${
                isSidebarOpen ? 'opacity-1' : 'opacity-0'
              }`}
            >
              Projexio
            </p>
            <button
              className={`hidden md:block md:absolute ${
                isSidebarOpen ? 'right-0' : 'right-2'
              }
            `}
              onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
            >
              {isSidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
            </button>
          </div>

          <DashedLine />
          <div
            onClick={() => navigate('/organisation')}
            className={`flex items-center gap-4 py-2 rounded-md tran cursor-pointer  ${
              isSidebarOpen
                ? 'bg-muted-foreground/15 mx-2 px-2 hover:bg-muted-foreground/25'
                : ''
            }`}
          >
            <AvatarImage
              src={currentOrg?.avatar}
              className={`rounded size-10`}
            />
            <TruncatedText
              className={`w-[65%] font-semibold text-md tran ${
                isSidebarOpen ? 'opacity-1' : 'opacity-0'
              }`}
            >
              {currentOrg?.name}
            </TruncatedText>
            <ChevronsUpDown className="mr-0 ml-auto size-4 text-gray-500 " />
          </div>

          <DashedLine />
          <div className={`space-y-2 tran h-max ${isSidebarOpen && 'mx-2'}`}>
            {routes.map((route) => (
              <SidebarLink to={route.path} key={route.name}>
                {!isSidebarOpen ? (
                  <Tooltip content={route.name}>
                    <span>{route.icon}</span>
                  </Tooltip>
                ) : (
                  <span>{route.icon}</span>
                )}

                <TruncatedText
                  className={` tran w-full ${
                    isSidebarOpen ? 'opacity-1' : 'opacity-0'
                  }`}
                >
                  {route.name}
                </TruncatedText>
              </SidebarLink>
            ))}
          </div>

          <DashedLine />
          <div className="flex items-center relative">
            <p
              className={`uppercase text-sm font-semibold text-muted-foreground tran ${
                isSidebarOpen ? 'opacity-1' : 'opacity-0'
              }`}
            >
              Projects
            </p>
            <Modal>
              <Modal.Open opens="createProject">
                <button
                  className={`md:absolute size-4 mr-0 ml-auto ${
                    isSidebarOpen ? 'right-0' : 'right-[calc((100%-16px)/2)]'
                  }`}
                >
                  <CirclePlus className="size-4" />
                </button>
              </Modal.Open>
              <Modal.Window name="createProject">
                <CreateProject />
              </Modal.Window>
            </Modal>
          </div>

          <ProjectList isSidebarOpen={isSidebarOpen} currentOrg={currentOrg} />
        </>
      )}
    </div>
  );
}
