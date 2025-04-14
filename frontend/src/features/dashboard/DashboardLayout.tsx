import { useParams } from 'react-router-dom';
import ProjectChart from './ProjectChart';
import TaskSummary from './TaskSummary';
import useGetUserTasks from './useGetUserTasks';
import { LoadingSpinner } from '@/ui/Spinner';
export default function DashboardLayout({ userId }: { userId: string }) {
  const { orgId } = useParams<{
    orgId: string;
  }>();
  const { tasks, isGettingTasks } = useGetUserTasks(orgId || '', userId);
  console.log(tasks);

  if (isGettingTasks) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6 pb-8">
      <TaskSummary tasks={tasks} />
      <ProjectChart tasks={tasks} />
    </div>
  );
}
