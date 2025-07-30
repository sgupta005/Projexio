import InviteCodeInput from '@/ui/InviteCodeInput';
import { UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import useJoinOrganisation from './useJoinOrganisation';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import useResize from '@/hooks/useResize';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

function JoinOrganisation() {
  const [inviteCode, setInviteCode] = useState('');
  const { joinOrganisation, isJoiningOrganisation } = useJoinOrganisation();
  const { isMobile } = useResize();

  const navigate = useNavigate();

  useEffect(
    function () {
      if (inviteCode)
        joinOrganisation(inviteCode, {
          onSuccess: (organisation) => {
            navigate(`${organisation._id}`);
          },
        });
    },
    [inviteCode, joinOrganisation, navigate]
  );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Card className=" flex flex-col xl:flex-row text-lg cursor-pointer gap-4 justify-center items-center h-40 hover:bg-gray-50 w-[400px]">
            <CardContent>
              <UserPlus className="size-8 text-muted-foreground" />
              <div>
                <p>Join</p>
                <p className="text-sm text-muted-foreground">
                  Existing Organisation
                </p>
              </div>
            </CardContent>
          </Card>
        </DrawerTrigger>
        <DrawerContent className="px-6 pb-4">
          <DrawerHeader>
            <DrawerTitle>Join Organisation</DrawerTitle>
            <DrawerDescription>
              Enter the Invite Code of the organization you want to join.
            </DrawerDescription>
          </DrawerHeader>
          <InviteCodeInput
            setInviteCode={setInviteCode}
            isLoading={isJoiningOrganisation}
          />
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className=" flex flex-col xl:flex-row text-lg cursor-pointer gap-4 justify-center items-center h-40 hover:bg-gray-50 w-[400px]">
          <CardContent>
            <UserPlus className="size-8 text-muted-foreground" />
            <div>
              <p>Join</p>
              <p className="text-sm text-muted-foreground">
                Existing Organisation
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Organisation</DialogTitle>
          <DialogDescription>
            Enter the Invite Code of the organization you want to join.
          </DialogDescription>
        </DialogHeader>
        <InviteCodeInput
          setInviteCode={setInviteCode}
          isLoading={isJoiningOrganisation}
        />
      </DialogContent>
    </Dialog>
  );
}

export default JoinOrganisation;
