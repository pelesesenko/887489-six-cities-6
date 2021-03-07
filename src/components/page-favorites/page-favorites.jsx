import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {createApi} from '../../services/api';
import Header from '../header/header';
import FavoritesList from '../favorites-list/favorites-list';
import Loading from '../loading/loading';
import {Link} from 'react-router-dom';
import {groupOffersByCity} from '../../services/utilities';
import {APIRoutes, ErrorStatus} from '../../constants';
import {ActionCreator} from '../../store/actions';

const PageFavorites = () => {

  const [favorites, setFavorites] = useState(null);

  const dispatch = useDispatch();

  const onOffersUpd = (offers) => {
    dispatch(ActionCreator.updateOffers(offers));
    return offers;
  };
  const onLoadSuccess = () => {
    dispatch(ActionCreator.setServerAvailability(true));
  };
  const onLoadError = (err) => {
    const {response} = err;
    if (response.status !== ErrorStatus.UNAUTHORIZED) {
      dispatch(ActionCreator.setServerAvailability(false));
    }
  };

  const dataApi = createApi();

  useEffect(() => {
    dataApi.get(APIRoutes.FAVORITES)
    .then(({data}) => onOffersUpd(data))
    .then((data) => groupOffersByCity(data))
    .then((data) => setFavorites(data))
    .then(() => onLoadSuccess())
    .catch((err) => onLoadError(err));
  }, []);


  return (
    <div className={`page
    ${favorites !== null && !favorites.length ? ` page--favorites-empty` : ``}`} >
      <Header/>
      {favorites === null
        ? <Loading />

        : (<main className={`page__main page__main--favorites${!favorites.length ? ` page__main--favorites-empty` : ``}`}>
          <div className="page__favorites-container container" >
            {favorites.length
              ?
              <section className="favorites" style={{minHeight: `75vh`}}>
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

export default PageFavorites;
