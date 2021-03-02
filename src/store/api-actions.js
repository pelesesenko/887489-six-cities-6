import {ActionCreator} from '../store/actions';
import {AuthorizationStatus, APIRoutes, ErrorStatus} from '../constants';
import {offersAdapter, offerAdapter} from '../services/adapters';

export const handleServerError = (err, dispatch) => {
  const {response} = err;
  if (response.status !== ErrorStatus.UNAUTHORIZED && response.status !== ErrorStatus.NOT_FOUND) {
    dispatch(ActionCreator.setServerAvailability(false));
  }
};

export const handleSuccess = (dispatch) => {
  dispatch(ActionCreator.setServerAvailability(true));
};

export const fetchOffers = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.OFFERS)
  .then(({data}) => offersAdapter(data))
  .then((data) => dispatch(ActionCreator.loadOffers(data)))
  .then(() => handleSuccess(dispatch))
  .catch((err) => handleServerError(err, dispatch))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.LOGIN)
  .then(({data}) => dispatch(ActionCreator.setCurrentUser({
    id: data.id,
    email: data.email,
    name: data.name,
  })))
  .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
  .then(() => handleSuccess(dispatch))
  .catch((err) => handleServerError(err, dispatch))
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoutes.LOGIN, {email, password})
  .then(({data}) => dispatch(ActionCreator.setCurrentUser({
    id: data.id,
    email: data.email,
    name: data.name,
  })))
  .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
  .then(() => handleSuccess(dispatch))
  .catch((err) => handleServerError(err, dispatch))
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.LOGOUT)
  .then(() => dispatch(ActionCreator.setCurrentUser({})))
  .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)))
  .then(() => handleSuccess(dispatch))
  .catch((err) => handleServerError(err, dispatch))
);

export const resetFavoriteStatus = (id, status) => (dispatch, _getState, api) => (
  api.post(APIRoutes.FAVORITES + id + `/` + status)
  .then(({data}) => offerAdapter(data))
  .then((data) => dispatch(ActionCreator.updateOffers(data)))
  .then(() => handleSuccess(dispatch))
  .catch((err) => handleServerError(err, dispatch))
);
