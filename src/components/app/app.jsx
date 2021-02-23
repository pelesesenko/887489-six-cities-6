import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {Paths} from '../../constants';
import PageMain from '../page-main/page-main';
import PageSignIn from '../page-sign-in/page-sign-in';
import PageFavorites from '../page-favorites/page-favorites';
import PageRoom from '../page-room/page-room';
import PageNotFound from '../page-not-found/page-not-found';
import PropTypes from 'prop-types';
import {hotelsPropTypes, commentsPropTypes} from '../../prop-types';

const App = (props) => {
  const {offers, reviews, isAuthorized} = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Paths.LOGIN} exact render={() => (
          !isAuthorized ? <PageSignIn/> : <Redirect to={Paths.MAIN}/>
        )}/>
        <Route path={Paths.FAVORITES}
          exact render={() => (
            isAuthorized ? <PageFavorites/> : <Redirect to={Paths.LOGIN}/>
          )}/>
        <Route path={Paths.ROOM} exact>
          <PageRoom reviews={reviews} room={offers[1]} nearOffers={offers.slice(2, 5)}/>
        </Route>
        <Route path={Paths.MAIN} exact render={() => (<PageMain />)}/>
        <Route component={PageNotFound}/>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offersAmountToShow: PropTypes.number.isRequired,
  offers: hotelsPropTypes,
  reviews: commentsPropTypes,
  isAuthorized: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthorized: state.isAuthorized,
});

export {App};
export default connect(mapStateToProps, null)(App);

