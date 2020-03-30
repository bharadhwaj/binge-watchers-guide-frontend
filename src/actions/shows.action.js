import { SHOWS } from '../constants/actions';

export function getAllShows({
  userId = null,
  types = null,
  languages = null,
  genres = null,
} = {}) {
  return {
    type: SHOWS.GET_ALL_SHOWS,
    payload: { userId, types, languages, genres },
  };
}

export function addShow(show) {
  return { type: SHOWS.ADD_SHOW, payload: { show } };
}

export function updateShows(shows) {
  return { type: SHOWS.UPDATE_SHOWS, payload: { shows } };
}

export function resetVotes() {
  return { type: SHOWS.RESET_VOTES };
}
