import useCreateOrganisation from '../hooks/useCreateOrganisation';
import { useForm } from 'react-hook-form';
import { Organisation } from '../types';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from '@/features/auth/hooks/useCurrentUser';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { useState } from 'react';
import ImageUpload from '@/ui/ImageUpload';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function CreateOrganisationForm({ onClose }: { onClose?: () => void }) {
  const { createOrganisation, isCreatingOrganisation } =
    useCreateOrganisation();

  const { user, isGettingUser } = useCurrentUser();

  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Organisation>();
  function onCreateFormSubmit({ name }: { name: string }) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('admin', user.id);
    if (image) {
      formData.append('avatar', image);
    } else {
      formData.append('avatar', '');
    }
    createOrganisation(formData, {
      onSuccess: (organisation) => {
        navigate(`/organisation/${organisation._id}`);
      },
    });
  }

  if (isGettingUser) return <LoadingSpinner />;
  return (
    <form
      onSubmit={handleSubmit(onCreateFormSubmit)}
      className="flex flex-col gap-6 "
    >
      <Input
        id="name"
        label="Name"
        type="text"
        error={errors.name?.message}
        {...register('name', {
          required: 'Name is required',
          maxLength: {
            value: 16,
            message: 'Name cannot be longer than 16 characters',
          },
        })}
      />

      <ImageUpload title="Organisation Icon" setImage={setImage} />
      <div className=" space-x-2 flex items-center ml-auto mr-0 ">
        <Button
          className="w-max"
          variant="outline"
          type="reset"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit">
          {isCreatingOrganisation ? (
            <LoadingSpinner variant="small" />
          ) : (
            'Create Organisation'
          )}
        </Button>
      </div>
    </form>
  );
}

export default CreateOrganisationForm;
