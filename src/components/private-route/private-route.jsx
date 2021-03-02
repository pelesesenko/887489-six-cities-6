import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppPaths} from '../../constants';
import {isAuthorizedSelector} from '../../store/selectors';

const PrivateRoute = ({render, path, exact, isAuthorized}) => {

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return (
          isAuthorized
            ? render(routeProps)
            : <Redirect to={AppPaths.LOGIN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthorized: isAuthorizedSelector(state),
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
