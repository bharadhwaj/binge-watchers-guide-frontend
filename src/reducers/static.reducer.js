import { STATIC } from '../constants/actions';

import { utils } from '../constants';
import { staticSchema } from '../schemas';

const initialState = {
  types: {},
  languages: {},
  genres: {},
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

    default:
      return { ...state };
  }
}
