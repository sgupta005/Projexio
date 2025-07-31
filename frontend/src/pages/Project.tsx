import ProjectDetails from '@/features/projects/components/ProjectDetails';
import { setHeading } from '@/store/slices/headerSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Project() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setHeading({
        title: 'Dashboard',
        subTitle: 'Monitor all of your project and tasks here',
        showOnDesktop: true,
      })
    );
  }, [dispatch]);
  return <ProjectDetails />;
}

export default Project;
