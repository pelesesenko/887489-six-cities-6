import {ActionCreator} from '../store/actions';
import {AuthorizationStatus, APIRoutes} from '../constants';
import {offersAdapter} from '../services/adapters';

export const fetchOffers = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.OFFERS)
  .then(({data}) => offersAdapter(data))
  .then((data) => dispatch(ActionCreator.loadOffers(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.LOGIN)
  .then(({data}) => dispatch(ActionCreator.setCurrntUser({
    id: data.id,
    email: data.email,
    name: data.name,
  })))
  .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
  .catch(() =>{})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoutes.LOGIN, {email, password})
  .then(({data}) => dispatch(ActionCreator.setCurrntUser({
    id: data.id,
    email: data.email,
    name: data.name,
  })))
  .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
  .catch(() =>{})
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.LOGOUT)
  .then(() => dispatch(ActionCreator.setCurrntUser({})))
  .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)))

);
