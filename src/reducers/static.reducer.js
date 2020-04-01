import { STATIC } from '../constants/actions';

import { utils } from '../constants';
import { staticSchema } from '../schemas';

import { checkIfUserIsLoggedIn } from '../utils/users';
const { isLoggedIn, userInfo } = checkIfUserIsLoggedIn();

const initialState = {
  types: {},
  languages: {},
  genres: {},
  appliedFilters: [],
  filter: {
    user_id: isLoggedIn ? userInfo._id : null,
    types: [],
    languages: [],
    genres: [],
    q: null,
  },
};

export default function staticReducer(state = initialState, action) {
  switch (action.type) {
    case STATIC.UPDATE_TYPE_DATA: {
      const { entities } = staticSchema.normalizeData(
        utils.FILTER_TYPES.TYPE,
        action.payload.types
      );

      const { formattedData } = entities;

      return {
        ...state,
        types: { ...formattedData },
      };
    }

    case STATIC.UPDATE_LANGUAGE_DATA: {
      const { entities } = staticSchema.normalizeData(
        utils.FILTER_TYPES.LANGUAGE,
        action.payload.languages
      );

      const { formattedData } = entities;

      return {
        ...state,
        languages: { ...formattedData },
      };
    }

    case STATIC.UPDATE_GENRE_DATA: {
      const { entities } = staticSchema.normalizeData(
        utils.FILTER_TYPES.GENRE,
        action.payload.genres
      );

      const { formattedData } = entities;

      return {
        ...state,
        genres: { ...formattedData },
      };
    }

    case STATIC.ADD_FILTER: {
      const filterObj = action.payload.type
        ? state.types[action.payload.type]
        : action.payload.language
        ? state.languages[action.payload.language]
        : action.payload.genre
        ? state.genres[action.payload.genre]
        : null;

      const newFilterData =
        !filterObj ||
        state.appliedFilters.find(
          data => data._id === filterObj._id && data.type === filterObj.type
        )
          ? [...state.appliedFilters]
          : [...state.appliedFilters, filterObj];

      return {
        ...state,
        appliedFilters: newFilterData,
        filter: {
          ...state.filter,
          types: action.payload.type
            ? [...new Set([...state.filter.types, action.payload.type])]
            : [...state.filter.types],
          languages: action.payload.language
            ? [...new Set([...state.filter.languages, action.payload.language])]
            : [...state.filter.languages],
          genres: action.payload.genre
            ? [...new Set([...state.filter.genres, action.payload.genre])]
            : [...state.filter.genres],
          q: action.payload.q,
        },
      };
    }

    case STATIC.REMOVE_FILTER: {
      const filterObj = action.payload.type
        ? state.types[action.payload.type]
        : action.payload.language
        ? state.languages[action.payload.language]
        : action.payload.genre
        ? state.genres[action.payload.genre]
        : null;

      const newFilterData = state.appliedFilters.filter(
        data => data._id !== filterObj._id || data.type !== filterObj.type
      );

      return {
        ...state,
        appliedFilters: newFilterData,
        filter: {
          ...state.filter,
          types: action.payload.type
            ? [...state.filter.types.filter(typeId => typeId !== filterObj._id)]
            : [...state.filter.types],
          languages: action.payload.language
            ? [
                ...state.filter.languages.filter(
                  languageId => languageId !== filterObj._id
                ),
              ]
            : [...state.filter.languages],
          genres: action.payload.genre
            ? [
                ...state.filter.genres.filter(
                  genreId => genreId !== filterObj._id
                ),
              ]
            : [...state.filter.genres],
          q: action.payload.q || state.filter.q,
        },
      };
    }

    case STATIC.RESET_FILTERS: {
      return {
        ...state,
        appliedFilters: [],
        filter: {
          ...state.filter,
          user_id: isLoggedIn ? userInfo._id : null,
          types: [],
          languages: [],
          genres: [],
          q: null,
        },
      };
    }

    default:
      return { ...state };
  }
}
