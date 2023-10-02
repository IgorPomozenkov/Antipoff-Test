/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, api } from '..';
import User from '@/entities/user';
import { User as UserType } from '@/utils/types';

const initialState = {
  authed: false,
  currUser: User,
  request: {
    status: 0,
    error: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userPending: state => {
      state.request.status = 1;
      state.request.error = null;
    },
    userFailure: (state, { payload }) => {
      state.request.error = payload;
      state.request.status = 3;
    },
    setAuth: (state, { payload }) => {
      state.authed = payload;
      state.request.status = 2;
    },
    setUser: (state, { payload }) => {
      state.currUser = payload;
      state.request.status = 2;
      state.request.error = null;
    },
    clear: state => {
      state.authed = false;
      state.currUser = User;
      state.request.status = 0;
      state.request.error = null;
    },
  },
});

const { setAuth, setUser, userPending, userFailure, clear } = authSlice.actions;
export default authSlice.reducer;

export const initUserApi = () => async (dispatch: AppDispatch) => {
  dispatch(userPending());

  try {
    const res = await api.getUser();
    console.log(res);

    if (res?.user.token) {
      dispatch(setAuth(true));
      dispatch(setUser(res.user));
    } else dispatch(clear());
    //
  } catch (err) {
    console.log(err);
    dispatch(userFailure(err));
  }
};

export const userRegister = (data: UserType) => async (dispatch: AppDispatch) => {
  dispatch(userPending());

  const fakeData = { id: 1, token: Date.now().toString() };

  try {
    const res = await api.register(data.email, data.passw, data.name);

    if (res?.user) {
      dispatch(setAuth(true));
      dispatch(setUser(res.user));
    }

    if (res?.error) {
      dispatch(userFailure(res?.error));

      setTimeout(() => {
        dispatch(setAuth(true));
        dispatch(setUser(new User(fakeData.token, fakeData.id)));
        window.localStorage.setItem('AUTH_KEY', fakeData.token);
      }, 1000);
    }
    //
  } catch (err) {
    console.log(err);
    dispatch(userFailure(err));
  }
};

export const userLogin = (email: string, passw: string) => async (dispatch: AppDispatch) => {
  dispatch(userPending());

  try {
    const res = await api.login(email, passw);

    if (res?.user) {
      dispatch(setAuth(true));
      dispatch(setUser(res.user));
    }

    if (res?.error) {
      dispatch(userFailure(res?.error));
    }
  } catch (err) {
    console.log(err);
    dispatch(userFailure(err));
  }
};

export const userLogout = () => async (dispatch: AppDispatch) => {
  dispatch(userPending());

  try {
    const res = await api.logout();
    console.log(res);
    dispatch(clear());
    //
  } catch (err) {
    console.log(err);
    dispatch(userFailure(err));
  }
};
