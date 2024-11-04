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
import ImageCropper from '@/ui/ImageCropper';
import { useState } from 'react';
import MotionDiv from '@/ui/MotionDiv';
import Logo from '@/ui/Logo';

function CreateOrganisation() {
  const { createOrganisation, isCreatingOrganisation } =
    useCreateOrganisation();
  const { user, isGettingUser } = useCurrentUser();

  const { setCurrentOrganisation } = useOrganisationStore();

  const navigate = useNavigate();

  const [croppedImageUrl, setCroppedImageUrl] = useState<Blob | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Organisation>();

  function onCreateFormSubmit({ name }: { name: string }) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('admin', user.id);
    if (croppedImageUrl) {
      formData.append('avatar', croppedImageUrl);
    } else {
      formData.append('avatar', '');
    }
    createOrganisation(formData, {
      onSuccess: (organisation) => {
        setCurrentOrganisation(organisation);
        navigate('/tasks');
      },
    });
  }

  if (isGettingUser) return <LoadingSpinner />;
  return (
    <div className="h-screen w-screen flex flex-col">
      <MotionDiv className="mx-auto my-auto">
        <Card>
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
                className="mt-2"
                type="text"
                {...register('name', {
                  required: 'Name is required',
                  maxLength: {
                    value: 16,
                    message: 'Name cannot be longer than 16 characters',
                  },
                })}
              />
              {errors.name && (
                <div className="text-red-400 text-sm mt-1 ml-1">
                  {errors.name.message}
                </div>
              )}
              <p className="text-md mt-4 font-semibold">Avatar</p>
              <ImageCropper setCroppedImageUrl={setCroppedImageUrl} />
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
      </MotionDiv>
    </div>
  );
}

export default CreateOrganisation;
