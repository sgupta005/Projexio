import { Button } from '@/ui/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/shadcn/ui/card';
import { Input } from '@/ui/shadcn/ui/input';
import { Label } from '@/ui/shadcn/ui/label';
import { ArrowLeft } from 'lucide-react';
import useCreateOrganisation from './useCreateOrganisation';
import { useForm } from 'react-hook-form';
import { Organisation } from '@/types/definitions';
import SpinnerMini from '@/ui/SpinnerMini';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from '../auth/useCurrentUser';
import { LoadingSpinner } from '@/ui/Spinner';
import { useOrganisationStore } from './store';

function CreateOrganisation() {
  const { createOrganisation, isCreatingOrganisation } =
    useCreateOrganisation();
  const { user, isGettingUser } = useCurrentUser();

  const { setCurrentOrganisation } = useOrganisationStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Organisation>();
  function onCreateFormSubmit({
    name,
    avatar,
  }: {
    name: string;
    avatar: string;
  }) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('admin', user.id);
    formData.append('avatar', avatar[0]);
    createOrganisation(formData, {
      onSuccess: (organisation) => {
        setCurrentOrganisation(organisation);
        navigate('/tasks');
      },
    });
  }
  if (isGettingUser) return <LoadingSpinner />;
  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="xl:w-1/3 ">
        <CardHeader>
          <CardTitle>Create a New Organization</CardTitle>
          <CardDescription>
            Select a name and Avatar Image for your organisation.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              {...register('avatar')}
            />
            {errors.name && (
              <div className="text-red-400 text-sm mt-1 ml-1">
                {errors.name.message}
              </div>
            )}
            <div className="mt-8 space-x-2 flex items-center">
              <Button type="submit">
                {isCreatingOrganisation ? <SpinnerMini /> : 'Create'}
              </Button>
              <Button
                className="w-max"
                variant={'secondary'}
                type="reset"
                onClick={() => navigate('/organisations')}
              >
                <ArrowLeft className="size-4 mr-2" />
                Back
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateOrganisation;
