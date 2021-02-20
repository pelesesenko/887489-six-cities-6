import React, {useState} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions';
import {Cities} from '../../constants';
import Header from '../header/header';
import CitiesList from '../cities-list/cities-list';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';

import PropTypes from 'prop-types';
import {hotelsPropTypes} from '../../prop-types';

const PageMain = (props) => {

  const {offersAmountToShow, offersInCity, currentCityName, onSetCity} = props;

  const [activeOfferId, setActiveOfferId] = useState(null);

  const onChangeActiveOffer = (id) => {
    setActiveOfferId(id);
  };

  const offersToShow = offersInCity.slice(0, offersAmountToShow);

  const mapStyle = {
    height: `100%`
  };

  return (
    <div className="page page--gray page--main">
      <Header mainFlag/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList currentCityName={currentCityName} onSetCity={onSetCity}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${offersInCity.length} places to stay in ${currentCityName}`}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OffersList items={offersToShow} onChangeActiveOffer={onChangeActiveOffer}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={offersToShow} city={offersToShow[0].city} style={mapStyle} activeOfferId={activeOfferId} markers={null}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

PageMain.propTypes = {
  offersAmountToShow: PropTypes.number.isRequired,
  offersInCity: hotelsPropTypes,
  currentCityName: PropTypes.oneOf(Object.values(Cities)),
  onSetCity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offersInCity: state.offers.filter((offer) => offer.city.name === state.currentCityName),
  currentCityName: state.currentCityName,
  offersAmountToShow: state.offersAmountToShow,
});

const mapDispatchToProps = (dispatch) => ({
  onSetCity(cityName) {
    dispatch(ActionCreator.setCity(cityName));
  },
});

export {PageMain};
export default connect(mapStateToProps, mapDispatchToProps)(PageMain);
