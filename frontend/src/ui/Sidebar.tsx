import { CalendarCheck, Settings, Users } from 'lucide-react';
import SidebarLink from './SidebarLink';
import { Card } from './shadcn/ui/card';
import { useOrganisationStore } from '@/features/organisations/store';
import { Avatar, AvatarFallback, AvatarImage } from './shadcn/ui/avatar';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const currentOrg = useOrganisationStore((state) => state.currentOrganisation);
  const navigate = useNavigate();
  return (
    <div className="w-0 border-r [grid-column:1/2] [grid-row:1/3] md:w-[300px]">
      <div className="flex flex-col gap-2">
        <Card
          onClick={() => navigate('/organisations')}
          className="w-[270px] h-[150px] mx-auto mt-4 flex flex-col gap-2 text-lg cursor-pointer justify-center items-center hover:bg-accent"
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
            <SidebarLink to="tasks">
              <CalendarCheck className="h-5 w-5" />
              Tasks
            </SidebarLink>
            <SidebarLink to="team">
              <Users className="h-5 w-5" />
              Team
            </SidebarLink>
            <SidebarLink to="settings">
              <Settings className="h-5 w-5" />
              Settings
            </SidebarLink>
          </nav>
        </div>
      </div>
    </div>
  );
}
