import { USER } from '../constants/actions';

export function updateUserData(userInfo) {
  return { type: USER.UPDATE_USER_DATA, payload: { userInfo } };
}

export function setUsernameStatus(status) {
  return { type: USER.SET_USERNAME_STATUS, payload: { status } };
}

export function resetUserData() {
  return { type: USER.RESET_USER_DATA };
}
