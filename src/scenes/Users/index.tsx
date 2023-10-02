import React, { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { selectAuth } from '@/store/auth/selectors';
import { selectUsers, usersLoading, usersLoaded, usersFailure } from '@/store/users/selectors';
import { User } from '@/utils/types';
import UserList from './UserList';
import './style.css';

const Users: React.FC = () => {
  const { currUser } = useSelector(selectAuth, shallowEqual);
  const { usersList, likes } = useSelector(selectUsers, shallowEqual);
  const loading = useSelector(usersLoading, shallowEqual);
  const loaded = useSelector(usersLoaded, shallowEqual);
  const error = useSelector(usersFailure, shallowEqual);

  const newUsers = useMemo(
    () =>
      usersList?.map((user: User) => {
        const finded = likes?.find(item => user.id === item.id);
        if (!!finded) return { ...user, liked: true };
        else return { ...user, liked: false };
      }),
    [usersList, likes],
  );

  return (
    <div className="users">
      <div className="users__header header">
        <div className="container">
          <h1 className="heading">Наша команда</h1>
          <p className="text">
            Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их
            плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.
          </p>
        </div>
      </div>

      <div className="users__content container">
        {(loading || !currUser?.id) && (
          <div className="mainLoading">
            <CircularProgress color="inherit" />
          </div>
        )}

        {!loading && loaded && <UserList list={newUsers} />}
      </div>
    </div>
  );
};

export default Users;
