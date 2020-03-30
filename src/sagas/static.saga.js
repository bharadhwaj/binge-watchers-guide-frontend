import axios from 'axios';
import { all, put, takeEvery } from '@redux-saga/core/effects';

import { loadingAction, staticAction } from '../actions';

import { actions, urls } from '../constants';

import handleError from '../utils/errorHandler';

/* -----------------------------------------
 *                 WORKERS
 * -----------------------------------------
 */

function* getAllStaticsWorker() {
  try {
    handleError(axios);

    const requestURL = urls.GET_STATICS;

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = yield axios.get(requestURL, { headers });

    yield put(loadingAction.stopGetStaticsLoading());

    if (response && response.status === 200) {
      const { data } = response;
      let { types, languages, genres } = data.data;

      yield put(staticAction.updateTypeData(types));
      yield put(staticAction.updateLanguageData(languages));
      yield put(staticAction.updateGenreData(genres));
    }
  } catch (error) {
    yield put(loadingAction.stopGetStaticsLoading());
  }
}

/* -----------------------------------------
 *                 WATCHERS
 * -----------------------------------------
 */

function* getAllStaticsWatcher() {
  yield takeEvery(actions.STATIC.GET_ALL_STATICS, getAllStaticsWorker);
}

export default function* staticSaga() {
  yield all([getAllStaticsWatcher()]);
}
