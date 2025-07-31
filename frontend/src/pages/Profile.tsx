import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeading } from '@/store/slices/headerSlice';
import ProfileSettings from '@/features/auth/components/ProfileSettings';

function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeading({
        title: 'Profile',
        subTitle: 'Update your personal information and profile picture',
        showOnDesktop: true,
      })
    );
  }, [dispatch]);

  return <ProfileSettings />;
}

export default Profile;
