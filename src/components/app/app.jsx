import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Main from '../page-main/page-main';
import SignIn from '../page-sign-in/page-sign-in';
import Favorites from '../page-favorites/page-favorites';
import Room from '../page-room/page-room';
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
        <Route
          render={() => (
            <>
              <h1>
                404.
                <br />
                <small>Page not found</small>
              </h1>
              <Link to="/">Go to main page</Link>
            </>
          )}
        />
        {/* <Route>
          <>
            <h1>
              404.
              <br />
              <small>Page not found</small>
            </h1>
            <Link to="/">Go to main page</Link>
          </>
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offersAmountToShow: PropTypes.number.isRequired,
};

export default App;
