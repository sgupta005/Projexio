import { useParams, useNavigate } from 'react-router-dom';
import useGetMembers from '@/features/team/useGetMembers';
import DashboardCard from './DashboardCard';
import { Member } from '@/features/team/types';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { UsersIcon, ShieldIcon, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function TeamMembers() {
  const { orgId } = useParams<{ orgId: string }>();
  const navigate = useNavigate();
  const { members, isGettingMembers } = useGetMembers(orgId || '');

  if (isGettingMembers) {
    return (
      <DashboardCard title="Team Members">
        <LoadingSpinner className="h-8 w-8" />
      </DashboardCard>
    );
  }

  const handleViewTeam = () => {
    navigate(`/organisation/${orgId}/team`);
  };

  return (
    <DashboardCard title={`Team Members (${members.length})`}>
      {!members || members.length === 0 ? (
        <div className="text-center py-6">
          <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No team members found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-4">
          {members.slice(0, 6).map((member: Member) => (
            <div
              key={member._id}
              className="flex flex-col items-center p-4 rounded-lg border text-center"
            >
              <Avatar>
                <AvatarFallback>
                  {member.firstName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="mb-2">
                <h4 className="font-medium text-gray-900 text-sm truncate">
                  {`${member.firstName} ${member.lastName}`}
                </h4>
                <p className="text-xs text-gray-500 truncate">{member.email}</p>
              </div>

              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  member.role === 'admin'
                    ? 'bg-primary text-background'
                    : 'bg-muted'
                }`}
              >
                {member.role === 'admin' ? (
                  <ShieldIcon className="h-3 w-3" />
                ) : (
                  <UserIcon className="h-3 w-3" />
                )}
                {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
              </div>
            </div>
          ))}

          <div className="col-span-full">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleViewTeam}
            >
              {members.length > 6
                ? `View All Members (${members.length})`
                : 'Manage Team'}
            </Button>
          </div>
        </div>
      )}
    </DashboardCard>
  );
}
