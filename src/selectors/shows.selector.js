import { createSelector } from 'reselect';

const selectShows = state => state.shows.shows;
const selectSort = state => state.shows.sort;
const selectOrder = state => state.shows.order;

// eslint-disable-next-line
const createdAtDescSort = (showA, showB) =>
  new Date(showB.created_at) - new Date(showA.created_at);

// eslint-disable-next-line
const createdAtAscSort = (showA, showB) =>
  new Date(showA.created_at) - new Date(showB.created_at);

// eslint-disable-next-line
const popularDescSort = (showA, showB) =>
  showB.upvotes - showB.downvotes - (showA.upvotes - showA.downvotes);

// eslint-disable-next-line
const popularAscSort = (showA, showB) =>
  showA.upvotes - showA.downvotes - (showB.upvotes - showB.downvotes);

// eslint-disable-next-line
const votesDescSort = (showA, showB) => showB.upvotes - showA.upvotes;

// eslint-disable-next-line
const votesAscSort = (showA, showB) => showB.upvotes - showA.upvotes;

export const getAllShows = () =>
  createSelector(
    [selectShows, selectSort, selectOrder],
    (shows, sort, order) => shows
  );

export const getSortAndOrder = () =>
  createSelector([selectSort, selectOrder], (sort, order) => ({
    sort,
    order,
  }));
