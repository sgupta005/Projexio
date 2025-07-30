import { Button } from '@/components/ui/button';
import CopyButton from '@/ui/CopyButton';

interface InviteMembersCardProps {
  inviteCode?: string;
}

function InviteMembersCard({ inviteCode }: InviteMembersCardProps) {
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
        <Button className="mt-6 mr-0 ml-auto " variant="destructive">
          Reset Invite Code
        </Button>
      </div>
    </div>
  );
}

export default InviteMembersCard;
