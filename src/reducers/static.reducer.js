import { STATIC } from '../constants/actions';

const initialState = {
  types: [],
  languages: [],
  genres: [],
};

export default function staticReducer(state = initialState, action) {
  switch (action.type) {
    case STATIC.UPDATE_TYPE_DATA:
      return {
        ...state,
        types: [...action.payload.types],
      };

    case STATIC.UPDATE_LANGUAGE_DATA:
      return {
        ...state,
        languages: [...action.payload.languages],
      };

    case STATIC.UPDATE_GENRE_DATA:
      return {
        ...state,
        genres: [...action.payload.genres],
      };

    default:
      return { ...state };
  }
}
