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
import CreateTaskForm from './CreateTaskForm';
import { useState } from 'react';
import useResize from '@/hooks/useResize';
import { cn } from '@/lib/utils';

function CreateTask({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { isMobile } = useResize();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className={cn('flex items-center gap-2 w-fit', className)}>
            <Plus className="size-4" />
            Create Task
          </Button>
        </DrawerTrigger>
        <DrawerContent className="px-6 pb-4">
          <DrawerHeader>
            <DrawerTitle>Create Task</DrawerTitle>
            <DrawerDescription>
              Create a new task to get started.
            </DrawerDescription>
          </DrawerHeader>

          <CreateTaskForm onClose={() => setOpen(false)} />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn('flex items-center gap-2 w-fit', className)}>
          <Plus className="size-4" />
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Create a new task to get started.
          </DialogDescription>
        </DialogHeader>
        <CreateTaskForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateTask;
