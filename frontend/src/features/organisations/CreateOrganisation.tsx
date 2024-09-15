import { Button } from '@/ui/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/ui/shadcn/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/shadcn/ui/dialog';
import { Input } from '@/ui/shadcn/ui/input';
import { Label } from '@/ui/shadcn/ui/label';
import { PlusCircle } from 'lucide-react';
import useCreateOrganisation from './useCreateOrganisation';
import { useForm } from 'react-hook-form';
import { Organisation } from '@/types/definitions';
import SpinnerMini from '@/ui/SpinnerMini';
import { Dispatch, SetStateAction } from 'react';

type PropTypes = {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>;
  userId: 'string';
};

function CreateOrganisation({
  isCreateModalOpen,
  setIsCreateModalOpen,
  userId,
}: PropTypes) {
  const { createOrganisation, isCreatingOrganisation } =
    useCreateOrganisation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Organisation>();
  function onCreateFormSubmit({ name }: { name: string }) {
    createOrganisation({ name, admin: userId });
    if (!isCreatingOrganisation) {
      setIsCreateModalOpen(false);
    }
  }
  return (
    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
      <DialogTrigger asChild>
        <Card className="flex flex-col items-center justify-center cursor-pointer hover:bg-accent h-40 xl:w-96 xl:h-32">
          <CardContent className="flex flex-col items-center p-4">
            <PlusCircle className="h-8 w-8 mb-2 text-muted-foreground" />
            <CardTitle className="text-sm mb-1">Create</CardTitle>
            <CardDescription className="text-xs text-center">
              New organization
            </CardDescription>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Organization</DialogTitle>
          <DialogDescription>
            Select a name and Avatar Image for your organisation.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onCreateFormSubmit)}>
          <Label className="text-md">Name</Label>
          <Input
            className="mt-2 mb-4"
            type="text"
            {...register('name', {
              required: 'Name is required',
            })}
          />
          <Label className="text-md">Avatar</Label>
          <Input
            className="mt-2 file:text-primary text-muted-foreground"
            type="file"
            // {...register('image', {
            //   required: isEditSession ? false : 'This field is required',
            // })}
          />
          {errors.name && (
            <div className="text-red-400 text-sm mt-1 ml-1">
              {errors.name.message}
            </div>
          )}
          <div className="mt-8 space-x-2">
            <Button type="submit">
              {isCreatingOrganisation ? <SpinnerMini /> : 'Create'}
            </Button>
            <Button
              variant={'secondary'}
              type="reset"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateOrganisation;
