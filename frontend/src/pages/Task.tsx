import TaskDetails from '@/features/tasks/TaskDetails';
import { setHeading } from '@/store/slices/headerSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Task() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setHeading({
        title: 'Task',
        showOnDesktop: false,
      })
    );
  }, [dispatch]);
  return <TaskDetails />;
}

export default Task;
