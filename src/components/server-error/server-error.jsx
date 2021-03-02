import React from 'react';
import {useSelector} from 'react-redux';

const SeverError = () => {
  const isServerAvailable = useSelector((state) => state.serverAvailability);
  return (
    <>
      {!isServerAvailable && <p style={{color: `red`}}>Server is not available</p>}
    </>
  );
};

export default SeverError;
