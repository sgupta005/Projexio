import { useParams } from 'react-router-dom';
import useGetUserTasks from './useGetUserTasks';
import { LoadingSpinner } from '@/ui/Spinner';
import Analytics from './Analytics';
import UpcomingTasks from './UpcomingTasks';
import ProjectsList from './ProjectsList';
import TeamMembers from './TeamMembers';
import useGetOrganisationAnalytics from './useGetOrganisationAnalytics';

export default function DashboardLayout({ userId }: { userId: string }) {
  const { orgId } = useParams<{
    orgId: string;
  }>();
  const { tasks, isGettingTasks } = useGetUserTasks(orgId || '', userId);
  const { analytics, isGettingAnalytics } = useGetOrganisationAnalytics(
    orgId || ''
  );

  if (isGettingTasks || isGettingAnalytics) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6 px-6 pb-6">
      <Analytics analytics={analytics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingTasks tasks={tasks} />
        <ProjectsList />
      </div>

      <TeamMembers />
    </div>
  );
}
