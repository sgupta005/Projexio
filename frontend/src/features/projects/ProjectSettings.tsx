import { Button } from '@/components/ui/button';
import ConfirmationDialog from '@/ui/ConfirmationDialog.tsx';
import ImageUpload from '@/ui/ImageUpload';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteProject } from './useDeleteProject';
import useCurrentProject from './useCurrentProject.ts';
import { useUpdateProject } from './useUpdateProject';
import { LoadingSpinner } from '@/ui/LoadingSpinner.tsx';
import { useState, FormEvent, useEffect } from 'react';

function ProjectSettings() {
  const navigate = useNavigate();
  const { orgId } = useParams<{ orgId: string }>();
  const { currentProject, isGettingCurrentProject } = useCurrentProject();
  const { deleteProject, isDeleting } = useDeleteProject();
  const { updateProject, isUpdating } = useUpdateProject();
  const [projectName, setProjectName] = useState(currentProject?.name || '');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (currentProject?.name) {
      setProjectName(currentProject.name);
    }
  }, [currentProject?.name]);

  if (isGettingCurrentProject) return <LoadingSpinner />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!currentProject?._id || !orgId) return;

    const formData = new FormData();
    formData.append('name', projectName);

    if (selectedImage) {
      formData.append('avatar', selectedImage);
    }

    updateProject({
      projectId: currentProject._id,
      orgId,
      data: formData,
    });
  };

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
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="font-semibold">
            Project Name
          </label>
          <input
            className="border w-full rounded px-2 py-1 mt-2 mb-4"
            id="name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />

          <ImageUpload
            title="Project Icon"
            setImage={setSelectedImage}
            defaultImage={currentProject?.avatar}
          />
          <div className="flex gap-4 mt-6 mb-2">
            <Button
              type="submit"
              className="mr-0 ml-auto"
              disabled={isUpdating}
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
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
          <ConfirmationDialog
            resourceType="Project"
            resourceName={currentProject?.name}
            onConfirm={() => deleteProject(currentProject?._id as string)}
            isLoading={isDeleting}
          >
            <Button className="mt-6 mr-0 ml-auto " variant="destructive">
              Delete Project
            </Button>
          </ConfirmationDialog>
        </div>
      </div>
    </div>
  );
}

export default ProjectSettings;
