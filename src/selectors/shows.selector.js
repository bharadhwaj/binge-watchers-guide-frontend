import { createSelector } from 'reselect';

import { utils } from '../constants';

const selectShows = state => state.shows.shows;
const selectSort = state => state.shows.sort;
const selectOrder = state => state.shows.order;

const createdAtDescSort = (showA, showB) =>
  new Date(showB.created_at) - new Date(showA.created_at);

const createdAtAscSort = (showA, showB) =>
  new Date(showA.created_at) - new Date(showB.created_at);

const popularDescSort = (showA, showB) =>
  showB.upvotes - showB.downvotes - (showA.upvotes - showA.downvotes);

const popularAscSort = (showA, showB) =>
  showA.upvotes - showA.downvotes - (showB.upvotes - showB.downvotes);

const votesDescSort = (showA, showB) => showB.upvotes - showA.upvotes;

const votesAscSort = (showA, showB) => showB.downvotes - showA.downvotes;

const getSortFunction = (sort, order) => {
  if (
    sort === utils.SORT_TYPES.CREATED_AT &&
    order === utils.ORDER_TYPES.ASCENDING
  ) {
    return createdAtAscSort;
  } else if (
    sort === utils.SORT_TYPES.POPULAR &&
    order === utils.ORDER_TYPES.DESCENDING
  ) {
    return popularDescSort;
  } else if (
    sort === utils.SORT_TYPES.POPULAR &&
    order === utils.ORDER_TYPES.ASCENDING
  ) {
    return popularAscSort;
  } else if (
    sort === utils.SORT_TYPES.VOTE &&
    order === utils.ORDER_TYPES.DESCENDING
  ) {
    return votesDescSort;
  } else if (
    sort === utils.SORT_TYPES.VOTE &&
    order === utils.ORDER_TYPES.ASCENDING
  ) {
    return votesAscSort;
  }

  return createdAtDescSort;
};

export const getAllShows = () =>
  createSelector([selectShows, selectSort, selectOrder], (shows, sort, order) =>
    shows.sort(getSortFunction(sort, order))
  );

export const getSortAndOrder = () =>
  createSelector([selectSort, selectOrder], (sort, order) => ({
    sort,
    order,
  }));
