import React, {useState} from 'react';

import Header from '../header/header';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';

import PropTypes from 'prop-types';
import {hotelsPropTypes} from '../../prop-types';

const PageMain = (props) => {

  const {offersAmountToShow, offers} = props;
  const [cityName, setCityName] = useState(`Paris`);

  const handleCityClick = (evt) => {
    const target = evt.target.closest(`li`);

    if (!target) {
      return;
    }
    setCityName(target.querySelector(`span`).innerText);
  };

  const offersToShow = [...offers.filter((offer) => offer.city.name === cityName).slice(0, offersAmountToShow)];

  return (
    <div className="page page--gray page--main">
      <Header mainFlag/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul onClick={handleCityClick} className="locations__list tabs__list">
              <li className="locations__item">
                <a className=
                  {`locations__item-link tabs__item ${cityName === `Paris` ? `tabs__item--active` : null}`}>
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className=
                  {`locations__item-link tabs__item ${cityName === `Cologne` ? `tabs__item--active` : null}`}>
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className=
                  {`locations__item-link tabs__item ${cityName === `Brussels` ? `tabs__item--active` : null}`}>
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className=
                  {`locations__item-link tabs__item ${cityName === `Amsterdam` ? `tabs__item--active` : null}`}>
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className=
                  {`locations__item-link tabs__item ${cityName === `Hamburg` ? `tabs__item--active` : null}`}>
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className=
                  {`locations__item-link tabs__item ${cityName === `Dusseldorf` ? `tabs__item--active` : null}`}>
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
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
              <OffersList items={offersToShow}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={offersToShow} city={offersToShow[0].city}/>
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
  offers: hotelsPropTypes,
};

export default PageMain;
