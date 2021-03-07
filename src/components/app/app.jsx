import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {AppPaths} from '../../constants';
import {fetchOffers} from '../../store/api-actions';
import {isAuthorizedSelector, isOffersLoadedSelector} from '../../store/selectors';
import PrivateRoute from '../private-route/private-route';
import PageMain from '../page-main/page-main';
import PageSignIn from '../page-sign-in/page-sign-in';
import PageFavorites from '../page-favorites/page-favorites';
import PageNotFound from '../page-not-found/page-not-found';
import Loading from '../loading/loading';
import PropTypes from 'prop-types';
import PageRoomContainer from '../page-room/page-room-container';
import ServerError from '../server-error/server-error';
import './app.css';


const App = ({isAuthorized, isOffersLoaded, onLoadOffers}) => {

  useEffect(() => {
    if (!isOffersLoaded) {
      onLoadOffers();
    }
  }, [isOffersLoaded]
  );

  return (!isOffersLoaded
    ?
    <>
      <ServerError/>
      <Loading />
    </>
    :
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
          <PageRoomContainer isAuthorized={isAuthorized}/>
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
  isAuthorized: isAuthorizedSelector(state),
  isOffersLoaded: isOffersLoadedSelector(state),
  // isServerAvailable: serverAvailabilitySelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadOffers() {
    dispatch(fetchOffers());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

