import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface PropTypes {
  children: ReactNode;
  to: string;
}

function SidebarLink({ children, to }: PropTypes) {
  const className = `flex gap-2 items-center font-semibold py-2 px-2`;
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? `${className} border text-primary shadow-sm rounded bg-background`
          : `${className} border border-muted text-muted-foreground`
      }
    >
      {children}
    </NavLink>
  );
}

export default SidebarLink;
