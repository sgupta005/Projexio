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
        subTitle: 'View and update the settings of your organisation',
        showOnDesktop: true,
      })
    );
  }, [dispatch]);

  return <UpdateSettings />;
}

export default Settings;
