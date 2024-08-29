import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

import { Button } from '@/ui/shadcn/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => {
        if (theme === 'light') setTheme('dark');
        if (theme === 'dark') setTheme('light');
      }}
    >
      {theme === 'light' && (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      )}
      {theme === 'dark' && (
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
    </Button>
  );
}
