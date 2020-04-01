import { SHOWS } from '../constants/actions';

export function getAllShows() {
  return {
    type: SHOWS.GET_ALL_SHOWS,
  };
}

export function setSortAndOrder(sort = null, order = null) {
  sort = sort !== '' ? sort : null;
  order = order !== '' ? order : null;

  return {
    type: SHOWS.SET_SORT_AND_ORDER,
    payload: { sort, order },
  };
}

export function addShow(show) {
  return { type: SHOWS.ADD_SHOW, payload: { show } };
}

export function appendShows(shows) {
  return { type: SHOWS.APPEND_SHOWS, payload: { shows } };
}

export function updateShows(shows) {
  return { type: SHOWS.UPDATE_SHOWS, payload: { shows } };
}

export function resetVotes() {
  return { type: SHOWS.RESET_VOTES };
}

export function upvoteShow(showId, isUpvote) {
  return { type: SHOWS.UPVOTE_SHOW, payload: { showId, isUpvote } };
}

export function downvoteShow(showId, isDownvote) {
  return { type: SHOWS.DOWNVOTE_SHOW, payload: { showId, isDownvote } };
}

export function deleteShow(showId) {
  return { type: SHOWS.DELETE_SHOW, payload: { showId } };
}

export function removeShow(show) {
  return { type: SHOWS.REMOVE_SHOW, payload: { show } };
}
