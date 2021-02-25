import React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {hotelsPropTypes} from '../../prop-types';
import Header from '../header/header';
import FavoritesList from '../favorites-list/favorites-list';

const PageFavorites = ({favorites}) => {

  // if (!isAuthorized) {history.push(`/login`);}

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
    <div className={`page${!favorites.length ? ` page--favorites-empty` : ``}`}>
      <Header/>
      <main className={`page__main page__main--favorites${!favorites.length ? ` page__main--favorites-empty` : ``}`}>
        <div className="page__favorites-container container">
          {favorites.length
            ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList prepFavorites={prepFavorites} />
            </section>
            :
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          }
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
  // history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  favorites: state.favorites,
});

export {PageFavorites};
export default connect(mapStateToProps, null)(PageFavorites);
