import { createSelector } from 'reselect';

const selectLoadingState = state => state.loading;

export const getRegisterLoadingState = () =>
  createSelector(
    selectLoadingState,
    loadingState => loadingState.isRegisterSubmitLoading
  );
export const getLoginLoadingState = () =>
  createSelector(
    selectLoadingState,
    loadingState => loadingState.isLoginSubmitLoading
  );

export const getCheckUsernameLoadingState = () =>
  createSelector(
    selectLoadingState,
    loadingState => loadingState.isCheckUsernameLoading
  );
