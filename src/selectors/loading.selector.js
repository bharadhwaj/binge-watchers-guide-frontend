import { createSelector } from 'reselect';

const selectLoadingState = state => state.loading;

export const getStaticsLoadingState = () =>
  createSelector(
    selectLoadingState,
    loadingState => loadingState.isGetStaticsLoading
  );

export const getAllShowsLoadingState = () =>
  createSelector(
    selectLoadingState,
    loadingState => loadingState.isGetAllShowsLoading
  );

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

export const getAddShowSubmitLoadingState = () =>
  createSelector(
    selectLoadingState,
    loadingState => loadingState.isAddShowSubmitLoading
  );
