import { RootState } from '..';

export function selectAuth(state: RootState) {
  return state.auth;
}

export function authLoading(state: RootState) {
  return state.auth.request.status === 1;
}

export function authLoaded(state: RootState) {
  return state.auth.request.status === 2;
}

export function authFailure(state: RootState) {
  return state.auth.request.error;
}

export function dataLoading(state: RootState) {
  return state.auth.requestData.status === 1;
}

export function dataLoaded(state: RootState) {
  return state.auth.requestData.status === 2;
}

export function dataFailure(state: RootState) {
  return state.auth.requestData.error;
}
