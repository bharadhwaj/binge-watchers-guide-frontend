import { toastAction } from '../actions';
import { storage, utils } from '../constants';
import { checkIfUserIsLoggedIn, logoutUser } from './users';

const checkTokenExpiration = store => next => action => {
  const tokenExpireAt = +localStorage.getItem(storage.USER.EXPIRE_AT);
  const { isLoggedIn } = checkIfUserIsLoggedIn();

  if (!isLoggedIn && tokenExpireAt) {
    logoutUser();

    store.dispatch(
      toastAction.requestToShowToast(
        utils.MESSAGE_VARIANTS.WARNING,
        'Your session has expired. Please login again.'
      )
    );
  }

  next(action);
};

export default checkTokenExpiration;
