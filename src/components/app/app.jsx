import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {AppPaths, AuthorizationStatus} from '../../constants';
import {fetchOffers} from '../../store/api-actions';
import PrivateRoute from '../private-route/private-route';
import PageMain from '../page-main/page-main';
import PageSignIn from '../page-sign-in/page-sign-in';
import PageFavorites from '../page-favorites/page-favorites';
import PageRoom from '../page-room/page-room';
import PageNotFound from '../page-not-found/page-not-found';
import Loading from '../loading/loading';
import PropTypes from 'prop-types';


const App = ({isAuthorized, isOffersLoaded, onLoadOffers}) => {

  useEffect(() => {
    if (!isOffersLoaded) {
      onLoadOffers();
    }
  }, [isOffersLoaded]
  );

  return (!isOffersLoaded ? <Loading /> :
    <BrowserRouter>
      <Switch>
        <Route path={AppPaths.LOGIN} exact render={() => (
          !isAuthorized ? <PageSignIn/> : <Redirect to={AppPaths.MAIN}/>
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
  onLoadOffers: PropTypes.func.isRequired,
  isOffersLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthorized: state.authorizationStatus === AuthorizationStatus.AUTH,
  isOffersLoaded: state.offers.isLoaded
});

const mapDispatchToProps = (dispatch) => ({
  onLoadOffers() {
    dispatch(fetchOffers());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

