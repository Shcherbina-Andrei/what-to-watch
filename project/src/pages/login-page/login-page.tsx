import { FormEvent, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Navigate} from 'react-router-dom';
import {checkAuthAction, loginAction} from '../../store/api-actions';
import {AuthData} from '../../types/auth-data';
import {AppRoute, AuthorizationStatus } from '../../const';
import {toast} from 'react-toastify';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function LoginPage(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const onSubmitHandle = async (authData: AuthData) => {
    await dispatch(loginAction(authData));
    await dispatch(checkAuthAction());
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Root} />;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null) {
      if (!(String(passwordRef.current.value).match(/^(?=.*\d)(?=.*[A-Za-zА-Яа-я])/gm))) {
        toast.warn('The password must contain at least 1 number and 1 letter');
        return;
      }
      onSubmitHandle({
        login: emailRef.current.value,
        password: passwordRef.current.value
      });
    }
  };

  return (
    <div className="user-page">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" ref={emailRef} />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" ref={passwordRef} />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;
