import Button from '@/ui/Button';
import ImageUpload from '@/ui/ImageUpload';
import useCurrentOrganisation from '../organisations/useCurrentOrganisaiton';
import { LoadingSpinner } from '@/ui/Spinner';
import InviteMembersCard from './InviteMembersCard';

function UpdateSettings() {
  const { currentOrg, isGettingCurrentOrg } = useCurrentOrganisation();
  if (isGettingCurrentOrg) return <LoadingSpinner />;
  return (
    <div className="mx-6 flex flex-col gap-4 mb-4">
      <div className=" py-4 px-6 border rounded-md">
        <h1 className="font-semibold text-xl ">Organisation Settings</h1>
        <p className="text-primary/60  text-sm mb-4">
          Change name or icon of your Organisation
        </p>
        <form>
          <label htmlFor="name" className="font-semibold">
            Organisation Name
          </label>
          <input
            className="border w-full rounded px-2 py-1 mt-2 mb-4"
            id="name"
          />

          <ImageUpload title="Organisation Icon" setImage={() => null} />
          <div className="flex gap-4 mt-6 mb-2">
            <Button type="submit" className="mr-0 ml-auto">
              Save Changes
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
          <Button className="mt-6 mr-0 ml-auto " variant="danger">
            Delete Organisation
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UpdateSettings;
