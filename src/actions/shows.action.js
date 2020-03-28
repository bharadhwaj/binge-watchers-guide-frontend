import { SHOWS } from '../constants/actions';

export function getAllShows(types, languages, genres) {
  return { type: SHOWS.GET_ALL_SHOWS, payload: { types, languages, genres } };
}

export function addShows(shows) {
  return { type: SHOWS.ADD_SHOWS, payload: { shows } };
}
