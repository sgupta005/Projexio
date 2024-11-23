import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeading } from '@/store/slices/headerSlice';
import UpdateSettings from '@/features/settings/UpdateSettings';

function Settings() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeading({
        title: 'Settings',
        subTitle: 'Update your settings',
        showOnDesktop: false,
      })
    );
  }, [dispatch]);

  return <UpdateSettings />;
}

export default Settings;
