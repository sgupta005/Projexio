import ProjectDetails from '@/features/projects/ProjectDetails';
import { setHeading } from '@/store/slices/headerSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Project() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setHeading({
        title: 'Project',
        showOnDesktop: false,
      })
    );
  }, [dispatch]);
  return <ProjectDetails />;
}

export default Project;
