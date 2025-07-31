import TaskDetails from '@/features/tasks/components/TaskDetails';
import { setHeading } from '@/store/slices/headerSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Task() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setHeading({
        title: 'Dashboard',
        subTitle: 'Monitor all your projects and tasks here.',
        showOnDesktop: true,
      })
    );
  }, [dispatch]);
  return <TaskDetails />;
}

export default Task;
