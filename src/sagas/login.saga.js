import axios from 'axios';
import { all, put, takeLatest } from '@redux-saga/core/effects';

import { loadingAction, toastAction } from '../actions';

import { actions, urls, utils } from '../constants';

import handleError from '../utils/errorHandler';
import { updateUserLoginInfo } from '../utils/users';

/* -----------------------------------------
 *                 WORKERS
 * -----------------------------------------
 */

function* loginSubmitWorker({ payload }) {
  try {
    handleError(axios);
    const requestURL = urls.LOGIN_URL;

    const { username, password } = payload;

    const body = {
      username,
      password,
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = yield axios.post(requestURL, body, { headers });

    yield put(loadingAction.stopLoginLoading());

    if (response && response.status === 200) {
      const { data } = response;
      const { message } = data;
      const { user } = data.data;
      updateUserLoginInfo(user);

      yield put(
        toastAction.requestToShowToast(utils.MESSAGE_VARIANTS.SUCCESS, message)
      );

      // yield put(userAction.updateBasicUserInfo(user));
    }
  } catch (error) {
    yield put(loadingAction.stopLoginLoading());
  }
}

/* -----------------------------------------
 *                 WATCHERS
 * -----------------------------------------
 */

function* loginSubmitWatcher() {
  yield takeLatest(actions.LOGIN.SUBMIT_FOR_LOGIN, loginSubmitWorker);
}

export default function* loginSaga() {
  yield all([loginSubmitWatcher()]);
}
