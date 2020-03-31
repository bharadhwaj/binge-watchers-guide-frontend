import { SHOWS } from '../constants/actions';

export function getAllShows({
  userId = null,
  types = null,
  languages = null,
  genres = null,
  q = null,
} = {}) {
  return {
    type: SHOWS.GET_ALL_SHOWS,
    payload: { userId, types, languages, genres, q },
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
