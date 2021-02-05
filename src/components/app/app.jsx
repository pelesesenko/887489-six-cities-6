import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Main from '../page-main/page-main';
import SignIn from '../page-sign-in/page-sign-in';
import Favorites from '../page-favorites/page-favorites';
import Room from '../page-room/page-room';
import NotFound from '../page-not-found/page-not-found';
import PropTypes from 'prop-types';

const App = (props) => {
  const {offersAmountToShow} = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={SignIn}/>
        <Route path="/favorites" exact component={Favorites}/>
        <Route path="/offer/:id?" exact component={Room}/>
        <Route path="/" exact >
          <Main offersAmountToShow={offersAmountToShow} />
        </Route>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offersAmountToShow: PropTypes.number.isRequired,
};

export default App;
