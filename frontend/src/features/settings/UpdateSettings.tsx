import { Button } from '@/components/ui/button';
import ImageUpload from '@/ui/ImageUpload';
import useCurrentOrganisation from '../organisations/useCurrentOrganisaiton';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import InviteMembersCard from './InviteMembersCard';
import { useDeleteOrganisation } from './useDeleteOrganisation';
import { useUpdateOrganisation } from './useUpdateOrganisation';
import ConfirmationDialog from '@/ui/ConfirmationDialog';
import { useState, FormEvent, useEffect } from 'react';

function UpdateSettings() {
  const { currentOrg, isGettingCurrentOrg } = useCurrentOrganisation();
  const { deleteOrganisation, isDeleting } = useDeleteOrganisation();
  const { updateOrganisation, isUpdating } = useUpdateOrganisation();
  const [organisationName, setOrganisationName] = useState(
    currentOrg?.name || ''
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (currentOrg?.name) {
      setOrganisationName(currentOrg.name);
    }
  }, [currentOrg?.name]);

  if (isGettingCurrentOrg) return <LoadingSpinner />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!currentOrg?._id) return;

    const formData = new FormData();
    formData.append('name', organisationName);

    if (selectedImage) {
      formData.append('avatar', selectedImage);
    }

    updateOrganisation({ organisationId: currentOrg._id, data: formData });
  };

  return (
    <div className="mx-6 flex flex-col gap-4 mb-4">
      <div className=" py-4 px-6 border rounded-md">
        <h1 className="font-semibold text-xl ">Organisation Settings</h1>
        <p className="text-primary/60  text-sm mb-4">
          Change name or icon of your Organisation
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="font-semibold">
            Organisation Name
          </label>
          <input
            className="border w-full rounded px-2 py-1 mt-2 mb-4"
            id="name"
            value={organisationName}
            onChange={(e) => setOrganisationName(e.target.value)}
            required
          />

          <ImageUpload
            title="Organisation Icon"
            setImage={setSelectedImage}
            defaultImage={currentOrg.avatar}
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
      <InviteMembersCard inviteCode={currentOrg?.inviteCode} />
      <div className="py-4 px-6 border rounded-md ">
        <h1 className="font-semibold text-xl ">Danger Zone</h1>
        <p className="text-primary/60 text-sm">
          Deleting a Organisation is irreversible and will remove all data
          associated with it.
        </p>
        <div className="flex">
          <ConfirmationDialog
            resourceType="Organisation"
            resourceName={currentOrg?.name}
            onConfirm={() => deleteOrganisation(currentOrg?._id)}
            isLoading={isDeleting}
          >
            <Button className="mt-6 mr-0 ml-auto " variant="destructive">
              Delete Organisation
            </Button>
          </ConfirmationDialog>
        </div>
      </div>
    </div>
  );
}

export default UpdateSettings;
