import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeading } from '@/store/slices/headerSlice';

function Tasks() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeading({ title: 'Tasks', showOnDesktop: false }));
  }, [dispatch]);

  return <div>Tasks</div>;
}

export default Tasks;
