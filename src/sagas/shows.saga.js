import axios from 'axios';
import {
  all,
  debounce,
  put,
  select,
  takeEvery,
  takeLatest,
} from '@redux-saga/core/effects';

import { loadingAction, showsAction, toastAction } from '../actions';

import { actions, urls, utils } from '../constants';

import { userSelector } from '../selectors';

import handleError from '../utils/errorHandler';

/* -----------------------------------------
 *                 WORKERS
 * -----------------------------------------
 */

function* getAllShowsWorker({ payload }) {
  try {
    handleError(axios);

    const authToken = yield select(userSelector.getAuthToken());

    const { userId, types, languages, genres, q } = payload;

    const requestURL = urls.GET_ALL_SHOWS;

    const headers = {
      'Content-Type': 'application/json',
      ...(authToken && { Authorization: authToken }),
    };

    const params = {
      ...(userId && { user_id: userId }),
      ...(types && types.length > 0 && { types: types.join(',') }),
      ...(languages &&
        languages.length > 0 && { languages: languages.join(',') }),
      ...(genres && genres.length > 0 && { genres: genres.join(',') }),
      ...(q && q !== '' && { q }),
    };

    const isFilterApiCall =
      (types && types.length > 0) ||
      (languages && languages.length > 0) ||
      (genres && genres.length > 0) ||
      (q && q !== '');

    const response = yield axios.get(requestURL, { headers, params });

    yield put(loadingAction.stopGetAllShowsLoading());

    if (response && response.status === 200) {
      const { data } = response;
      const { shows } = data.data;

      if (isFilterApiCall) {
        yield put(showsAction.updateShows(shows));
      } else {
        yield put(showsAction.appendShows(shows));
      }
    }
  } catch (error) {
    yield put(loadingAction.stopGetAllShowsLoading());
  }
}

function* addShowWorker({ payload }) {
  try {
    handleError(axios);
    const userId = yield select(userSelector.getCurrentUserId());

    const authToken = yield select(userSelector.getAuthToken());

    const requestURL = urls.ADD_SHOWS.replace(/<USER_ID>/, userId);

    const body = payload.show;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: authToken,
    };

    const response = yield axios.post(requestURL, body, { headers });

    yield put(loadingAction.stopAddShowLoading());

    if (response && response.status === 201) {
      const { data } = response;
      const { message } = data;
      const { show } = data.data;

      yield put(showsAction.appendShows([show]));

      yield put(
        toastAction.requestToShowToast(utils.MESSAGE_VARIANTS.SUCCESS, message)
      );
    }
  } catch (error) {
    yield put(loadingAction.stopAddShowLoading());
  }
}

function* upvoteShowWorker({ payload }) {
  try {
    handleError(axios);
    const userId = yield select(userSelector.getCurrentUserId());

    const authToken = yield select(userSelector.getAuthToken());

    const { showId, isUpvote } = payload;

    const requestURL = urls.UPVOTE_SHOW.replace(/<USER_ID>/, userId).replace(
      /<SHOW_ID>/,
      showId
    );

    const body = { isUpvote };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: authToken,
    };

    const response = yield axios.post(requestURL, body, { headers });

    yield put(loadingAction.stopVoteShowLoading());

    if (response && response.status === 200) {
      const { data } = response;
      const { show } = data.data;

      yield put(showsAction.appendShows([show]));
    }
  } catch (error) {
    yield put(loadingAction.stopVoteShowLoading());
  }
}

function* downvoteShowWorker({ payload }) {
  try {
    handleError(axios);
    const userId = yield select(userSelector.getCurrentUserId());

    const authToken = yield select(userSelector.getAuthToken());

    const { showId, isDownvote } = payload;

    const requestURL = urls.DOWNVOTE_SHOW.replace(/<USER_ID>/, userId).replace(
      /<SHOW_ID>/,
      showId
    );

    const body = { isDownvote };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: authToken,
    };

    const response = yield axios.post(requestURL, body, { headers });

    yield put(loadingAction.stopVoteShowLoading());

    if (response && response.status === 200) {
      const { data } = response;
      const { show } = data.data;

      yield put(showsAction.appendShows([show]));
    }
  } catch (error) {
    yield put(loadingAction.stopVoteShowLoading());
  }
}

/* -----------------------------------------
 *                 WATCHERS
 * -----------------------------------------
 */

function* getAllShowsWatcher() {
  yield debounce(600, actions.SHOWS.GET_ALL_SHOWS, getAllShowsWorker);
}

function* addShowWatcher() {
  yield takeEvery(actions.SHOWS.ADD_SHOW, addShowWorker);
}

function* upvoteShowWatcher() {
  yield takeEvery(actions.SHOWS.UPVOTE_SHOW, upvoteShowWorker);
}

function* downvoteShowWatcher() {
  yield takeEvery(actions.SHOWS.DOWNVOTE_SHOW, downvoteShowWorker);
}

export default function* showsSaga() {
  yield all([
    getAllShowsWatcher(),
    addShowWatcher(),
    upvoteShowWatcher(),
    downvoteShowWatcher(),
  ]);
}
