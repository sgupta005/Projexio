import {
  Folder,
  Layers,
  NotebookPen,
  Plus,
  Settings,
  Users,
} from 'lucide-react';
import SidebarLink from './SidebarLink';
import { Card } from './shadcn/ui/card';
import { useOrganisationStore } from '@/features/organisations/store';
import { Avatar, AvatarFallback, AvatarImage } from './shadcn/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const routes = [
  { path: '', name: 'My Work', icon: <Folder /> },
  { path: '', name: 'Reports', icon: <NotebookPen /> },
  {
    path: '',
    name: 'Projects',
    icon: <Layers />,
    button: (
      <button className="mr-0 ml-auto p-0">
        <Plus />
      </button>
    ),
  },
  { path: '', name: 'Team', icon: <Users /> },
  { path: '', name: 'Settings', icon: <Settings /> },
];

export default function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const currentOrg = useOrganisationStore((state) => state.currentOrganisation);
  const navigate = useNavigate();
  const className = isSidebarOpen
    ? `relative border-r bg-background h-full`
    : 'overflow-hidden absolute bg-background h-full';
  return (
    <motion.div
      animate={{
        width: isSidebarOpen ? '300px' : '0px',
        transition: {
          duration: 0.4,
        },
      }}
      className={className}
    >
      <div className="flex flex-col gap-2 h-full">
        <Card
          onClick={() => navigate('/organisations')}
          className="w-[88%] h-[150px] mx-auto mt-4 flex flex-col gap-2 text-lg cursor-pointer justify-center items-center hover:bg-accent"
        >
          <Avatar className="size-14">
            {currentOrg?.avatar ? (
              <AvatarImage src={currentOrg.avatar}></AvatarImage>
            ) : (
              <AvatarImage src="https://github.com/shadcn.png" />
            )}
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>{currentOrg?.name}</p>
        </Card>
        <div className="flex-1">
          <nav className="grid items-start space-y-2 mt-3 px-2 text-md font-medium lg:px-4">
            {routes.map((route) => (
              <SidebarLink to={route.path}>
                {route.icon}
                {route.name}
                {route.button && route.button}
              </SidebarLink>
            ))}
          </nav>
        </div>
        <Card className="w-[88%] h-[80px] mb-4 mx-auto flex gap-4 text-lg cursor-pointer px-6 items-center hover:bg-accent">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="">
            <p className="font-semibold">Shivam</p>
            <p className="text-sm">shivam@gmail.com</p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
