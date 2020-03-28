import { SHOWS } from '../constants/actions';

export function getAllShows() {
  return { type: SHOWS.GET_ALL_SHOWS };
}

export function addShows(shows) {
  return { type: SHOWS.ADD_SHOWS, payload: { shows } };
}
