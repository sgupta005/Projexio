import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeading } from '@/store/slices/headerSlice';
import DashboardLayout from '@/features/dashboard/DashboardLayout';
import useCurrentUser from '@/features/auth/useCurrentUser';
import { LoadingSpinner } from '@/ui/LoadingSpinner';

function Dashboard() {
  const dispatch = useDispatch();

  const { user, isGettingUser } = useCurrentUser();

  useEffect(() => {
    dispatch(
      setHeading({
        title: 'Dashboard',
        subTitle: 'Monitor all of your project and tasks here',
        showOnDesktop: true,
      })
    );
  }, [dispatch]);

  if (isGettingUser) {
    return <LoadingSpinner />;
  }

  return <DashboardLayout userId={user?._id} />;
}

export default Dashboard;
