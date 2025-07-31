import { Button } from '@/components/ui/button';
import CopyButton from '@/ui/CopyButton';
import { useResetInviteCode } from './useResetInviteCode';
import { useParams } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface InviteMembersCardProps {
  inviteCode?: string;
}

function InviteMembersCard({ inviteCode }: InviteMembersCardProps) {
  const { orgId } = useParams<{ orgId: string }>();
  const { resetInviteCode, isResetting } = useResetInviteCode();

  const [isOpen, setIsOpen] = useState(false);

  function handleResetInviteCode() {
    if (orgId) {
      resetInviteCode(orgId, {
        onSuccess: () => {
          setIsOpen(false);
        },
      });
    }
  }

  return (
    <div className="py-4 px-6 border rounded-md ">
      <h1 className="font-semibold text-xl ">Invite Members</h1>
      <p className="text-primary/60 text-sm">
        Use the invite code to add members to your Organisation
      </p>
      <div className="flex gap-2 mt-2">
        <div className="border rounded py-1 px-2 md:w-[50%] w-full">
          {inviteCode}
        </div>
        <CopyButton textToCopy={inviteCode || ''} />
      </div>
      <div className="flex">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="mt-6 mr-0 ml-auto "
              variant="destructive"
              disabled={isResetting}
            >
              Reset Invite Code
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset Invite Code</DialogTitle>
              <DialogDescription>
                Resetting the invite code will remove all existing members
                except the admin. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                disabled={isResetting}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={isResetting}
                onClick={handleResetInviteCode}
              >
                {isResetting ? 'Resetting...' : 'Reset Invite Code'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default InviteMembersCard;
