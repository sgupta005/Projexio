import Button from '@/ui/Button';
import ImageUpload from '@/ui/ImageUpload';
import useCreateProject from './useCreateProject';
import { useState } from 'react';
import SpinnerMini from '@/ui/SpinnerMini';
import { Project } from './types';
import { useForm } from 'react-hook-form';
import useCurrentOrganisation from '../organisations/useCurrentOrganisaiton';

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
    <div className="md:min-w-[400px]">
      <h1 className="font-bold text-xl mb-6">Create a new project</h1>
      {/* <DashedLine className="my-8" /> */}
      <p className="text-muted-foreground font-semibold">Project Name</p>
      <form onSubmit={handleSubmit(submit)}>
        {errors.name && (
          <div className="text-red-500 text-sm mt-1">{errors.name.message}</div>
        )}
        <input
          className="border w-full rounded px-2 py-1 mt-2 mb-6"
          {...register('name', {
            required: 'Name is required',
          })}
        />

        <ImageUpload title="Project Icon" setImage={setImage} />
        <div className="flex gap-4 mt-6 mb-2">
          <Button type="submit">
            {isCreatingProject ? <SpinnerMini /> : 'Create Project'}
          </Button>
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateProject;
