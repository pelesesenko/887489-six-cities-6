import React from 'react';
import {useParams} from 'react-router-dom';
import PageRoom from './page-room';
import PropTypes from 'prop-types';

const PageRoomContainer = ({isAuthorized}) => {
  const id = +useParams().id;
  return <PageRoom id={id} isAuthorized={isAuthorized} />;
};

PageRoomContainer.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
};

export default PageRoomContainer;
