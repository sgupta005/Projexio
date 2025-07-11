import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />}
          {item.href && !item.isActive ? (
            <Link
              to={item.href}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={`${
                item.isActive ? 'text-gray-900 font-semibold' : 'text-gray-500'
              }`}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
