import { all, fork } from '@redux-saga/core/effects';

import loginSaga from './login.saga';
import registerSaga from './register.saga';
import staticSaga from './static.saga';
import toastSaga from './toast.saga';

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(registerSaga),
    fork(staticSaga),
    fork(toastSaga),
  ]);
}
