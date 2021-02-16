import React from 'react';

import {hotelsPropTypes} from '../../prop-types';
import Header from '../header/header';
import FavoritesList from '../favorites-list/favorites-list';

const PageFavorites = ({favorites}) => {

  const prepFavorites = [];
  let swap = null;
  for (let offer of favorites.slice().sort((a, b)=>a.city.name > b.city.name ? 1 : -1)) {
    if (offer.city.name !== swap) {
      prepFavorites.push({cityName: offer.city.name, favoritesInCity: []});
      swap = offer.city.name;
    }
    prepFavorites[prepFavorites.length - 1].favoritesInCity.push(offer);
  }

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList prepFavorites={prepFavorites} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </a>
      </footer>
    </div>
  );
};

PageFavorites.propTypes = {
  favorites: hotelsPropTypes,
};

export default PageFavorites;
