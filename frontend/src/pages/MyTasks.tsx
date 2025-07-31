import { setHeading } from '@/store/slices/headerSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TaskTabs from '@/features/tasks/components/TaskTabs';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import useGetUserTasks from '@/features/tasks/hooks/useGetUserTasks';
import { useParams } from 'react-router-dom';
import useCurrentUser from '@/features/auth/hooks/useCurrentUser';

function MyTasks() {
  const dispatch = useDispatch();
  const { orgId } = useParams();
  const { user, isGettingUser } = useCurrentUser();
  const { tasks, isGettingTasks } = useGetUserTasks(
    orgId as string,
    user?._id as string
  );
  useEffect(() => {
    dispatch(
      setHeading({
        title: 'My Tasks',
        subTitle: 'Monitor all the tasks assigned to you',
        showOnDesktop: true,
      })
    );
  }, [dispatch]);

  if (isGettingTasks || isGettingUser) return <LoadingSpinner />;
  return (
    <div className="px-6">
      <TaskTabs
        tasks={tasks}
        showProject={true}
        showAssigne={false}
        itemsPerPage={12}
      />
    </div>
  );
}

export default MyTasks;
