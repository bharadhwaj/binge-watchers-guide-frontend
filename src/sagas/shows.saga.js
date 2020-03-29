import { all, put, takeEvery } from '@redux-saga/core/effects';

import { showsAction } from '../actions';

import { actions } from '../constants';

/* -----------------------------------------
 *                 WORKERS
 * -----------------------------------------
 */

function* getAllShowsWorker() {
  const shows = [
    {
      _id: '1',
      name: 'Kumbalangi Nights',
      url: 'https://www.primevideo.com/detail/0IIH4C2IQSRU9B8L3F4XOLI5WH/',
      language: 'Malayalam',
      type: 'Movie',
      genre: ['Drama', 'Thriller'],
      upvotes: 12,
      downvotes: 2,
      haveUpvoted: true,
      haveDownvoted: false,
    },
    {
      _id: '2',
      name: 'The Prestige',
      url:
        'https://www.primevideo.com/region/eu/detail/0NHF8XHW3MHY857TGPSWTYCXTI/',
      language: 'English',
      type: 'Movie',
      genre: ['Drama', 'Suspense'],
      upvotes: 28,
      downvotes: 4,
      haveUpvoted: false,
      haveDownvoted: true,
    },
    {
      _id: '3',
      name: 'Kumbalangi Nights',
      url: 'https://www.primevideo.com/detail/0IIH4C2IQSRU9B8L3F4XOLI5WH/',
      language: 'Malayalam',
      type: 'Movie',
      genre: ['Drama', 'Thriller'],
      upvotes: 12,
      downvotes: 2,
      haveUpvoted: false,
      haveDownvoted: false,
    },
    {
      _id: '4',
      name: 'The Prestige',
      url:
        'https://www.primevideo.com/region/eu/detail/0NHF8XHW3MHY857TGPSWTYCXTI/',
      language: 'English',
      type: 'Movie',
      genre: ['Drama', 'Suspense'],
      upvotes: 28,
      downvotes: 4,
      haveUpvoted: false,
      haveDownvoted: true,
    },
    {
      _id: '5',
      name: 'Kumbalangi Nights',
      url: 'https://www.primevideo.com/detail/0IIH4C2IQSRU9B8L3F4XOLI5WH/',
      language: 'Malayalam',
      type: 'Movie',
      genre: ['Drama', 'Thriller'],
      upvotes: 12,
      downvotes: 2,
      haveUpvoted: true,
      haveDownvoted: false,
    },
    {
      _id: '6',
      name: 'The Prestige',
      url:
        'https://www.primevideo.com/region/eu/detail/0NHF8XHW3MHY857TGPSWTYCXTI/',
      language: 'English',
      type: 'Movie',
      genre: ['Drama', 'Suspense'],
      upvotes: 28,
      downvotes: 4,
      haveUpvoted: false,
      haveDownvoted: true,
    },
  ];

  yield put(showsAction.addShows(shows));
}

/* -----------------------------------------
 *                 WATCHERS
 * -----------------------------------------
 */

function* getAllShowsWatcher() {
  yield takeEvery(actions.SHOWS.GET_ALL_SHOWS, getAllShowsWorker);
}

export default function* showsSaga() {
  yield all([getAllShowsWatcher()]);
}
