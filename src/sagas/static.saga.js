import axios from 'axios';
import { all, put, takeEvery } from '@redux-saga/core/effects';

import { staticAction } from '../actions';

import { actions, urls, utils } from '../constants';

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

    if (response && response.status === 200) {
      const { data } = response;
      let { types, languages, genres } = data.data;

      types = types.map(typeObj => ({
        ...typeObj,
        type: utils.FILTER_TYPES.TYPE,
        isChecked: false,
      }));

      languages = languages.map(languageObj => ({
        ...languageObj,
        type: utils.FILTER_TYPES.LANGUAGE,
        isChecked: false,
      }));

      genres = genres.map(genreObj => ({
        ...genreObj,
        type: utils.FILTER_TYPES.GENRE,
        isChecked: false,
      }));

      yield put(staticAction.updateTypeData(types));
      yield put(staticAction.updateLanguageData(languages));
      yield put(staticAction.updateGenreData(genres));
    }
  } catch (error) {}
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
