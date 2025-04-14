import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeading } from '@/store/slices/headerSlice';
import DashboardLayout from '@/features/dashboard/DashboardLayout';
import useCurrentUser from '@/features/auth/useCurrentUser';
import { LoadingSpinner } from '@/ui/Spinner';

function Dashboard() {
  const dispatch = useDispatch();

  const { user, isGettingUser } = useCurrentUser();

  useEffect(() => {
    dispatch(setHeading({ title: 'Dashboard', showOnDesktop: false }));
  }, [dispatch]);

  if (isGettingUser) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <DashboardLayout userId={user?._id} />
    </div>
  );
}

export default Dashboard;
