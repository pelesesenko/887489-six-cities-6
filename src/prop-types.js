import PropTypes from 'prop-types';

export const userPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isPro: PropTypes.bool,
  avatarUrl: PropTypes.string
}).isRequired;

export const hotelPropTypes = PropTypes.shape({
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number
    }).isRequired
  }).isRequired,
  previewImage: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool,
  isPremium: PropTypes.bool,
  rating: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  bedrooms: PropTypes.number.isRequired,
  maxAdults: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string).isRequired,
  host: userPropTypes,
  description: PropTypes.string,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number
  }).isRequired,
  id: PropTypes.number.isRequired
});

export const hotelsPropTypes = PropTypes.arrayOf(hotelPropTypes).isRequired;

export const cityPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number
  }).isRequired
}).isRequired;

export const commentPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  user: userPropTypes,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
});

export const commentsPropTypes = PropTypes.arrayOf(commentPropTypes).isRequired;
