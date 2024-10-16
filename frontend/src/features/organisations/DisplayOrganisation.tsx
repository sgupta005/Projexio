import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/ui/shadcn/ui/card';

import { LoadingSpinner } from '@/ui/Spinner';
import useGetAllOrganisations from './useGetAllOrganisations';
import SelectOrganisation from './SelectOrganisation';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import JoinOrganisation from './JoinOrganisation';

export default function DisplayOrganisation() {
  const { organisations, isGettingOrganisations } = useGetAllOrganisations();

  const navigate = useNavigate();

  const isLoading = isGettingOrganisations;
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="bg-primary/15 h-[150px] xl:h-[190px] fixed w-full" />
      <div className="container mx-auto p-4 relative z-10 flex-grow flex flex-col">
        <h1 className="text-3xl font-bold mb-6 ml-4 xl:ml-[21%] xl:mt-10 xl:mb-8">
          Your Organizations
        </h1>
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-custom-xl gap-4  mb-8 justify-center ">
          <Card
            className="flex flex-col items-center justify-center cursor-pointer hover:bg-accent h-40 xl:w-96 xl:h-32"
            onClick={() => navigate('create')}
          >
            <CardContent className="flex flex-col items-center p-4">
              <PlusCircle className="h-8 w-8 mb-2 text-muted-foreground" />
              <CardTitle className="text-sm mb-1">Create</CardTitle>
              <CardDescription className="text-xs text-center">
                New organization
              </CardDescription>
            </CardContent>
          </Card>
          <JoinOrganisation />
          <SelectOrganisation organisations={organisations} />
        </div>
      </div>
    </div>
  );
}
