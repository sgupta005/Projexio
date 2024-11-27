import InviteCodeInput from '@/ui/InviteCodeInput';
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
import { UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import useJoinOrganisation from './useJoinOrganisation';
import { useNavigate } from 'react-router-dom';

function JoinOrganisation() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const { joinOrganisation, isJoiningOrganisation } = useJoinOrganisation();

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

  return (
    <Dialog open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen}>
      <DialogTrigger asChild>
        <Card className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 h-40 xl:w-96 xl:h-32">
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
