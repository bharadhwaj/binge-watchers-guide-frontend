import { createSelector } from 'reselect';

const selectUserState = state => state.user;

export const isUserLoggedIn = () =>
  createSelector(selectUserState, userState => userState.isLoggedIn);

export const getAuthToken = () =>
  createSelector(
    selectUserState,
    userState =>
      userState._id &&
      userState.token &&
      'Bearer ' + userState._id + ',' + userState.token
  );

export const getCurrentUserId = () =>
  createSelector(selectUserState, userState => userState._id);

export const getCurrentUsername = () =>
  createSelector(selectUserState, userState => userState.username);
