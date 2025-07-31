import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Plus } from 'lucide-react';
import CreateProjectForm from './CreateProjectForm';
import { useState } from 'react';
import useResize from '@/hooks/useResize';

function CreateProject({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { isMobile } = useResize();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          {children ? (
            children
          ) : (
            <Button className="flex items-center gap-2 w-fit">
              <Plus className="size-4" />
              Create Project
            </Button>
          )}
        </DrawerTrigger>
        <DrawerContent className="px-6 pb-4">
          <DrawerHeader>
            <DrawerTitle>Create Project</DrawerTitle>
            <DrawerDescription>
              Create a new project to get started.
            </DrawerDescription>
          </DrawerHeader>
          <CreateProjectForm onClose={() => setOpen(false)} />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button className="flex items-center gap-2 w-fit">
            <Plus className="size-4" />
            Create Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create a new project to get started.
          </DialogDescription>
        </DialogHeader>
        <CreateProjectForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateProject;
