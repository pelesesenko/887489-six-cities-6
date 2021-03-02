import React from 'react';
import {connect} from 'react-redux';
import {isAuthorizedSelector, currentUserSelector} from '../../store/selectors';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import SeverError from '../server-error/server-error';
import {logout, fetchOffers} from '../../store/api-actions';

const Header = ({mainFlag, isAuthorized, onLogout, user}) => (
  <>
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {mainFlag
              ? <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </a>
              : <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </Link>}
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">{isAuthorized ? user.email : `Sign In`}</span>
                </Link>
              </li>
              <li className="header__nav-item user">
                <button onClick={onLogout} style={{marginLeft: `30px`, display: `${isAuthorized ? `` : `none`}`}} className="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1={21} y1={12} x2={9} y2={12} />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <SeverError />
  </>
);

Header.propTypes = {
  mainFlag: PropTypes.bool,
  isAuthorized: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthorized: isAuthorizedSelector(state),
  user: currentUserSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogout() {
    dispatch(logout());
    dispatch(fetchOffers());
  },
});

export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
