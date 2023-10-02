import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const Auth = React.lazy(() => import(/* webpackChunkName: "auth" */ '@/scenes/Auth'));
const Users = React.lazy(() => import(/* webpackChunkName: "users" */ '@/scenes/Users'));
const UserCard = React.lazy(() => import(/* webpackChunkName: "users" */ '@/scenes/UserCard'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "notfound" */ '@/scenes/NotFound'));

const Router: React.FC = () => {
  return (
    <Suspense
      fallback={
        <CircularProgress
          color="primary"
          sx={{
            position: 'absolute',
            top: '30%',
            left: '48%',
            color: '#512689',
          }}
        />
      }
    >
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users/:id" element={<UserCard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
