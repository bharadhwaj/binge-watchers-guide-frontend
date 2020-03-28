import { createSelector } from 'reselect';

const selectShowsState = state => state.shows;

export const getAllShows = () =>
  createSelector(selectShowsState, showState => showState.shows);
