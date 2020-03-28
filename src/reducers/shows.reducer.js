import { SHOWS } from '../constants/actions';

const initialState = {
  shows: [],
};

export default function staticReducer(state = initialState, action) {
  switch (action.type) {
    case SHOWS.ADD_SHOWS: {
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

    default:
      return { ...state };
  }
}
