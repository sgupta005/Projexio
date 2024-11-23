import Button from '@/ui/Button';
import ImageUpload from '@/ui/ImageUpload';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'react-router-dom';

function ProjectSettings() {
  const { projectId } = useParams();
  return (
    <div className="mx-6 flex flex-col gap-4">
      <div className="bg-muted py-4 px-6 rounded-md">
        <h1 className="font-bold text-xl ">Project Settings</h1>
        <p className="text-muted-foreground font-semibold text-sm mb-6">
          View and change name and icon of your project
        </p>
        {/* <DashedLine className="my-8" /> */}
        <form>
          <input className="border w-full rounded px-2 py-1 mt-2 mb-6" />

          <ImageUpload title="Project Icon" setImage={() => null} />
          <div className="flex gap-4 mt-6 mb-2">
            <Button type="submit" className="mr-0 ml-auto">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
      <div className="py-4 px-6 bg-muted rounded-md ">
        <h1 className="font-bold text-xl ">Danger Zone</h1>
        <p className="text-muted-foreground font-semibold text-sm">
          Deleting a project is irreversible and will remove all data associated
          with it.
        </p>
        <div className="flex">
          <Button className="mt-6 mr-0 ml-auto">Delete Project</Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectSettings;
