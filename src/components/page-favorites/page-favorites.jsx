import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createApi} from '../../services/api';
import {hotelsPropTypes} from '../../prop-types';
import Header from '../header/header';
import FavoritesList from '../favorites-list/favorites-list';
import Loading from '../loading/loading';
import {Link} from 'react-router-dom';
import {groupOffersByCity} from '../../utilities/utilities';
import {offersAdapter} from '../../services/adapters';
import {APIRoutes} from '../../constants';
import {ActionCreator} from '../../store/actions';

const PageFavorites = ({onOffersUpd}) => {

  const [favorites, setFavorites] = useState(null);

  const dataApi = createApi();

  useEffect(() => {
    dataApi.get(APIRoutes.FAVORITES)
    .then(({data}) => offersAdapter(data))
    .then((data) => onOffersUpd(data))
    .then((data) => groupOffersByCity(data))
    .then((data) => setFavorites(data));
  }, []);


  return (
    <div className={`page
    ${favorites !== null && !favorites.length ? ` page--favorites-empty` : ``}`}>
      <Header/>
      {favorites === null
        ? <Loading />

        : (<main className={`page__main page__main--favorites${!favorites.length ? ` page__main--favorites-empty` : ``}`}>
          <div className="page__favorites-container container">
            {favorites.length
              ?
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <FavoritesList favorites={favorites} />
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
        </main>)}
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </Link>
      </footer>
    </div>
  );
};

PageFavorites.propTypes = {
  favorites: hotelsPropTypes,
  onOffersUpd: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  favorites: state.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  onOffersUpd(offers) {
    dispatch(ActionCreator.updateOffers(offers));
    return offers;
  }
});

export {PageFavorites};
export default connect(mapStateToProps, mapDispatchToProps)(PageFavorites);
