import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {AppPaths} from '../../constants';
import PrivateRoute from '../private-route/private-route';
import PageMain from '../page-main/page-main';
import PageSignIn from '../page-sign-in/page-sign-in';
import PageFavorites from '../page-favorites/page-favorites';
import PageNotFound from '../page-not-found/page-not-found';
import PageRoomContainer from '../page-room/page-room-container';
import './app.css';


const App = () => {
  return (
    <Switch>
      <Route path={AppPaths.LOGIN} exact render={() => (<PageSignIn/>)}/>
      <PrivateRoute path={AppPaths.FAVORITES} exact render={() => <PageFavorites/>}/>
      <Route path={AppPaths.ROOM} exact render={() => <PageRoomContainer/>}/>
      <Route path={AppPaths.MAIN} exact render={() => <PageMain />}/>
      <Route path={AppPaths.NOT_FOUND} exact component={PageNotFound}/>
      <Route >
        <PageNotFound/>
      </Route>
    </Switch>
  );
};

export default App;

