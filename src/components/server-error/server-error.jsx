import React from 'react';
import {useSelector} from 'react-redux';
import {serverAvailabilitySelector} from '../../store/selectors';

const SeverError = () => {
  let isServerAvailable = useSelector((state) => serverAvailabilitySelector(state));
  return (
    <>
      {!isServerAvailable && <p style={{color: `red`}}>Server is not available</p>}
    </>
  );
};

export default SeverError;
