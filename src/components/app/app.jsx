import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {AppPaths, AuthorizationStatus} from '../../constants';
import PrivateRoute from '../private-route/private-route';
import PageMain from '../page-main/page-main';
import PageSignIn from '../page-sign-in/page-sign-in';
import PageFavorites from '../page-favorites/page-favorites';
import PageRoom from '../page-room/page-room';
import PageNotFound from '../page-not-found/page-not-found';
import PropTypes from 'prop-types';
import {hotelsPropTypes, commentsPropTypes} from '../../prop-types';

const App = ({isAuthorized}) => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppPaths.LOGIN} exact render={() => (
          !isAuthorized? <PageSignIn/> : <Redirect to={AppPaths.MAIN}/>
        )}/>
        <PrivateRoute exact
          path={AppPaths.FAVORITES}
          render={() => <PageFavorites/>}
        />
        <Route path={AppPaths.ROOM} exact>
          <PageRoom isAuthorized={isAuthorized}/>
        </Route>
        <Route path={AppPaths.MAIN} exact render={() => (<PageMain />)}/>
        <Route path={AppPaths.NOT_FOUND} exact component={PageNotFound}/>
        <Route component={PageNotFound}/>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthorized: state.authorizationStatus === AuthorizationStatus.AUTH,
});

export {App};
export default connect(mapStateToProps, null)(App);

