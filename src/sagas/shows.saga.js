import axios from 'axios';
import {
  all,
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

    const { userId, types, languages, genres } = payload;

    const requestURL = urls.GET_ALL_SHOWS;

    const headers = {
      'Content-Type': 'application/json',
    };

    const params = {
      ...(userId && { user_id: userId }),
      ...(types && types.length > 0 && { types: types.join(',') }),
      ...(languages &&
        languages.length > 0 && { languages: languages.join(',') }),
      ...(genres && genres.length > 0 && { genres: genres.join(',') }),
    };

    const response = yield axios.get(requestURL, { headers, params });

    console.log('ADD SHOW RESPONSE: ', response);

    yield put(loadingAction.stopGetAllShowsLoading());

    if (response && response.status === 200) {
      const { data } = response;
      const { shows } = data.data;

      yield put(showsAction.updateShows(shows));
    }
  } catch (error) {
    yield put(loadingAction.stopGetAllShowsLoading());
  }
}

function* addShowWorker({ payload }) {
  try {
    handleError(axios);
    const userId = yield select(userSelector.getCurrentUserId());

    const requestURL = urls.ADD_SHOWS.replace(/<USER_ID>/, userId);

    const body = payload.show;

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = yield axios.post(requestURL, body, { headers });

    console.log('ADD SHOW RESPONSE: ', response);

    yield put(loadingAction.stopAddShowLoading());

    if (response && response.status === 201) {
      const { data } = response;
      const { message } = data;
      const { show } = data.data;

      yield put(showsAction.updateShows([show]));

      yield put(
        toastAction.requestToShowToast(utils.MESSAGE_VARIANTS.SUCCESS, message)
      );
    }
  } catch (error) {
    yield put(loadingAction.stopAddShowLoading());
  }
}

/* -----------------------------------------
 *                 WATCHERS
 * -----------------------------------------
 */

function* getAllShowsWatcher() {
  yield takeLatest(actions.SHOWS.GET_ALL_SHOWS, getAllShowsWorker);
}

function* addShowWatcher() {
  yield takeEvery(actions.SHOWS.ADD_SHOW, addShowWorker);
}

export default function* showsSaga() {
  yield all([getAllShowsWatcher(), addShowWatcher()]);
}
