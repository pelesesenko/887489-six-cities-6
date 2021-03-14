import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../services/api';
import {ActionType, ActionTypeDetails} from './actions';
import {
  fetchOffers,
  fetchUpdateOffers,
  checkAuth,
  login,
  logout,
  resetFavoriteStatus,
} from './api-actions';
import {APIRoutes, AuthorizationStatus} from '../constants';

const api = createApi(() => {});
const apiMock = new MockAdapter(api);

describe(`Async operations work correctly`, () => {

  it(`Should make an API call to /hotels with handling success`, () => {
    const dispatch = jest.fn();
    const offersLoader = fetchOffers();
    apiMock
      .onGet(APIRoutes.OFFERS)
      .reply(200, [{fake: true}]);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: [{fake: true}],
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_SERVER_AVAILABILITY,
          payload: true,
        });
      });
  });
  it(`Should make an API call to /hotels with handling error`, () => {
    const dispatch = jest.fn();
    const offersLoader = fetchOffers();
    apiMock
      .onGet(APIRoutes.OFFERS)
      .reply(500);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_SERVER_AVAILABILITY,
          payload: false,
        });
      });
  });
  it(`Should make an API call to /hotels/:id/nearby with handling success`, () => {
    const dispatch = jest.fn();
    const url = APIRoutes.OFFERS + 1 + APIRoutes.NEARBY;
    const updateOffersLoader = fetchUpdateOffers(url, ActionTypeDetails.NEARBY);
    apiMock
      .onGet(url)
      .reply(200, [{fake: true}]);

    return updateOffersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_OFFERS + ActionTypeDetails.NEARBY,
          payload: [{fake: true}],
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_SERVER_AVAILABILITY,
          payload: true,
        });
      });
  });
  it(`Should make an API get-call to /login with handling success`, () => {
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();
    apiMock
      .onGet(APIRoutes.LOGIN)
      .reply(200, {fake: true});

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_CURRENT_USER,
          payload: {fake: true},
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_SERVER_AVAILABILITY,
          payload: true,
        });
      });
  });
  it(`Should make an API post-call to /login with handling success`, () => {
    const dispatch = jest.fn();
    const loginLoader = login({email: `123@123`});
    apiMock
      .onPost(APIRoutes.LOGIN)
      .reply(200, {email: `123@123`});

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_CURRENT_USER,
          payload: {email: `123@123`},
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_SERVER_AVAILABILITY,
          payload: true,
        });
      });
  });
  it(`Should make an API call to /logout with handling success`, () => {
    const dispatch = jest.fn();
    const logoutLoader = logout();
    apiMock
      .onGet(APIRoutes.LOGOUT)
      .reply(200);

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_CURRENT_USER,
          payload: {},
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.NO_AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_SERVER_AVAILABILITY,
          payload: true,
        });
      });
  });
  it(`Should make an API post-call to /favorite/:id/:status with handling success`, () => {
    const dispatch = jest.fn();
    const favoriteStatusLoader = resetFavoriteStatus(2, 0, ActionTypeDetails.FAVORITE);
    apiMock
      .onPost(APIRoutes.FAVORITES + 2 + `/` + 0)
      .reply(200, {fake: true});

    return favoriteStatusLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_OFFERS + ActionTypeDetails.FAVORITE,
          payload: {fake: true},
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_SERVER_AVAILABILITY,
          payload: true,
        });
      });
  });
});

