import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarLinkProps {
  children: ReactNode;
  to: string;
}

function SidebarLink({ children, to }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary '
          : 'flex items-center border gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary '
      }
    >
      {children}
    </NavLink>
  );
}

export default SidebarLink;
