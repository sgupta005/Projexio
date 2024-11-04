import { Ellipsis, EllipsisVertical, ShieldCheck, Trash2 } from 'lucide-react';
import useGetMembers from './useGetMembers';
import { useOrganisationStore } from '../organisations/store';
import Dropdown, {
  DropdownItem,
  DropdownMenu,
  DropdownTitle,
  DropdownTrigger,
} from '@/ui/Dropdown';
import useCurrentUser from '../auth/useCurrentUser';
import { AvatarFallback } from '@/ui/Avatar';
import { LoadingSpinner } from '@/ui/Spinner';
import useRemoveMember from './useRemoveMember';
import useMakeAdmin from './useMakeAdmin';

type Member = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  // avatar: string;
  role: 'member' | 'admin';
};

export default function OrganizationMembersTable() {
  const currentOrganisation = useOrganisationStore(
    (state) => state.currentOrganisation
  );
  const { members, isGettingMembers } = useGetMembers(
    currentOrganisation?._id || ''
  );
  const { user } = useCurrentUser();
  const isAdmin =
    members?.find((m: Member) => m.email === user.email).role === 'admin';

  if (isGettingMembers) return <LoadingSpinner />;
  return (
    <div className="pb-4 px-6">
      {/* Desktop view */}
      <div className="hidden md:block border rounded-lg ">
        <table className="border-muted w-full p-4 ">
          <tr className="bg-muted">
            <td className="font-semibold text-primary/70 p-4">Name</td>
            <td className="font-semibold text-primary/70">Email</td>
            <td className="font-semibold text-primary/70">Role</td>
            {isAdmin && members.length > 1 && (
              <td className="font-semibold text-primary/70">Actions</td>
            )}
          </tr>
          {members?.map((member: Member) => (
            <tr
              key={member._id}
              className="hover:bg-muted-foreground/5 border-b  border-muted "
            >
              <td className="flex items-center gap-2 p-4 ">
                <AvatarFallback>{member.firstName[0]}</AvatarFallback>
                <span className="font-medium">{`${member.firstName} ${member.lastName}`}</span>
              </td>
              <td>{member.email}</td>
              <td>
                <div
                  className={`capitalize rounded-2xl w-max px-3 md:px-4 py-1 text-xs md:text-sm ${
                    member.role == 'admin' && 'bg-primary text-background'
                  } ${member.role == 'member' && 'bg-muted-foreground/20'}`}
                >
                  {member.role}
                </div>
              </td>
              {isAdmin && members.length > 1 && (
                <td>
                  {member._id !== user._id && (
                    <MemberActions
                      member={member}
                      orgId={currentOrganisation?._id as string}
                    />
                  )}
                </td>
              )}
            </tr>
          ))}
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4 flex-col ">
        {members?.map((member: Member) => (
          <div
            key={member._id}
            className="p-4 border border-primary/20 rounded-lg "
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {/* <Avatar
                  fallbackText={member.firstName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                /> */}
                <div>
                  <h3 className="font-medium">{`${member.firstName} ${member.lastName}`}</h3>
                  <p className="text-sm text-muted-foreground">
                    {member.email}
                  </p>
                </div>
              </div>
              {isAdmin && member._id !== user._id && (
                <MemberActions
                  member={member}
                  orgId={currentOrganisation?._id as string}
                />
              )}
            </div>
            <div
              className={`capitalize rounded-2xl w-max px-3 md:px-4 py-1 text-xs md:text-sm ${
                member.role == 'admin' && 'bg-primary text-background'
              } ${member.role == 'member' && 'bg-muted-foreground/20'}`}
            >
              {member.role}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MemberActions({ member, orgId }: { member: Member; orgId: string }) {
  const { removeMember } = useRemoveMember();
  const { makeAdmin } = useMakeAdmin();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Ellipsis className="size-6 md:hidden" />
        <EllipsisVertical className="size-4 hidden md:block" />
      </DropdownTrigger>
      <DropdownMenu className="top-6 -left-28 md:-left-[50%]">
        <DropdownTitle>Actions</DropdownTitle>
        <DropdownItem
          onClick={() => {
            removeMember({ organisationId: orgId, memberId: member._id });
          }}
          className="text-red-500 text-sm"
        >
          <span>
            <Trash2 className="size-4" />
          </span>
          <span>Remove Member</span>
        </DropdownItem>
        {member.role !== 'admin' && (
          <DropdownItem
            onClick={() => {
              makeAdmin({ organisationId: orgId, memberId: member._id });
            }}
            className=" text-sm"
          >
            <span>
              <ShieldCheck className="size-4" />
            </span>
            <span>Make admin</span>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
