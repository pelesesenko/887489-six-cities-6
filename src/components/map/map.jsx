import React, {useEffect, useRef} from 'react';

import {hotelsPropTypes} from '../../prop-types';
import PropTypes from 'prop-types';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Cities} from '../../constants';

const Map = (props) => {

  const {offers, style = {}, activeOfferId, cityName} = props;

  const mapRef = useRef();
  const city = offers[0].city;

  useEffect(() => {

    const cityLocation = Object.values(city.location);

    mapRef.current = leaflet.map(`map`, {
      center: cityLocation,
      zoom: city.location.zoom,
      zoomControl: true,
      marker: true
    });

    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(mapRef.current);

    mapRef.current.setView(cityLocation, city.location.zoom);

    return () => {
      mapRef.current.remove();
    };
  }, [cityName]);

  useEffect(() => {

    const icon = leaflet.icon({
      iconUrl: `./img/pin.svg`,
      iconSize: [27, 39]
    });

    const markers = offers.map((offer) => (
      leaflet.marker(Object.values(offer.location).slice(0, 2), {icon})
    ));

    markers.forEach((marker, index) => {
      marker.bindTooltip(offers[index].title)
      .addTo(mapRef.current);
    });

    return () => {
      markers.forEach((marker) => {
        marker.remove();
      });
    };

  }, [offers]);

  useEffect(() => {

    const pins = [...mapRef.current.getPane(`markerPane`).children];

    pins.forEach((pin) => {
      pin.src = `./img/pin.svg`;
    });

    if (activeOfferId) {
      const activeIndex = offers.findIndex((offer) => offer.id === activeOfferId);
      pins[activeIndex].src = `./img/pin-active.svg`;
    }
  }, [activeOfferId]);

  return (
    <div id="map" style={style} ref={mapRef}></div>
  );
};

Map.propTypes = {
  offers: hotelsPropTypes,
  cityName: PropTypes.oneOf(Object.values(Cities)),
  style: PropTypes.object,
  activeOfferId: PropTypes.number,
};

export default Map;
