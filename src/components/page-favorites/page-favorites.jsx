import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../header/header';
import FavoritesList from '../favorites-list/favorites-list';
import Loading from '../loading/loading';
import {Link} from 'react-router-dom';
import {isFavoritesLoadedSelector, favoritesSelector} from '../../store/selectors';
import {APIRoutes} from '../../constants';
import {ActionCreator, ActionTypeDetails} from '../../store/actions';
import {fetchUpdateOffers} from '../../store/api-actions';

const PageFavorites = () => {

  const isFavoritesLoaded = useSelector((state) => isFavoritesLoadedSelector(state));
  const favorites = useSelector((state) => favoritesSelector(state));
  const dispatch = useDispatch();

  const favoritesUrl = APIRoutes.FAVORITES;

  useEffect(() => {

    dispatch(fetchUpdateOffers(favoritesUrl, ActionTypeDetails.FAVORITES));

    return () => {
      dispatch(ActionCreator.updateOffers(null, ActionTypeDetails.FAVORITES + ActionTypeDetails.CLEAR));
    };
  }, []);

  return (
    <div className={`page
    ${isFavoritesLoaded && !favorites.length ? ` page--favorites-empty` : ``}`} >
      <Header/>
      {!isFavoritesLoaded
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
