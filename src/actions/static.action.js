import { STATIC } from '../constants/actions';

export function getAllStatics() {
  return { type: STATIC.GET_ALL_STATICS };
}

export function updateTypeData(types) {
  return { type: STATIC.UPDATE_TYPE_DATA, payload: { types } };
}

export function updateLanguageData(languages) {
  return { type: STATIC.UPDATE_LANGUAGE_DATA, payload: { languages } };
}

export function updateGenreData(genres) {
  return { type: STATIC.UPDATE_GENRE_DATA, payload: { genres } };
}

export function addFilter({
  type = null,
  language = null,
  genre = null,
  q = null,
} = {}) {
  return {
    type: STATIC.ADD_FILTER,
    payload: { type, language, genre, q },
  };
}

export function removeFilter({
  type = null,
  language = null,
  genre = null,
} = {}) {
  return {
    type: STATIC.REMOVE_FILTER,
    payload: { type, language, genre },
  };
}

export function resetFilter() {
  return {
    type: STATIC.RESET_FILTERS,
  };
}
