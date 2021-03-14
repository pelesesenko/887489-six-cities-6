import {combineReducers} from 'redux';

import {offers} from './offers/offers';
import {room} from './room/room';
import {favorites} from './favorites/favorites';
import {authorizationStatus} from './authorization-status/authorization-status';
import {sortOrder} from './sort-order/sort-order';
import {currentCityName} from './current-city-name/current-city-name';
import {currentUser} from './current-user/current-user';
import {serverAvailability} from './server-availability/server-availability';

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
