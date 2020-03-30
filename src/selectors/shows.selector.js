import { createSelector } from 'reselect';

const selectShowsState = state => state.shows;

export const getAllShows = () =>
  createSelector(selectShowsState, showState =>
    showState.shows.sort(
      (showA, showB) => new Date(showB.created_at) - new Date(showA.created_at)
    )
  );
