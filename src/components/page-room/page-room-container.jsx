import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {isRoomLoadedSelector, isNearbyLoadedSelector} from '../../store/selectors';
import {APIRoutes} from '../../constants';
import {fetchUpdateOffers} from '../../store/api-actions';
import {ActionCreator, ActionTypeDetails} from '../../store/actions';
import PageRoom from './page-room';
import PropTypes from 'prop-types';

const PageRoomContainer = ({isAuthorized}) => {
  const id = +useParams().id;
  const isRoomLoaded = useSelector((state) => isRoomLoadedSelector(state));
  const isNearbyLoaded = useSelector((state) => isNearbyLoadedSelector(state));
  const dispatch = useDispatch();

  const roomUrl = APIRoutes.OFFERS + id;
  const nearbyUrl = APIRoutes.OFFERS + id + APIRoutes.NEARBY;

  useEffect(() => {

    dispatch(fetchUpdateOffers(roomUrl, ActionTypeDetails.ROOM));
    dispatch(fetchUpdateOffers(nearbyUrl, ActionTypeDetails.NEARBY));

    return () => {
      dispatch(ActionCreator.updateOffers(null, ActionTypeDetails.ROOM + ActionTypeDetails.CLEAR));
    };
  }, [id]);
  return <PageRoom id={id} isAuthorized={isAuthorized} isRoomLoaded={isRoomLoaded} isNearbyLoaded={isNearbyLoaded}/>;
};

PageRoomContainer.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
};

export default PageRoomContainer;
