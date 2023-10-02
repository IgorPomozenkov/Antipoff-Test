import React, { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { authLoading } from '@/store/auth/selectors';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import './style.css';

const Auth: React.FC = () => {
  const loading = useSelector(authLoading, shallowEqual);
  //const loaded = useSelector(authLoaded, shallowEqual);
  const [loginMode, setLoginMode] = useState(false);

  return (
    <div className="auth mainAnim">
      <div className="auth__content">
        {loading && (
          <div className="mainLoading">
            <CircularProgress color="inherit" />
          </div>
        )}

        {!loginMode && <h2 className="heading">Регистрация</h2>}
        {loginMode && <h2 className="heading">Вход</h2>}

        {!loginMode && <SignUpForm setMode={setLoginMode} />}
        {loginMode && <LoginForm setMode={setLoginMode} />}
      </div>
    </div>
  );
};

export default Auth;
