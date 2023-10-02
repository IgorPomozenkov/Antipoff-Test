import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { PropsPasswField } from './types';

const PasswField: React.FC<PropsPasswField> = React.memo((props: PropsPasswField) => {
  const fieldRef = useRef<HTMLInputElement>(null);
  const [showPassw, setShowPassw] = useState(false);
  const { label, value, setValue, passwErr, setPasswErr, fields, confirm } = props;

  useEffect(() => {
    if (passwErr) fieldRef.current.classList.add('field_error');
  }, [passwErr]);

  const changePassw = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 50) setValue(e.target.value);
    if (confirm) setPasswErr({ ...fields, confirmPassw: false });
    if (!confirm) setPasswErr({ ...fields, passw: false });
    fieldRef.current.classList.remove('field_error');
  };

  const handleShowPassw = () => setShowPassw(show => !show);

  return (
    <div className="passwWrap">
      <input
        ref={fieldRef}
        className="field"
        type={showPassw ? 'text' : 'password'}
        name="password"
        placeholder={label}
        required
        autoComplete="on"
        value={value}
        onChange={changePassw}
        //error={passwErr}
        pattern="[^а-яёА-ЯЁ S]+"
        minLength={4}
        maxLength={50}
      />
      {!showPassw ? (
        <button className="btn" type="button" onClick={handleShowPassw}>
          <VisibilityOffOutlined />
        </button>
      ) : (
        <button className="btn" type="button" onClick={handleShowPassw}>
          <VisibilityOutlined />
        </button>
      )}
    </div>
  );
});

export default PasswField;
