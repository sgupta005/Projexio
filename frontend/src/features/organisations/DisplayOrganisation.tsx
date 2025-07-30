import { LoadingSpinner } from '@/ui/LoadingSpinner';
import useGetAllOrganisations from './useGetAllOrganisations';
import SelectOrganisation from './SelectOrganisation';
import JoinOrganisation from './JoinOrganisation';
import CreateOrganisation from './CreateOrganisation';

export default function DisplayOrganisation() {
  const { organisations, isGettingOrganisations } = useGetAllOrganisations();

  const isLoading = isGettingOrganisations;
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="min-h-svh flex flex-col ">
      <div className="bg-muted h-[150px] xl:h-[190px] fixed w-full" />
      <div className="container mx-auto p-4 relative z-10 grow flex flex-col">
        <h1 className="text-3xl text-primary font-semibold mb-6 ml-4 xl:ml-[21%] xl:mt-10 xl:mb-8">
          Your Organizations
        </h1>
        <div className="flex flex-wrap gap-4 mx-20">
          <CreateOrganisation />
          <JoinOrganisation />
          <SelectOrganisation organisations={organisations} />
        </div>
      </div>
    </div>
  );
}
