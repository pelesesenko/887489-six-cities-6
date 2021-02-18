import React, {useEffect, useRef} from 'react';

import {hotelsPropTypes, cityPropTypes} from '../../prop-types';
import PropTypes from 'prop-types';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = (props) => {

  const {offers, city, style = {}, activeOfferId} = props;
  console.log(activeOfferId)
  const mapRef = useRef();

  const icon = leaflet.icon({
    iconUrl: `./img/pin.svg`,
    iconSize: [20, 30]
  });

  const activeIcon = leaflet.icon({
    iconUrl: `./img/pin-active.svg`,
    iconSize: [20, 30]
  });

  const markers = offers.map(
    (offer) => leaflet
    .marker(Object.values(offer.location).slice(0, 2), {icon}));


  useEffect(() => {

    const cityLocation = Object.values(city.location).slice(0, 2);

    mapRef.current = leaflet.map(`map`, {
      center: cityLocation,
      zoom: city.location.zoom,
      zoomControl: false,
      marker: true
    });


    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(mapRef.current);
    mapRef.current.setView(cityLocation, city.location.zoom);

    markers.forEach((marker) => {
      marker.addTo(mapRef.current);
    });

    return () => {
      mapRef.current.remove();
    };
  }, [city]);

  useEffect(() => {

    markers.forEach((marker, index) => {
      marker.setIcon((offers[index].id === activeOfferId) ? activeIcon : icon)
      .bindTooltip(offers[index].title)
      .addTo(mapRef.current);
    });

    return () => {
      markers.forEach((marker) => {
        marker.remove()
      })
    }
  }, [activeOfferId]);

  return (
    <div id="map" style={style} ref={mapRef}></div>
  );
};

Map.propTypes = {
  city: cityPropTypes,
  offers: hotelsPropTypes,
  style: PropTypes.object
};

export default Map;
