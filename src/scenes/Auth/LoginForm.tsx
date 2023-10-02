import React, { ChangeEvent, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { authFailure } from '@/store/auth/selectors';
import { userLogin } from '@/store/auth/slicer';
import { PropsForm } from './types';
import { checkFieldEmail, checkFieldPassw } from '@/utils/methods';
import PasswField from '@/components/PasswField';

const fields = { email: false, passw: false };

const LoginForm: React.FC<PropsForm> = React.memo((props: PropsForm) => {
  const dispatch = useDispatch();
  // const loading = useSelector(authLoading, shallowEqual);
  // const loaded = useSelector(authLoaded, shallowEqual);
  const authError = useSelector(authFailure, shallowEqual);
  const fieldEmailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [passw, setPassw] = useState('');
  const [fieldsError, setFieldsError] = useState(fields);

  const { setMode } = props;

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 50) setEmail(e.target.value);
    setFieldsError({ ...fieldsError, email: false });
    fieldEmailRef.current.classList.remove('field_error');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkFieldEmail(email)) {
      setFieldsError({ ...fieldsError, email: true });
      fieldEmailRef.current.classList.add('field_error');
      return;
    }
    if (checkFieldPassw(passw)) {
      setFieldsError({ ...fieldsError, passw: true });
      return;
    }

    if (passw.length < 4) {
      setFieldsError({ ...fieldsError, passw: true });
      return;
    }

    if (!!passw && !!email) {
      dispatch(userLogin(email, passw));
      setFieldsError(fields);
    }
  };

  const handleToggleMode = (val: boolean) => () => {
    setMode(val);
  };

  return (
    <>
      <form id="auth-form" className="authForm" onSubmit={handleSubmit}>
        <p className="title">Электронная почта</p>
        <div className="fieldWrap">
          <input
            ref={fieldEmailRef}
            className="field"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            required
            autoComplete="on"
            value={email}
            onChange={changeEmail}
            pattern="(.{1,})@(.{1,}).([A-z]{2,8})"
            maxLength={70}
          />
          {fieldsError.email && <p className="textErr">Ошибка</p>}
        </div>

        <p className="title">Пароль</p>
        <div className="fieldWrap">
          <PasswField
            label="******"
            value={passw}
            setValue={setPassw}
            passwErr={fieldsError.passw}
            setPasswErr={setFieldsError}
            fields={fieldsError}
            confirm={false}
          />
          {fieldsError.passw && <p className="textErr">Ошибка</p>}
        </div>

        <button className="btnSubmit" type="submit">
          Войти
        </button>

        <p className="loginText">
          <button className="btn" type="button" onClick={handleToggleMode(false)}>
            Зарегистрироваться
          </button>
        </p>

        {!!authError && <p className="textErr">Ошибка</p>}
      </form>
    </>
  );
});

export default LoginForm;
