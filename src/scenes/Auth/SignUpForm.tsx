import React, { ChangeEvent, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { authFailure } from '@/store/auth/selectors';
import { userRegister } from '@/store/auth/slicer';
import { PropsForm } from './types';
import { checkFieldEmail, checkFieldName, checkFieldPassw } from '@/utils/methods';
import PasswField from '@/components/PasswField';

const fields = { name: false, email: false, passw: false, confirmPassw: false };

const SignUpForm: React.FC<PropsForm> = React.memo((props: PropsForm) => {
  const dispatch = useDispatch();
  // const loading = useSelector(authLoading, shallowEqual);
  // const loaded = useSelector(authLoaded, shallowEqual);
  const authError = useSelector(authFailure, shallowEqual);
  const fieldNameRef = useRef<HTMLInputElement>(null);
  const fieldEmailRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passw, setPassw] = useState('');
  const [confirmPassw, setConfirmPassw] = useState('');
  const [fieldsError, setFieldsError] = useState(fields);

  const { setMode } = props;

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 60) setName(e.target.value);
    setFieldsError({ ...fieldsError, name: false });
    fieldNameRef.current.classList.remove('field_error');
  };

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 50) setEmail(e.target.value);
    setFieldsError({ ...fieldsError, email: false });
    fieldEmailRef.current.classList.remove('field_error');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (checkFieldName(name)) {
      setFieldsError({ ...fieldsError, name: true });
      fieldNameRef.current.classList.add('field_error');
      return;
    }
    if (checkFieldEmail(email)) {
      setFieldsError({ ...fieldsError, email: true });
      fieldEmailRef.current.classList.add('field_error');
      return;
    }
    if (checkFieldPassw(passw)) {
      setFieldsError({ ...fieldsError, passw: true });
      return;
    }
    if (checkFieldPassw(confirmPassw)) {
      setFieldsError({ ...fieldsError, confirmPassw: true });
      return;
    }

    if (passw !== confirmPassw) {
      setFieldsError({ ...fieldsError, passw: true, confirmPassw: true });
      return;
    }
    if (passw.length < 4) {
      setFieldsError({ ...fieldsError, passw: true });
      return;
    }
    if (confirmPassw.length < 4) {
      setFieldsError({ ...fieldsError, confirmPassw: true });
      return;
    }

    if (!!name && !!email) {
      const obj = {
        name,
        email,
        passw,
      };

      dispatch(userRegister(obj));
      setFieldsError(fields);
    }
  };

  const handleToggleMode = (val: boolean) => () => {
    setMode(val);
  };

  return (
    <>
      <form id="auth-form" className="authForm" onSubmit={handleSubmit}>
        <p className="title">Имя</p>
        <div className="fieldWrap">
          <input
            ref={fieldNameRef}
            className="field"
            type="name"
            name="name"
            placeholder="Артур"
            required
            autoComplete="on"
            value={name}
            onChange={changeName}
            //pattern="[A-Za-zА-Яа-яЁё\-_ s]+"
            maxLength={60}
          />
          {fieldsError.name && <p className="textErr">Ошибка</p>}
        </div>

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

        <p className="title">Подтвердите пароль</p>
        <div className="fieldWrap">
          <PasswField
            label="******"
            value={confirmPassw}
            setValue={setConfirmPassw}
            passwErr={fieldsError.confirmPassw}
            setPasswErr={setFieldsError}
            fields={fieldsError}
            confirm={true}
          />
          {fieldsError.confirmPassw && <p className="textErr">Ошибка</p>}
        </div>

        <button className="btnSubmit" type="submit">
          Зарегистрироваться
        </button>

        <p className="loginText">
          <button className="btn" type="button" onClick={handleToggleMode(true)}>
            Войти
          </button>
        </p>

        {!!authError && <p className="textErr">Ошибка</p>}
      </form>
    </>
  );
});

export default SignUpForm;
