import React, { useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectAuth, authFailure } from '@/store/auth/selectors';
import { initUserApi, userLogout } from '@/store/auth/slicer';
import { getUsersApi, usersClear } from '@/store/users/slicer';
import { menuLinks } from '@/utils/constants';
import { Exit } from '@/assets/images/Icons';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const headerRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { authed, currUser } = useSelector(selectAuth, shallowEqual);
  const authError = useSelector(authFailure, shallowEqual);
  const [errorSlicer, setErrorSlicer] = useState('');

  useEffect(() => {
    dispatch(initUserApi());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!!currUser?.token) dispatch(getUsersApi());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currUser?.token]);

  useEffect(() => {
    const regPathUser = pathname.match(/^\/users$/);
    const regPathUsers = pathname.match(/^\/users\/.{1,}/);
    const menuPath = pathname === '/' || pathname === '/users' || regPathUsers;

    menuLinks.forEach(link => {
      const regLink = new RegExp(`^${link.path}`);
      if (pathname.match(regLink)) document.title = link.title;
    });

    if (menuPath && !authed) {
      navigate('/auth');
      setTimeout(() => {
        setErrorSlicer('');
      }, 600);
    }

    if (pathname === '/auth' && !!authed) navigate('/');

    if (pathname === '/auth') headerRef.current.classList.add('displayNone');
    else headerRef.current.classList.remove('displayNone');

    if (regPathUser) navigate('/');
    //
  }, [authed, currUser, pathname, navigate]);

  useEffect(() => {
    if (!!authError) setErrorSlicer(authError);
  }, [authError]);

  const handleExit = () => {
    dispatch(userLogout());
    dispatch(usersClear());
  };

  return (
    <header ref={headerRef}>
      <div className="container">
        <button className="headerBtn" type="button" onClick={handleExit}>
          Выход
        </button>
        <button className="headerBtn mobileBtn" type="button" onClick={handleExit}>
          {Exit}
        </button>
      </div>
    </header>
  );
};

export default Header;
