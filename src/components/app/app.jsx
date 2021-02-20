import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PageMain from '../page-main/page-main';
import PageSignIn from '../page-sign-in/page-sign-in';
import PageFavorites from '../page-favorites/page-favorites';
import PageRoom from '../page-room/page-room';
import PageNotFound from '../page-not-found/page-not-found';
import PropTypes from 'prop-types';
import {hotelsPropTypes, commentsPropTypes} from '../../prop-types';

const App = (props) => {
  const {offers, reviews, favorites} = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={PageSignIn}/>
        <Route path="/favorites" exact>
          <PageFavorites favorites={favorites}/>
        </Route>
        <Route path="/offer/:id?" exact>
          <PageRoom reviews={reviews} room={offers[1]} nearOffers={offers.slice(2, 5)}/>
        </Route>
        <Route path="/" exact>
          <PageMain />
        </Route>
        <Route component={PageNotFound}/>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offersAmountToShow: PropTypes.number.isRequired,
  offers: hotelsPropTypes,
  favorites: hotelsPropTypes,
  reviews: commentsPropTypes
};

export default App;
