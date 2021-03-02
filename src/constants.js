

export const CardTypes = {
  MAIN_OFFERS: `main-offers`,
  FAVORITES_OFFERS: `favorites-offers`,
  NEARBY_OFFERS: `nearby-offers`,
};

export const Cities = {
  PARIS: `Paris`,
  AMSTERDAM: `Amsterdam`,
  COLOGNE: `Cologne`,
  BRUSSELS: `Brussels`,
  HAMBURG: `Hamburg`,
  DUSSELDORF: `Dusseldorf`,
};

export const SortOrders = {
  POPULAR: `Popular`,
  PRICE_UP: `Price: low to high`,
  PRICE_DOWN: `Price: high to low`,
  RATING: `Top rated first`,
};

export const Grades = [`perfect`, `good`, `not bad`, `badly`, `terribly`];

export const AppPaths = {
  MAIN: `/`,
  ROOM: `/offer/:id?`,
  FAVORITES: `/favorites`,
  LOGIN: `/login`,
  NOT_FOUND: `/not-found`,
};

export const APIRoutes = {
  OFFERS: `/hotels/`,
  FAVORITES: `/favorite/`,
  COMMENTS: `/comments/`,
  NEARBY: `/nearby`,
  LOGIN: `/login`,
  LOGOUT: `/logout`,
};

export const roomLink = `/offer/`;

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};

export const ErrorStatus = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
};

export const ReviewLength = {
  MAX: 300,
  MIN: 50,
};


