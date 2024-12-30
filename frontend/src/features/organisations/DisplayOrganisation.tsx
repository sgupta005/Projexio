import { LoadingSpinner } from '@/ui/Spinner';
import useGetAllOrganisations from './useGetAllOrganisations';
import SelectOrganisation from './SelectOrganisation';
import JoinOrganisation from './JoinOrganisation';
import CreateOrganisation from './CreateOrganisation';
import Modal from '@/ui/Modal';
import { PlusCircle } from 'lucide-react';
import Card from '@/ui/Card';

export default function DisplayOrganisation() {
  const { organisations, isGettingOrganisations } = useGetAllOrganisations();

  const isLoading = isGettingOrganisations;
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="bg-muted h-[150px] xl:h-[190px] fixed w-full" />
      <div className="container mx-auto p-4 relative z-10 flex-grow flex flex-col">
        <h1 className="text-3xl text-primary font-semibold mb-6 ml-4 xl:ml-[21%] xl:mt-10 xl:mb-8">
          Your Organizations
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-custom-xl gap-4 mb-8 justify-center ">
          <Modal>
            <Modal.Open opens="createOrganisation">
              <Card>
                <>
                  <PlusCircle className="size-8 text-muted-foreground" />
                  <div className="flex flex-col items-center">
                    <p className="font-semibold text-sm">Create</p>
                    <p className="text-xs text-muted-foreground">
                      New Organisation
                    </p>
                  </div>
                </>
              </Card>
            </Modal.Open>
            <Modal.Window
              name="createOrganisation"
              heading="Create a new Organisation"
              subheading="Select a name and avatar for your organisation."
            >
              <CreateOrganisation />
            </Modal.Window>
          </Modal>
          <JoinOrganisation />
          <SelectOrganisation organisations={organisations} />
        </div>
      </div>
    </div>
  );
}
