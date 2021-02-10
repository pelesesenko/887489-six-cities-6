import React from 'react';
import PropTypes from 'prop-types';

const RoomGalleryItem = ({url}) => (
  <div className="property__image-wrapper">
    <img className="property__image" src={url} alt="Photo studio" />
  </div>
);
RoomGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
};

export default RoomGalleryItem;
