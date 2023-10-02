import { RootState } from '..';

export function selectUsers(state: RootState) {
  return state.users;
}

export function usersLoading(state: RootState) {
  return state.users.request.status === 1;
}

export function usersLoaded(state: RootState) {
  return state.users.request.status === 2;
}

export function usersFailure(state: RootState) {
  return state.users.request.error;
}
