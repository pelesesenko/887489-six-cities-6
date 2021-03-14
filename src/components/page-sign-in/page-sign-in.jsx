import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {isAuthorizedSelector} from '../../store/selectors';
import {login, fetchOffers} from '../../store/api-actions';
import {AppPaths} from '../../constants';
import Header from '../header/header';

const PageSignIn = ({onLogin, isAuthorized}) => {

  const loginRef = useRef();
  const passRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin({
      login: loginRef.current.value,
      password: passRef.current.value
    });
  };

  return (
    <>
      {isAuthorized && <Redirect to={AppPaths.MAIN}/>}
      <div className="page page--gray page--login">
        <Header/>
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form data-testid="login-form" onSubmit={handleSubmit} className="login__form form" action="#" method="post">
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input ref={loginRef}
                    className="login__input form__input"
                    type="email" name="email"
                    placeholder="Email" required />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input ref={passRef}
                    className="login__input form__input"
                    type="password" name="password"
                    placeholder="Password" required />
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

PageSignIn.propTypes = {
  onLogin: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthorized: isAuthorizedSelector(state),
});


const mapDispatchToProps = (dispatch) => ({
  onLogin(authData) {
    dispatch(login(authData));
    dispatch(fetchOffers());
  },
});

export {PageSignIn};
export default connect(mapStateToProps, mapDispatchToProps)(PageSignIn);

