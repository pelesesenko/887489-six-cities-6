import React, {useRef} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../header/header';
import {login} from '../../store/api-actions';

const PageSignIn = ({onLogin}) => {

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
    <div className="page page--gray page--login">
      <Header/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={handleSubmit} className="login__form form" action="#" method="post">
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
  );
};

PageSignIn.propTypes = {
  onLogin: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  onLogin(authData) {
    dispatch(login(authData));
  },
});

export {PageSignIn};
export default connect(null, mapDispatchToProps)(PageSignIn);

