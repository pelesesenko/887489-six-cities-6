import React, {useEffect, useRef} from 'react';

import {hotelsPropTypes, cityPropTypes} from '../../prop-types';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({offers, city}) => {

  const mapRef = useRef();
  useEffect(() => {

    const cityLocation = Object.values(city.location).slice(0, 2);
    const points = offers.map((offer) => Object.values(offer.location).slice(0, 2));

    const icon = leaflet.icon({
      iconUrl: `./img/pin.svg`,
      iconSize: [20, 30]
    });

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

    points.forEach((point) => {
      leaflet
      .marker(point, {icon})
      .addTo(mapRef.current);
    });

    return () => {
      mapRef.current.remove();
    };
  }, [offers, city]);


  return (
    <div id="map" style={{height: `100%`}} ref={mapRef}></div>
  );
};

Map.propTypes = {
  city: cityPropTypes,
  offers: hotelsPropTypes,
};

export default Map;
