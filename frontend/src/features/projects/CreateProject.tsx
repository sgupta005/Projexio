import Button from '@/ui/Button';
import ImageUpload from '@/ui/ImageUpload';
import useCreateProject from './useCreateProject';
import { useState } from 'react';
import SpinnerMini from '@/ui/SpinnerMini';
import { Project } from './types';
import { useForm } from 'react-hook-form';
import useCurrentOrganisation from '../organisations/useCurrentOrganisaiton';
import Input from '@/ui/Input';

function CreateProject({ onClose }: { onClose?: () => void }) {
  const { createProject, isCreatingProject } = useCreateProject();
  const { currentOrg } = useCurrentOrganisation();
  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Project>();

  function submit({ name }: { name: string }) {
    if (!currentOrg) return;
    const data = new FormData();
    data.append('name', name);
    if (image) data.append('avatar', image);
    createProject(
      { data, orgId: currentOrg._id as string },
      { onSuccess: onClose }
    );
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6 ">
      <Input
        id="name"
        label="Name"
        type="text"
        error={errors.name?.message}
        {...register('name', {
          required: 'Name is required',
        })}
      />
      <ImageUpload title="Project Icon" setImage={setImage} />
      <div className=" space-x-2 flex items-center ml-auto mr-0 ">
        <Button
          className="w-max"
          variant={'outline'}
          type="reset"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit">
          {isCreatingProject ? <SpinnerMini /> : 'Create Project'}
        </Button>
      </div>
    </form>
  );
}

export default CreateProject;
