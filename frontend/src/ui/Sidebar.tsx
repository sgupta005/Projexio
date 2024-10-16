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
import { AnimatePresence, motion } from 'framer-motion';
import useCurrentUser from '@/features/auth/useCurrentUser';
import { useEffect, useState } from 'react';

const routes = [
  { path: '', name: 'Reports', icon: <NotebookPen /> },
  { path: '/tasks', name: 'My Work', icon: <Folder /> },
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

const linkAnimation = {
  hidden: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
  show: {
    opacity: 1,
    width: 'auto',
    transition: {
      duration: 0.4,
    },
  },
};

export default function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const currentOrg = useOrganisationStore((state) => state.currentOrganisation);
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const className = isSidebarOpen
    ? `relative border-r bg-background h-full`
    : 'overflow-hidden absolute bg-background h-full';

  const [isTextBreaking, setIsTextBreaking] = useState(false);

  // Simulate the animation of word-break by controlling it based on sidebar state
  useEffect(() => {
    if (isSidebarOpen) {
      const timeout = setTimeout(() => {
        setIsTextBreaking(true);
      }, 400); // Delay breaking the text, matching animation duration
      return () => clearTimeout(timeout);
    } else {
      setIsTextBreaking(false);
    }
  }, [isSidebarOpen]);

  return (
    <motion.div
      initial={{ width: '0px', opacity: 0 }}
      animate={{
        width: isSidebarOpen ? '300px' : '0px',
        opacity: 1,
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
              <SidebarLink to={route.path} key={route.name}>
                {route.icon}
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.div
                      variants={linkAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="text-nowrap"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
                {route.button && route.button}
              </SidebarLink>
            ))}
          </nav>
        </div>
        <Card className="w-[88%] h-max mb-4 mx-auto flex gap-4 text-lg cursor-pointer px-6 py-4 items-center hover:bg-accent">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div
            className={`${isTextBreaking ? 'break-all' : 'whitespace-nowrap'}`}
          >
            <p className="font-semibold">
              {user?.firstName} {user?.lastName}
            </p>
            {isSidebarOpen && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.525 }}
                className={`text-sm ${isTextBreaking ? 'block' : 'hidden'}`}
              >
                {user.email}
              </motion.p>
            )}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
