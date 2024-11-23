import DisplayMembers from '@/features/team/DisplayMembers';
import { setHeading } from '@/store/slices/headerSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Team() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeading({
        title: 'Team',
        subTitle: 'View and manage team members',
      })
    );
  }, [dispatch]);

  return <DisplayMembers />;
}

export default Team;
