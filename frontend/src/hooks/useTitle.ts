import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const useHeading = (heading: { title: string; subTitle: string }) => {
  const { setHeading } = useOutletContext<{
    setHeading: React.Dispatch<
      React.SetStateAction<{ title: string; subTitle: string }>
    >;
  }>();

  useEffect(() => {
    setHeading(heading);
  }, [setHeading, heading]);
};

export default useHeading;
