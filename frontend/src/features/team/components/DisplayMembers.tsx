import { Ellipsis, EllipsisVertical, ShieldCheck, Trash2 } from 'lucide-react';
import useGetMembers from '../hooks/useGetMembers';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useCurrentUser from '../../auth/hooks/useCurrentUser';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import useRemoveMember from '../hooks/useRemoveMember';
import useMakeAdmin from '../hooks/useMakeAdmin';
import useCurrentOrganisation from '../../organisations/hooks/useCurrentOrganisaiton';
import { Member } from '../types';
import InviteMembersCard from '../../settings/components/InviteMembersCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function OrganizationMembersTable() {
  const { currentOrg: currentOrganisation, isGettingCurrentOrg } =
    useCurrentOrganisation();
  const { members, isGettingMembers } = useGetMembers(
    currentOrganisation?._id || ''
  );
  const { user } = useCurrentUser();
  const isAdmin =
    members?.find((m: Member) => m.email === user.email).role === 'admin';

  if (isGettingMembers || isGettingCurrentOrg) return <LoadingSpinner />;
  return (
    <div className="pb-4 px-6 space-y-8">
      {/* Desktop view */}
      <div className="hidden md:block border rounded-lg ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              {isAdmin && members.length > 1 && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {members?.map((member: Member) => (
              <TableRow key={member._id}>
                <TableCell className="flex items-center gap-2 p-4">
                  <Avatar>
                    <AvatarFallback>{member.firstName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{`${member.firstName} ${member.lastName}`}</span>
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <div
                    className={`capitalize rounded-2xl w-max px-3 md:px-4 py-1 text-xs md:text-sm ${
                      member.role == 'admin' && 'bg-primary text-background'
                    } ${member.role == 'member' && 'bg-muted-foreground/20'}`}
                  >
                    {member.role}
                  </div>
                </TableCell>
                {isAdmin && members.length > 1 && (
                  <TableCell>
                    {member._id !== user._id && (
                      <MemberActions
                        member={member}
                        orgId={currentOrganisation?._id as string}
                      />
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
                <Avatar>
                  <AvatarFallback>{member.firstName[0]}</AvatarFallback>
                </Avatar>
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
      <InviteMembersCard inviteCode={currentOrganisation?.inviteCode} />
    </div>
  );
}

function MemberActions({ member, orgId }: { member: Member; orgId: string }) {
  const { removeMember } = useRemoveMember();
  const { makeAdmin } = useMakeAdmin();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis className="size-6 md:hidden cursor-pointer" />
        <EllipsisVertical className="size-4 hidden md:block cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              removeMember({ organisationId: orgId, memberId: member._id });
            }}
            className="text-red-500 text-sm"
          >
            <span>
              <Trash2 className="size-4" />
            </span>
            <span>Remove Member</span>
          </DropdownMenuItem>
          {member.role !== 'admin' && (
            <DropdownMenuItem
              onClick={() => {
                makeAdmin({ organisationId: orgId, memberId: member._id });
              }}
              className=" text-sm"
            >
              <span>
                <ShieldCheck className="size-4" />
              </span>
              <span>Make admin</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
