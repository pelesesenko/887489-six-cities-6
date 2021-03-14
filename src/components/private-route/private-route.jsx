import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppPaths, AuthorizationStatus} from '../../constants';
import {isAuthorizedSelector, authorizationStatusSelector} from '../../store/selectors';
import Loading from '../loading/loading';

const PrivateRoute = ({render, ...rest}) => {

  const isAuthorized = useSelector((state) => isAuthorizedSelector(state));
  const isNotChecked = useSelector((state) => authorizationStatusSelector(state) === AuthorizationStatus.NOT_CHECKED);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return (
          isNotChecked
            ? <Loading/>
            : isAuthorized
            && render(routeProps)
            || <Redirect to={AppPaths.LOGIN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default PrivateRoute;
