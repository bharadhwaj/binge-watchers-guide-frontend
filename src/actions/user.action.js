import { USER } from '../constants/actions';

export function updateUserData(userInfo) {
  return { type: USER.UPDATE_USER_DATA, payload: { userInfo } };
}

export function resetUserData() {
  return { type: USER.RESET_USER_DATA };
}
