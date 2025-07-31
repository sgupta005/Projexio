import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import CreateOrganisationForm from './CreateOrganisationForm';
import { useState } from 'react';
import useResize from '@/hooks/useResize';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

function CreateOrganisation() {
  const [open, setOpen] = useState(false);
  const { isMobile } = useResize();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Card className=" flex flex-col xl:flex-row text-lg cursor-pointer gap-4 justify-center items-center h-40 hover:bg-muted w-[400px]">
            <CardContent>
              <PlusCircle className="size-8 text-muted-foreground" />
              <div>
                <p>Create</p>
                <p className="text-sm text-muted-foreground">
                  New Organisation
                </p>
              </div>
            </CardContent>
          </Card>
        </DrawerTrigger>
        <DrawerContent className="px-6 pb-4">
          <DrawerHeader>
            <DrawerTitle>Create Organisation</DrawerTitle>
            <DrawerDescription>
              Select a name and avatar for your organisation.
            </DrawerDescription>
          </DrawerHeader>
          <CreateOrganisationForm onClose={() => setOpen(false)} />
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className=" flex flex-col xl:flex-row text-lg cursor-pointer gap-4 justify-center items-center h-40 hover:bg-gray-50 w-[400px]">
          <CardContent>
            <PlusCircle className="size-8 text-muted-foreground" />
            <div>
              <p>Create</p>
              <p className="text-sm text-muted-foreground">New Organisation</p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Organisation</DialogTitle>
          <DialogDescription>
            Select a name and avatar for your organisation.
          </DialogDescription>
        </DialogHeader>
        <CreateOrganisationForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateOrganisation;
