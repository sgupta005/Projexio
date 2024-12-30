import InviteCodeInput from '@/ui/InviteCodeInput';
import { UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import useJoinOrganisation from './useJoinOrganisation';
import { useNavigate } from 'react-router-dom';
import Modal from '@/ui/Modal';
import Card from '@/ui/Card';

function JoinOrganisation() {
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
    <Modal>
      <Modal.Open opens="joinOrganisation">
        <Card>
          <>
            <UserPlus className="size-8 text-muted-foreground" />
            <div className="flex flex-col items-center">
              <p className="font-semibold text-sm">Join</p>
              <p className="text-xs text-muted-foreground">
                Existing Organisation
              </p>
            </div>
          </>
        </Card>
      </Modal.Open>
      <Modal.Window
        name="joinOrganisation"
        heading="Join an Organization"
        subheading="Enter the Invite Code of the organization you want to join."
      >
        <InviteCodeInput
          setInviteCode={setInviteCode}
          isLoading={isJoiningOrganisation}
        />
      </Modal.Window>
    </Modal>
  );
}

export default JoinOrganisation;
