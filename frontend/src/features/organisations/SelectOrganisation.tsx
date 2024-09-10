import { formatDistanceToNow } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/ui/shadcn/ui/card';
import { Button } from '@/ui/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/shadcn/ui/dialog';
import { Label } from '@/ui/shadcn/ui/label';
import { Input } from '@/ui/shadcn/ui/input';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PlusCircle, UserPlus } from 'lucide-react';

import { LoadingSpinner } from '@/ui/Spinner';
import SpinnerMini from '@/ui/SpinnerMini';
import useVerifyLogin from '../auth/useVerifyLogin';
import useCreateOrganisation from './useCreateOrganisation';
import useGetAllOrganisations from './useGetAllOrganisations';

export type Organisation = {
  name: string;
  admin: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function SelectOrganisation() {
  const { userId } = useVerifyLogin();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const { organisations, isGettingOrganisations } = useGetAllOrganisations();
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
  const isLoading = isGettingOrganisations;
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="bg-primary/15 h-1/5 xl:h-1/4 absolute w-full" />
      <div className="container mx-auto p-4 relative z-10 flex-grow flex flex-col">
        <h1 className="text-3xl font-bold mb-6 ml-4 xl:ml-[21%] xl:mt-10 xl:mb-8">
          Your Organizations
        </h1>
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-custom-xl gap-4  mb-8 justify-center ">
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
                  You can start by creating a new organisation.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onCreateFormSubmit)}>
                <Label className="text-md">Name</Label>
                <Input
                  type="text"
                  className="mt-2"
                  {...register('name', {
                    required: 'Name is required',
                  })}
                />
                {errors.name && (
                  <div className="text-red-400 text-sm mt-1 ml-1">
                    {errors.name.message}
                  </div>
                )}
                <Button type="submit" className="w-full mt-8">
                  {isCreatingOrganisation ? <SpinnerMini /> : 'Create'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen}>
            <DialogTrigger asChild>
              <Card className="flex flex-col items-center justify-center cursor-pointer hover:bg-accent h-40 xl:w-96 xl:h-32">
                <CardContent className="flex flex-col items-center p-4">
                  <UserPlus className="h-8 w-8 mb-2 text-muted-foreground" />
                  <CardTitle className="text-sm mb-1">Join</CardTitle>
                  <CardDescription className="text-xs text-center">
                    Existing organization
                  </CardDescription>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Join an Organization</DialogTitle>
                <DialogDescription>
                  Enter the ID of the organization you want to join.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          {organisations?.map((org: Organisation) => (
            <Card
              key={org.name}
              className="flex text-lg  gap-4 justify-center items-center h-40 xl:w-96 xl:h-32 hover:bg-accent"
            >
              <div>
                <p>{org.name}</p>
                {org.updatedAt && (
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(org.updatedAt), {
                      addSuffix: true,
                    })}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
