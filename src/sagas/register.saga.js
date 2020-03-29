import axios from 'axios';
import { all, put, takeLatest } from '@redux-saga/core/effects';

import { loadingAction, toastAction, userAction } from '../actions';

import { actions, urls, utils } from '../constants';

import handleError from '../utils/errorHandler';
import { updateUserLoginInfo } from '../utils/users';

/* -----------------------------------------
 *                 WORKERS
 * -----------------------------------------
 */

function* checkUsernameWorker({ payload }) {
  try {
    handleError(axios);

    const { username } = payload;

    const requestURL = urls.CHECK_USERNAME.replace(/<USER_NAME>/, username);

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = yield axios.get(requestURL, { headers });

    yield put(loadingAction.stopCheckUsernameLoading());

    if (response && response.status === 200) {
      // const { data } = response;
      // const { message } = data;
      // const { user } = data.data;
    }
  } catch (error) {
    yield put(loadingAction.stopCheckUsernameLoading());
  }
}

function* registerSubmitWorker({ payload }) {
  try {
    handleError(axios);
    const requestURL = urls.REGISTER_URL;

    const body = payload;

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = yield axios.post(requestURL, body, { headers });

    yield put(loadingAction.stopRegisterLoading());

    if (response && response.status === 201) {
      const { data } = response;
      const { message } = data;
      const { user } = data.data;

      updateUserLoginInfo(user);

      yield put(
        toastAction.requestToShowToast(utils.MESSAGE_VARIANTS.SUCCESS, message)
      );

      yield put(userAction.updateUserData(user));
    }
  } catch (error) {
    yield put(loadingAction.stopRegisterLoading());
  }
}

/* -----------------------------------------
 *                 WATCHERS
 * -----------------------------------------
 */

function* checkUsernameWatcher() {
  yield takeLatest(actions.REGISTER.CHECK_USERNAME, checkUsernameWorker);
}

function* registerSubmitWatcher() {
  yield takeLatest(actions.REGISTER.REGISTER_USER, registerSubmitWorker);
}

export default function* registerSaga() {
  yield all([checkUsernameWatcher(), registerSubmitWatcher()]);
}
