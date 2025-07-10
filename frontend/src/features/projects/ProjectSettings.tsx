import Button from '@/ui/Button';
import ConfirmationModal from '@/ui/ConfirmationModal';
import ImageUpload from '@/ui/ImageUpload';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDeleteProject } from './useDeleteProject';
import useCurrentProject from './useCurrentProject.ts';
import { LoadingSpinner } from '@/ui/Spinner';

function ProjectSettings() {
  const navigate = useNavigate();
  const { currentProject, isGettingCurrentProject } = useCurrentProject();
  const { deleteProject, isDeleting } = useDeleteProject();

  if (isGettingCurrentProject) return <LoadingSpinner />;

  return (
    <div className="mx-6 flex flex-col gap-4 mb-4">
      <Button
        variant="outline"
        className="w-max flex gap-1 "
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="size-4" /> Back
      </Button>
      <div className=" py-4 px-6 border rounded-md">
        <h1 className="font-semibold text-xl ">Project Settings</h1>
        <p className="text-primary/60  text-sm mb-4">
          Change name or icon of your Project
        </p>
        <form>
          <label htmlFor="name" className="font-semibold">
            Project Name
          </label>
          <input
            className="border w-full rounded px-2 py-1 mt-2 mb-4"
            id="name"
          />

          <ImageUpload title="Project Icon" setImage={() => null} />
          <div className="flex gap-4 mt-6 mb-2">
            <Button type="submit" className="mr-0 ml-auto">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
      <div className="py-4 px-6 border rounded-md ">
        <h1 className="font-semibold text-xl ">Danger Zone</h1>
        <p className="text-primary/60 text-sm">
          Deleting a Project is irreversible and will remove all data associated
          with it.
        </p>
        <div className="flex">
          <ConfirmationModal
            resourceType="Project"
            resourceName={currentProject?.name}
            onConfirm={() => deleteProject(currentProject?._id as string)}
            isLoading={isDeleting}
          >
            <Button className="mt-6 mr-0 ml-auto " variant="danger">
              Delete Project
            </Button>
          </ConfirmationModal>
        </div>
      </div>
    </div>
  );
}

export default ProjectSettings;
