import React from 'react';
import {render} from '@testing-library/react';
import {Cities} from '../../constants';
import {filled} from '../../services/test-wrapper/mock-states';

import Map from './map';

describe(`Test Map`, () => {
  let offers;
  beforeEach(() => {
    offers = filled.offers.entities.filter((offer) => offer.city.name === Cities.PARIS);
  });

  it(`Map should render correctly`, () => {

    const {container} = render(
        <Map cityName={Cities.PARIS} offers={offers} activeOfferId={null} />
    );
    const leafletMap = container.querySelector(`.leaflet-map-pane`);
    const tilePane = container.querySelector(`.leaflet-tile-pane`);
    const markerPane = container.querySelector(`.leaflet-marker-pane`);
    const markers = markerPane.querySelectorAll(`[src^='./img/pin']`);
    const activeMarkers = markerPane.querySelectorAll(`[src^='./img/pin-active']`);

    expect(leafletMap).toBeInTheDocument();
    expect(tilePane).toBeInTheDocument();
    expect(markerPane).toBeInTheDocument();
    expect(markers.length).toBe(4);
    expect(activeMarkers.length).toBe(0);
  });

  it(`Map should render active pin correctly`, () => {

    const {container} = render(
        <Map cityName={Cities.PARIS} offers={offers} activeOfferId={13} />
    );
    const markerPane = container.querySelector(`.leaflet-marker-pane`);
    const markers = markerPane.querySelectorAll(`[src^='./img/pin']`);
    const activeMarkers = markerPane.querySelectorAll(`[src^='./img/pin-active']`);

    expect(markerPane).toBeInTheDocument();
    expect(markers.length).toBe(4);
    expect(activeMarkers.length).toBe(1);
    expect([...markers].indexOf(activeMarkers[0])).toBe(1);
  });
});


