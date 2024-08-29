import { CalendarCheck, Package2, Settings, Users } from 'lucide-react';
import SidebarLink from './SidebarLink';

export default function Sidebar() {
  return (
    <div className="w-0 border-r [grid-column:1/2] [grid-row:1/3] md:w-[300px]">
      <div className="flex flex-col gap-2">
        <div className="flex h-14 items-center border-b  gap-3 lg:h-[60px] lg:px-6">
          <Package2 className="h-6 w-6" />
          <span>Organistaion Name</span>
        </div>
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
