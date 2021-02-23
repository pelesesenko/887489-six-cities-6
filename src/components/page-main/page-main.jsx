import React, {useState} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions';
import {offersInCitySelector} from '../../store/selectors';
import {Cities, SortOrders} from '../../constants';
import Header from '../header/header';
import CitiesList from '../cities-list/cities-list';
import SortSelect from '../sort-select/sort-select';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';

import PropTypes from 'prop-types';
import {hotelsPropTypes} from '../../prop-types';

const PageMain = (props) => {

  const {
    offersInCity,
    currentCityName,
    onSetCity,
    onSetSortOrder,
    sortOrder,
  } = props;

  const [activeOfferId, setActiveOfferId] = useState(null);

  const onChangeActiveOffer = (id) => {
    setActiveOfferId(id);
  };

  const mapStyle = {
    height: `100%`
  };

  return (
    <div className="page page--gray page--main">
      <Header mainFlag/>
      <main className={`page__main page__main--index${!offersInCity.length ? ` page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList currentCityName={currentCityName} onSetCity={onSetCity}/>
          </section>
        </div>
        <div className="cities">
          {!offersInCity.length
            ?
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {currentCityName}</p>
                </div>
              </section>
              <div className="cities__right-section" />
            </div>
            :
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{`${offersInCity.length} places to stay in ${currentCityName}`}</b>
                <SortSelect order={sortOrder} onSetOrder={onSetSortOrder}/>
                <OffersList items={offersInCity} onChangeActiveOffer={onChangeActiveOffer}/>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map offers={offersInCity} cityName={currentCityName} style={mapStyle} activeOfferId={activeOfferId} />
                </section>
              </div>
            </div>}
        </div>
      </main>
    </div>
  );
};

PageMain.propTypes = {
  offersInCity: hotelsPropTypes,
  currentCityName: PropTypes.oneOf(Object.values(Cities)),
  sortOrder: PropTypes.oneOf(Object.values(SortOrders)),
  onSetCity: PropTypes.func.isRequired,
  onSetSortOrder: PropTypes.func
};

const mapStateToProps = (state) => ({
  offersInCity: offersInCitySelector(state),
  currentCityName: state.currentCityName,
  offersAmountToShow: state.offersAmountToShow,
  sortOrder: state.sortOrder,
});

const mapDispatchToProps = (dispatch) => ({
  onSetCity(cityName) {
    dispatch(ActionCreator.setCity(cityName));
  },
  onSetSortOrder(sortOrder) {
    dispatch(ActionCreator.setSortOrder(sortOrder));
  }
});

export {PageMain};
export default connect(mapStateToProps, mapDispatchToProps)(PageMain);
