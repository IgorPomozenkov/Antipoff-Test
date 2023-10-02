/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, api } from '..';

const initialState = {
  usersList: [],
  user: {},
  likes: [],
  request: {
    status: 0,
    error: null,
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    dataPending: state => {
      state.request.status = 1;
      state.request.error = null;
    },
    dataFailure: (state, { payload }) => {
      state.request.error = payload;
      state.request.status = 3;
    },
    setList: (state, { payload }) => {
      state.usersList = payload;
      state.request.status = 2;
      state.request.error = null;
    },
    addLike: (state, { payload }) => {
      state.likes = [...state.likes, payload];
      state.request.status = 2;
      state.request.error = null;
    },
    removeLike: (state, { payload }) => {
      const index = state.likes.findIndex(({ id }) => id === payload?.id);
      state.likes.splice(index, 1);
      state.request.status = 2;
      state.request.error = null;
    },
    clear: state => {
      state.usersList = [];
      state.likes = [];
      state.request.status = 0;
      state.request.error = null;
    },
  },
});

const { dataPending, dataFailure, setList, addLike, removeLike, clear } = usersSlice.actions;
export default usersSlice.reducer;

export const getUsersApi = () => async (dispatch: AppDispatch) => {
  dispatch(dataPending());

  try {
    const data = await api.getUsers({ page: 1, perPage: 12 });
    dispatch(setList(data || []));
  } catch (err) {
    console.log(err);
    dispatch(dataFailure(err));
  }
};

// export const updateUserApi = (userId: number, body: object) => async (dispatch: AppDispatch) => {
//   //dispatch(dataPending());

//   try {
//     const data = await api.updateUser(userId, body);
//     console.log(data);
//     dispatch(addLike({ ...body, id: userId }));
//   } catch (err) {
//     console.log(err);
//     dispatch(dataFailure(err));
//   }
// };

export const addUserLike = (userId: number, body: object) => async (dispatch: AppDispatch) => {
  //dispatch(dataPending());

  try {
    const data = await api.updateUser(userId, body);
    console.log(data);
    dispatch(addLike({ ...body, id: userId }));
  } catch (err) {
    console.log(err);
    dispatch(dataFailure(err));
  }
};

export const delUserLike = (userId: number, body: object) => async (dispatch: AppDispatch) => {
  //dispatch(dataPending());

  try {
    const data = await api.updateUser(userId, body);
    console.log(data);
    dispatch(removeLike({ ...body, id: userId }));
  } catch (err) {
    console.log(err);
    dispatch(dataFailure(err));
  }
};

export const usersClear = () => (dispatch: AppDispatch) => {
  dispatch(clear());
};
