import {combineReducers} from 'redux';

import {offers} from './offers';
import {room} from './room';
import {favorites} from './favorites';
import {authorizationStatus} from './auth-status';
import {sortOrder} from './sort-order';
import {currentCityName} from './current-city';
import {currentUser} from './current-user';
import {serverAvailability} from './server-availability';

export const reducer = combineReducers({
  currentCityName,
  sortOrder,
  offers,
  room,
  favorites,
  authorizationStatus,
  currentUser,
  serverAvailability,
});
