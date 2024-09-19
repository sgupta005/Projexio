import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/ui/shadcn/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/shadcn/ui/dialog';

import { useState } from 'react';

import { LoadingSpinner } from '@/ui/Spinner';
import useGetAllOrganisations from './useGetAllOrganisations';
import SelectOrganisation from './SelectOrganisation';
import { PlusCircle, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DisplayOrganisation() {
  const { organisations, isGettingOrganisations } = useGetAllOrganisations();
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const navigate = useNavigate();

  const isLoading = isGettingOrganisations;
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="bg-primary/15 h-[150px] xl:h-[190px] absolute w-full" />
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
          <Dialog open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen}>
            <DialogTrigger asChild>
              <Card className="flex flex-col items-center justify-center cursor-pointer hover:bg-accent h-40 xl:w-96 xl:h-32">
                <CardContent className="flex flex-col items-center p-4">
                  <UserPlus className="h-8 w-8 mb-2 text-muted-foreground" />
                  <CardTitle className="text-sm mb-1">Join</CardTitle>
                  <CardDescription className="text-xs text-center">
                    Existing organization
                  </CardDescription>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Join an Organization</DialogTitle>
                <DialogDescription>
                  Enter the ID of the organization you want to join.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <SelectOrganisation organisations={organisations} />
        </div>
      </div>
    </div>
  );
}
