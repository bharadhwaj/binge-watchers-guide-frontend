import { SHOWS } from '../constants/actions';

const initialState = {
  shows: [],
  sort: null,
  order: null,
};

export default function staticReducer(state = initialState, action) {
  switch (action.type) {
    case SHOWS.APPEND_SHOWS: {
      const currentShows = state.shows;
      const newShows = action.payload.shows;
      const newShowIds = new Set(newShows.map(show => show._id));
      const mergedShows = [
        ...newShows,
        ...currentShows.filter(show => !newShowIds.has(show._id)),
      ];

      return {
        ...state,
        shows: [...mergedShows],
      };
    }

    case SHOWS.SET_SORT_AND_ORDER:
      return {
        ...state,
        sort: action.payload.sort,
        order: action.payload.order,
      };

    case SHOWS.UPDATE_SHOWS:
      return {
        ...state,
        shows: [...action.payload.shows],
      };

    case SHOWS.RESET_VOTES: {
      const currentShows = [...state.shows].map(show => ({
        ...show,
        haveUpvoted: false,
        haveDownvoted: false,
      }));

      return {
        ...state,
        shows: currentShows,
      };
    }

    case SHOWS.REMOVE_SHOW:
      return {
        ...state,
        shows: [
          ...state.shows.filter(item => item._id !== action.payload.show._id),
        ],
      };

    default:
      return { ...state };
  }
}
